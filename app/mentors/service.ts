import { eq } from "drizzle-orm";

import { mentors, teams } from "~/app/db/schema";
import { db } from "../db";
import { HTSession } from "../api/auth/session";

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

const whitelist = ["abv@trading.212"];

export const isInMentorWhitelist = (email: string) => {
  return whitelist.includes(email);
};

export const isWhitelistedMentor = (session: HTSession) => {
  if (!session.user?.email) return false;
  return isInMentorWhitelist(session.user.email);
};
