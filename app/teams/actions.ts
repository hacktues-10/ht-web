"use server";

import { and, eq } from "drizzle-orm";

import { askJoin, notifications, particpants, teams } from "~/app/db/schema";
import { db } from "../db";
import { getParticipantFromSession } from "../participants/service";

export async function deleteMyTeam() {
  const participant = await getParticipantFromSession();

  try {
    if (participant?.team.id) {
      await db.delete(askJoin).where(eq(askJoin.teamId, participant.team.id));
      // await db.delete(notifications).where(eq(notifications.));
      await db
        .update(particpants)
        .set({ teamId: null, isCaptain: false })
        .where(eq(particpants.teamId, participant.team.id));

      await db
        .delete(teams)
        .where(eq(teams.id, participant?.team.id))
        .returning();
      return { success: true };
    }
  } catch (e) {
    console.log(e);
    return { success: false, message: e };
  }
}

export async function askToJoinHandler(teamIdToJoin: string) {
  console.log("IN FUNC");
  const participant = await getParticipantFromSession();
  console.log(participant?.id);
  console.log(teamIdToJoin);
  try {
    if (participant?.id) {
      const res = await db
        .insert(askJoin)
        .values({
          userId: participant?.id,
          teamId: teamIdToJoin,
        })
        .returning();

      console.log(res[0]);

      const captain = await db
        .select()
        .from(particpants)
        .where(
          and(
            eq(particpants.isCaptain, true),
            eq(particpants.teamId, teamIdToJoin),
          ),
        );

      console.log(captain);

      await db.insert(notifications).values({
        targetUserId: captain[0].id,
        referenceId: res[0].id,
        type: "ask_join",
      });
      return { success: true };
    }
  } catch (e) {
    console.log(e);
    return { success: false };
  }
}

export async function checkStateJoinRequests(targetTeamId: string) {
  const participant = await getParticipantFromSession();
  console.log(participant?.id);
  try {
    if (participant?.id != null) {
      const res = await db
        .select()
        .from(askJoin)
        .where(
          and(
            eq(askJoin.userId, participant?.id),
            eq(askJoin.teamId, targetTeamId),
          ),
        );
      if (res.length > 0) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
}
