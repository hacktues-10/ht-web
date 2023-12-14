import { redirect } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";
import { eq } from "drizzle-orm";

import { getMentorByEmail } from "~/app/(full-layout)/mentors/service";
import { db } from "~/app/db";
import { discordUsers } from "~/app/db/schema";
import { env } from "~/app/env.mjs";
import { getParticipantFromSession } from "~/app/participants/service";
import { getHTSession, signInRedirect } from "../../auth/session";

const ERROR_URL = `/discord/error?${new URLSearchParams({
  source: "/discord/remove",
})}`;

export async function GET(req: NextRequest) {
  let idToMatch = 0;
  const participant = await getParticipantFromSession();
  if (!participant) {
    const session = await getHTSession();
    if (!session) {
      signInRedirect();
    }
    if (session && session.user?.email && session?.user) {
      const mentor = await getMentorByEmail(session.user.email);
      if (mentor && mentor.id) {
        idToMatch = mentor?.id;
      }
    }
  } else {
    idToMatch = participant.id;
  }
  const res = (
    await db
      .delete(discordUsers)
      .where(
        eq(
          participant ? discordUsers.participantId : discordUsers.mentorId,
          idToMatch,
        ),
      )
      .returning()
  ).at(0);

  if (!res) {
    redirect(ERROR_URL);
  }

  const response = await fetch(
    `https://discord.com/api/v10/guilds/${env.DISCORD_GUILD_ID}/members/${res.discordId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bot " + env.DISCORD_BOT_ID,
      },
    },
  );

  if (response.ok) {
    redirect("/discord");
  }

  redirect(ERROR_URL);
}
