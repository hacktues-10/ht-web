import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "~/app/db";
import { discordUsers, particpants, sessions, users } from "~/app/db/schema";
import { getMentor } from "~/app/mentors/actions";
import { getParticipantByEmail } from "~/app/participants/service";
import { getHTSession } from "../auth/session";

export async function GET(req: NextRequest) {
  let isMentorOrParticipant = false;
  let hasConnectedDiscord = false;

  const token = req.cookies.get("next-auth.session-token");

  if (token && token.value) {
    const user = (await getHTSession())?.user;

    if (user && user.email) {
      const isParticipant = await getParticipantByEmail(user?.email);
      const isMentor = await getMentor({ email: user.email });
      if (isParticipant || isMentor) {
        isMentorOrParticipant = true;

        const discordColumn = isParticipant
          ? discordUsers.participantId
          : isMentor
            ? discordUsers.mentorId
            : undefined;
        const discordId = isParticipant
          ? isParticipant.id
          : isMentor
            ? isMentor.id
            : undefined;

        if (discordColumn && discordId) {
          const discordResult = await db
            .select()
            .from(discordUsers)
            .where(eq(discordColumn, discordId));

          if (discordResult.length > 0) {
            hasConnectedDiscord = true;
          }
        }
      }
    }
  }

  const responseData = {
    isMentorOrParticipant: isMentorOrParticipant,
    hasConnectedDiscord: hasConnectedDiscord,
  };

  return NextResponse.json(
    {
      body: responseData,
    },
    { status: 200 },
  );
}
