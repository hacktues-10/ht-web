import { eq } from "drizzle-orm";

import { mentors, teams } from "~/app/db/schema";
import { db } from "../db";

export const getMentor = async (email: string) => {
  const mentor = await db
    .select()
    .from(mentors)
    .where(eq(mentors.email, email));
  return mentor[0];
};

export const getAllMentors = async () => {
  const allMentors = await db.select().from(mentors);
  return allMentors;
};

export async function ChoseTeamMentor(mentorId: number, teamId: string) {
  try {
    await db
      .update(teams)
      .set({ mentorId: mentorId })
      .where(eq(teams.id, teamId));
    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}

export async function checkIfMentorIsTaken(mentorId: number) {
  try {
    const res = await db
      .select()
      .from(teams)
      .where(eq(teams.mentorId, mentorId));
    if (res.length > 0) return true;
    else return false;
  } catch (err) {
    return false;
  }
}
