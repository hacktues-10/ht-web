import { NextResponse, type NextRequest } from "next/server";
import { eq } from "drizzle-orm";

import { getMentor } from "~/app/(full-layout)/mentors/actions";
import { db } from "~/app/db";
import { discordUsers } from "~/app/db/schema";
import { env } from "~/app/env.mjs";
import { getParticipantFromSession } from "~/app/participants/service";
import { getHTSession } from "../../auth/session";

export async function GET(req: NextRequest) {
  let idToMatch = 0;
  const participant = await getParticipantFromSession();
  if (!participant) {
    const session = await getHTSession();
    if (session && session.user?.email && session?.user) {
      const mentor = await getMentor({ email: session.user.email });
      if (mentor && mentor.id) {
        idToMatch = mentor?.id;
      }
    }
  } else {
    idToMatch = participant.id;
  }
  const res = (
    await db
      .select()
      .from(discordUsers)
      .where(
        eq(
          participant ? discordUsers.participantId : discordUsers.mentorId,
          idToMatch,
        ),
      )
  ).at(0);

  if (!res) {
    return NextResponse.json({ success: false });
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
    console.log("STANA");
  }

  return NextResponse.json({ response: await response.json() });
}
