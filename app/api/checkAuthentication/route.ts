import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { getMentorByEmail } from "~/app/(full-layout)/mentors/service";
import { db } from "~/app/db";
import { discordUsers } from "~/app/db/schema";
import { getParticipantByEmail } from "~/app/participants/service";
import { getHTSession } from "../auth/session";

export async function GET(req: NextRequest) {
  let isMentorOrParticipant = false;
  let hasConnectedDiscord = false;
  let hasSession = false;

  const user = (await getHTSession())?.user;

  if (user && user.email) {
    hasSession = true;
    const isParticipant = await getParticipantByEmail(user?.email);
    const isMentor = await getMentorByEmail(user.email);
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

  const responseData = {
    isMentorOrParticipant: isMentorOrParticipant,
    hasConnectedDiscord: hasConnectedDiscord,
    hasSession: hasSession,
  };

  return NextResponse.json(
    {
      body: responseData,
    },
    { status: 200 },
  );
}
