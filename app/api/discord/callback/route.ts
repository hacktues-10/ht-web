"use server";

import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "~/app/db";
import { discord_table } from "~/app/db/schema";
import { env } from "~/app/env.mjs";
import { getMentor } from "~/app/mentors/actions";
import { getParticipantFromSession } from "~/app/participants/service";
import { getHTSession } from "../../auth/session";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const code = searchParams.get("code");
  if (!code) return;
  const params = new URLSearchParams({
    client_id: env.DISCORD_CLIENT_ID,
    client_secret: env.DISCORD_CLIENT_SECRET,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: "http://localhost:3000/api/discord/callback",
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
  const session = await getHTSession();
  console.log("Session: ", session);
  if (!session?.user?.email) redirect("/");

  if (!participant) {
    const mentor = await getMentor({ email: session.user.email });
    if (!mentor) return;
    if (await checkIfMentorHaveDiscordEntry(mentor.id)) {
      await db
        .update(discord_table)
        .set({
          discord_id: user.id,
          discord_username: user.username,
          access_token: data.access_token,
          lastUpdated: new Date(),
        })
        .where(eq(discord_table.mentor_id, mentor.id));
    } else {
      console.log("Mentor: ", mentor.id);
      console.log("User: ", user);
      await db.insert(discord_table).values({
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
        .update(discord_table)
        .set({
          discord_id: user.id,
          discord_username: user.username,
          access_token: data.access_token,
          lastUpdated: new Date(),
        })
        .where(eq(discord_table.participant_id, participant.id));
    } else {
      await db.insert(discord_table).values({
        participant_id: participant.id,
        discord_id: user.id,
        discord_username: user.username,
        access_token: data.access_token,
      });
    }
  }

  const inviteParams = {
    access_token: data.access_token,
  };

  const invite_res = await fetch(
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

  console.log(await invite_res.json());

  return new Response(JSON.stringify("res"));
}

async function checkIfUserHaveDiscordEntry(participantid: number) {
  try {
    const res = await db
      .select()
      .from(discord_table)
      .where(eq(discord_table.participant_id, participantid));
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
      .from(discord_table)
      .where(eq(discord_table.mentor_id, mentorid));
    if (res.length > 0) return true;
    return false;
  } catch (err) {
    return false;
  }
}

async function getGuilds(data: any) {
  const response = await fetch("https://discord.com/api/users/@me/guilds", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${data.access_token}`,
    },
  });

  console.log(await response.json());
}
