import { eq } from "drizzle-orm";
import invariant from "tiny-invariant";

import { db } from "~/app/db";
import { mentors, teams } from "~/app/db/schema";

export const getAllMentors = async () => {
  const allMentors = await db.select().from(mentors);
  return allMentors;
};

export async function chooseTeamMentor(mentorId: number, teamId: string) {
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

export async function getMentorById(mentorId: number | null) {
  if (mentorId) {
    const res = (
      await db.select().from(mentors).where(eq(mentors.id, mentorId))
    ).at(0);
    return res;
  } else {
    return null;
  }
}
