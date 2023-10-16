"use server";

import { type NextRequest } from "next/server";
import axios from "axios";
import { eq } from "drizzle-orm";

import { db } from "~/app/db";
import { discord_table, particpants } from "~/app/db/schema";
import { getParticipantFromSession } from "~/app/participants/service";

const clientId = "1163022808192917514";
const clientSecret = "-m73ILHECZQjpLaDChLWSUFs8FnH0jNz";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  if (!code) return;
  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: "http://localhost:3000/api/discord/callback",
  });

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept-Encoding": "application/x-www-form-urlencoded",
  };

  const res = await axios.post("https://discord.com/api/oauth2/token", params, {
    headers,
  });

  const user = await axios.get("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${res.data.access_token}`,
    },
  });

  const participant = await getParticipantFromSession();
  if (!participant) return null;
  if (await checkIfUserHaveDiscordEntry(participant.id)) {
    await db
      .update(discord_table)
      .set({
        discord_id: user.data.id,
        discord_username: user.data.username,
        lastUpdated: new Date(),
      })
      .where(eq(discord_table.participant_id, participant.id));
  } else {
    await db.insert(discord_table).values({
      participant_id: participant.id,
      discord_id: user.data.id,
      discord_username: user.data.username,
    });
  }

  return new Response(JSON.stringify(user.data));
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
