import { eq } from "drizzle-orm";

import { mentors, teams } from "~/app/db/schema";
import { getHTSession, HTSession } from "../api/auth/session";
import { db } from "../db";

export const getAllMentors = async () => {
  const allMentors = await db.select().from(mentors);
  return allMentors;
};

// FIXME: do we even need closure here?
const selectFromMentors = () => db.select().from(mentors);

export const getMentorByEmail = async (email: string) => {
  const mentor = await selectFromMentors().where(eq(mentors.email, email));
  return mentor.at(0) ?? null;
};

export const getMentorFromSession = async () => {
  const session = await getHTSession();
  if (!session?.user?.email) return null;
  // FIXME: better to use the user relation?
  return getMentorByEmail(session.user.email);
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
