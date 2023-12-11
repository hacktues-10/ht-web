import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/app/db";
import { discordUsers, particpants, sessions, users } from "~/app/db/schema";
import { getMentor } from "~/app/mentors/actions";
import { getParticipantByEmail } from "~/app/participants/service";

export async function GET(req: NextRequest) {
  let isMentorOrParticipant = false;
  let hasConnectedDiscord = false;

  const token = req.cookies.get("next-auth.session-token");

  if (token && token.value) {
    const sessionResult = await db
      .select()
      .from(sessions)
      .where(eq(sessions.sessionToken, token.value));

    if (sessionResult.length > 0) {
      const user = (
        await db
          .select()
          .from(users)
          .where(eq(users.id, sessionResult[0].userId))
      ).at(0);

      if (user && user.email) {
        const isParticipant = await getParticipantByEmail(user?.email);
        const isMentor = await getMentor(user);
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
          console.log("check 4");

          if (discordColumn && discordId) {
            const discordResult = await db
              .select()
              .from(discordUsers)
              .where(eq(discordColumn, discordId));
            console.log("check 5");

            if (discordResult.length > 0) {
              hasConnectedDiscord = true;
            }
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
    { status: 200 }
  );
}
