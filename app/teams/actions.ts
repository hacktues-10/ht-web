"use server";

import { eq } from "drizzle-orm";

import { particpants, teams } from "~/app/db/schema";
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
