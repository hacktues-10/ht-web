"use server";

import { eq } from "drizzle-orm";

import { particpants, teams } from "~/app/db/schema";
import { db } from "../db";

export async function deleteTeamById(teamId: string) {
  //delete team by id
  try {
    await db
      .update(particpants)
      .set({ teamId: null, isCaptain: false })
      .where(eq(particpants.teamId, teamId));
    await db.delete(teams).where(eq(teams.id, teamId)).returning();
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, message: e };
  }
}
