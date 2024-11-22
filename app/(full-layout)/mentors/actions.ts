"use server";

import { revalidateTag } from "next/cache";
import { eq } from "drizzle-orm";

import { db } from "~/app/db";
import { teams } from "~/app/db/schema";


export async function chooseTeamMentor(mentorId: number, teamId: string) {
  try {
    const teams_res = await db.select().from(teams);

    teams_res.map((team) => {
      if (team.mentorId === mentorId) {
        return { success: false };
      }
      if (team.id === teamId) {
        if (team.mentorId !== null) {
          return { success: false };
        }
      }
    });

    const team = teams_res.filter((team) => team.id === teamId);

    if (team.length === 0) return { success: false };
    if (!team[0].discordRoleId) return { success: false };
    if (team[0].mentorId !== null) {
      return { success: false };
    }

    try {
      await db
        .update(teams)
        .set({ mentorId: mentorId })
        .where(eq(teams.id, teamId));
    } catch (err) {
      console.log(err);
      revalidateTag("mentors");
      return { success: false };
    }

    revalidateTag("mentors");
    revalidateTag("teams");

    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}
