"use server";

import { eq } from "drizzle-orm";

import { askJoin, notifications, particpants, teams } from "~/app/db/schema";
import { db } from "../db";
import { getParticipantFromSession } from "../participants/service";

export async function deleteMyTeam() {
  const participant = await getParticipantFromSession();

  try {
    if (participant?.team.id) {
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

      await db.insert(notifications).values({
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
