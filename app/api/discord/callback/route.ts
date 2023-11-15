import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "~/app/db";
import { discordUsers } from "~/app/db/schema";
import { env } from "~/app/env.mjs";
import { getMentor } from "~/app/mentors/actions";
import { getParticipantFromSession } from "~/app/participants/service";
import { getHTSession } from "../../auth/session";
import { discordRedirectUri } from "../service";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const session = await getHTSession();
  if (!session?.user?.email) redirect("/");

  const code = searchParams.get("code");
  if (!code) return;
  const params = new URLSearchParams({
    client_id: env.DISCORD_CLIENT_ID,
    client_secret: env.DISCORD_CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
    redirect_uri: discordRedirectUri,
  });

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept-Encoding": "application/x-www-form-urlencoded",
  };
  const res = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: headers,
    body: params.toString(),
  });

  const data = await res.json();

  const response = await fetch("https://discord.com/api/users/@me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${data.access_token}`,
    },
  });

  const user = await response.json();
  const participant = await getParticipantFromSession();

  const mentor = await getMentor({ email: session.user.email });

  if (!participant) {
    if (!mentor) return;
    if (await checkIfMentorHaveDiscordEntry(mentor.id)) {
      await db
        .update(discordUsers)
        .set({
          discord_id: user.id,
          discord_username: user.username,
          access_token: data.access_token,
          lastUpdated: new Date(),
        })
        .where(eq(discordUsers.mentor_id, mentor.id));
    } else {
      console.log("Mentor: ", mentor.id);
      console.log("User: ", user);
      await db.insert(discordUsers).values({
        mentor_id: mentor.id,
        discord_id: user.id,
        discord_username: user.username,
        access_token: data.access_token,
        lastUpdated: new Date(),
      });
    }
  } else {
    if (await checkIfUserHaveDiscordEntry(participant.id)) {
      await db
        .update(discordUsers)
        .set({
          discord_id: user.id,
          discord_username: user.username,
          access_token: data.access_token,
          lastUpdated: new Date(),
        })
        .where(eq(discordUsers.participant_id, participant.id));
    } else {
      await db.insert(discordUsers).values({
        participant_id: participant.id,
        discord_id: user.id,
        discord_username: user.username,
        access_token: data.access_token,
      });
    }
  }

  const inviteParams = {
    access_token: data.access_token,
    nick: participant
      ? participant?.firstName + " " + participant?.lastName
      : mentor
      ? mentor.firstName + " " + mentor.lastName
      : "",
    roles: participant ? [env.MEMBER_ROLE] : mentor ? [env.MENTOR_ROLE] : [],
    mute: false,
    deaf: false,
  };

  const inviteRes = await fetch(
    `https://discord.com/api/guilds/${env.DISCORD_GUILD_ID}/members/${user.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bot " + env.DISCORD_BOT_ID,
      },
      body: JSON.stringify(inviteParams),
    },
  );

  return new Response(JSON.stringify("res"));
}

async function checkIfUserHaveDiscordEntry(participantid: number) {
  try {
    const res = await db
      .select()
      .from(discordUsers)
      .where(eq(discordUsers.participant_id, participantid));
    if (res.length > 0) return true;
    return false;
  } catch (err) {
    return false;
  }
}

async function checkIfMentorHaveDiscordEntry(mentorid: number) {
  try {
    const res = await db
      .select()
      .from(discordUsers)
      .where(eq(discordUsers.mentor_id, mentorid));
    if (res.length > 0) return true;
    return false;
  } catch (err) {
    return false;
  }
}
