import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { eq } from "drizzle-orm";

import { getMentorByEmail } from "~/app/(full-layout)/mentors/service";
import { db } from "~/app/db";
import { discordUsers } from "~/app/db/schema";
import { env } from "~/app/env.mjs";
import {
  formatParticipantDiscordNick,
  getParticipantFromSession,
} from "~/app/participants/service";
import { resolveCallbackUrl } from "~/app/utils";
import { getHTSession } from "../../auth/session";

const ERROR_URL = `/discord/error?${new URLSearchParams({
  source: "/discord",
})}`;
const SUCCESS_URL = "/discord";

export async function GET(req: NextRequest) {
  const redirect_uri =
    req.headers.get("host") === "localhost:3000"
      ? "http://" + (req.headers.get("host") || "") + "/api/discord/callback"
      : "https://" + (req.headers.get("host") || "") + "/api/discord/callback";

  const { searchParams } = new URL(req.url);
  const session = await getHTSession();
  if (!session?.user?.email) {
    console.error("no session");
    redirect(ERROR_URL);
  }

  const code = searchParams.get("code");
  if (!code) {
    console.error("no code in query, sad");
    redirect(ERROR_URL);
  }

  const params = new URLSearchParams({
    client_id: env.DISCORD_CLIENT_ID,
    client_secret: env.DISCORD_CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
    redirect_uri: redirect_uri,
  });
  const res = await fetch("https://discord.com/api/v10/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const data = await res.json();
  const response = await fetch("https://discord.com/api/v10/users/@me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${data.access_token}`,
    },
  });

  const user = await response.json();
  const participant = await getParticipantFromSession();

  const mentor = await getMentorByEmail(session.user.email);

  const inviteParams = {
    access_token: data.access_token,
    nick: participant
      ? // FIXME: why is parallel empty string? AND WHY IS GRADE NULLABLE??
        formatParticipantDiscordNick(participant)
      : mentor
        ? mentor.firstName + " " + mentor.lastName
        : "",
    roles: participant?.id
      ? [env.MEMBER_ROLE]
      : mentor
        ? [env.MENTOR_ROLE]
        : [],
    mute: false,
    deaf: false,
  };
  if (!participant && !mentor) {
    console.error("no participant and no mentor");
    redirect(ERROR_URL);
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
    console.error("inviteRes not ok", await inviteRes.json());
    redirect(ERROR_URL);
  }
  if (!participant) {
    if (!mentor) {
      console.error("no mentor and no participant here");
      redirect(ERROR_URL);
    }

    if (await mentorHasDiscordEntry(mentor.id)) {
      await db
        .update(discordUsers)
        .set({
          discordId: user.id,
          discordUsername: user.username,
          accessToken: data.access_token,
          // FIXME: can sql do this for us?
          lastUpdated: new Date(),
        })
        .where(eq(discordUsers.mentorId, mentor.id));
    } else {
      await db.insert(discordUsers).values({
        mentorId: mentor.id,
        discordId: user.id,
        discordUsername: user.username,
        accessToken: data.access_token,
        // FIXME: can sql do this for us?
        lastUpdated: new Date(),
      });
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

async function mentorHasDiscordEntry(mentorId: number) {
  try {
    const res = await db
      .select()
      .from(discordUsers)
      .where(eq(discordUsers.mentorId, mentorId));
    return res.length > 0;
  } catch (err) {
    return false;
  }
}
