import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import invariant from "tiny-invariant";

import { getMentor } from "~/app/(full-layout)/mentors/actions";
import { db } from "~/app/db";
import { discordUsers } from "~/app/db/schema";
import { env } from "~/app/env.mjs";
import {
  formatParticipantDiscordNick,
  getParticipantFromSession,
} from "~/app/participants/service";
import { getHTSession } from "../../auth/session";
import { discordRedirectUri } from "../service";

const ERROR_URL = `/discord/error?${new URLSearchParams({
  source: "/discord",
})}`;
const SUCCESS_URL = "/discord";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const session = await getHTSession();
  if (!session?.user?.email) redirect(ERROR_URL);

  const code = searchParams.get("code");
  if (!code) redirect(ERROR_URL);

  const params = new URLSearchParams({
    client_id: env.DISCORD_CLIENT_ID,
    client_secret: env.DISCORD_CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
    redirect_uri: discordRedirectUri,
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

  const mentor = await getMentor({ email: session.user.email });

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
  if (!participant && !mentor) redirect(ERROR_URL);
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
  if (!participant) {
    if (!mentor) redirect(ERROR_URL);

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

  if (!inviteRes.ok) {
    redirect(ERROR_URL);
  }

  return redirect(SUCCESS_URL);
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
