import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "~/app/db";
import { discordUsers } from "~/app/db/schema";
import { env } from "~/app/env.mjs";
import { isNextControlError } from "~/app/hacks";
import {
  formatParticipantDiscordNick,
  getParticipantFromSession,
  Participant,
} from "~/app/participants/service";
import { resolveCallbackUrl } from "~/app/utils";
import { getHTSession, signInRedirect } from "../../auth/session";
import { resolveDiscordRedirectUri } from "../service";

const ERROR_URL = "/discord/error";
const SUCCESS_URL = "/discord";

const generateErrorUrl = (code?: number) =>
  `${ERROR_URL}?${new URLSearchParams({
    source: "/discord",
    ...(code ? { q: code?.toString(36), t: Date.now().toString(36) } : {}), // NOTE: intentinally obscure the error parameter name
  })}`;

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const session = await getHTSession();
    if (!session?.user?.email) {
      console.error("no session");
      signInRedirect();
    }

    const code = searchParams.get("code");
    if (!code) {
      console.error("no code in query, sad");
      redirect(generateErrorUrl(1000));
    }

    const params = new URLSearchParams({
      client_id: env.DISCORD_CLIENT_ID,
      client_secret: env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: resolveDiscordRedirectUri(req),
    });
    const res = await fetch("https://discord.com/api/v10/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!res.ok) {
      console.error("res not ok", await res.json());
      redirect(generateErrorUrl(5000));
    }

    const data = await res.json();
    const response = await fetch("https://discord.com/api/v10/users/@me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    });

    if (!response.ok) {
      console.error("response not ok", await response.json());
      redirect(generateErrorUrl(6000));
    }

    const user = await response.json();
    const participant = await getParticipantFromSession();

    const mentor = null;

    const inviteParams = {
      access_token: data.access_token,
      nick: nickOfUser(participant, mentor),
      roles: uniqueRolesOfUser(participant, mentor),
      mute: false,
      deaf: false,
    };
    if (!participant && !mentor) {
      console.error("no participant and no mentor");
    }
    const inviteRes = await fetch(
      `https://discord.com/api/v10/guilds/${env.DISCORD_GUILD_ID}/members/${user.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bot " + env.DISCORD_BOT_ID,
        },
        body: JSON.stringify(inviteParams),
      },
    );
    if (!inviteRes.ok) {
      console.error(
        "inviteRes not ok",
        JSON.stringify(await inviteRes.json(), null, 2),
      );
      redirect(generateErrorUrl(2000));
    }
    if (!participant) {
      if (!mentor) {
        console.error("no mentor and no participant here");
        redirect(generateErrorUrl(3000));
      }
    } else {
      if (await participantHasDiscordEntry(participant.id)) {
        await db
          .update(discordUsers)
          .set({
            discordId: user.id,
            discordUsername: user.username,
            accessToken: data.access_token,
            // FIXME: can sql do this for us?
            lastUpdated: new Date(),
          })
          .where(eq(discordUsers.participantId, participant.id));
      } else {
        await db.insert(discordUsers).values({
          participantId: participant.id,
          discordId: user.id,
          discordUsername: user.username,
          accessToken: data.access_token,
        });
      }
    }
  } catch (error) {
    if (isNextControlError(error)) {
      throw error;
    }

    console.error("error", error);
    if (error instanceof Error) {
      console.error(error.stack);
    }
    redirect(generateErrorUrl(4000));
  }

  const untrustedCallbackUrl = req.cookies.get("callbackUrl")?.value;
  // TODO: delete cookie

  return redirect(
    untrustedCallbackUrl
      ? resolveCallbackUrl(untrustedCallbackUrl, req)
      : SUCCESS_URL,
  );
}

async function participantHasDiscordEntry(participantId: number) {
  try {
    const res = await db
      .select()
      .from(discordUsers)
      .where(eq(discordUsers.participantId, participantId));
    return res.length > 0;
  } catch (err) {
    return false;
  }
}

function nickOfUser(
  participant: Participant | null,
  mentor: { firstName: string; lastName: string } | null,
) {
  if (participant) {
    return formatParticipantDiscordNick(participant);
  }
  if (mentor) {
    return mentor.firstName + " " + mentor.lastName;
  }
  return "";
}

function uniqueRolesOfUser(
  participant: Participant | null,
  mentor: { firstName: string; lastName: string } | null,
) {
  if (participant) {
    const grade = parseInt(participant.grade);
    if (grade <= 12) {
      return [env.PARTICIPANT_ROLE, env.MEMBER_ROLE];
    }
    return [env.PARTICIPANT_ROLE];
  }
  return [];
}
