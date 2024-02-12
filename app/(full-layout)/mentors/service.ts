import { eq } from "drizzle-orm";

import { getHTSession, HTSession } from "~/app/api/auth/session";
import { db } from "~/app/db";
import { discordUsers, mentors, teams } from "~/app/db/schema";

export const getAllMentors = async () => {
  const allMentors = await selectFromMentors();
  return allMentors;
};

// FIXME: do we even need closure here?
const selectFromMentors = () =>
  db
    .select({
      id: mentors.id,
      name: mentors.name,
      description: mentors.description,
      companyName: mentors.companyName,
      technologies: mentors.technologies,
      fileName: mentors.fileName,
      jobPosition: mentors.jobPosition,
      tuesVispusk: mentors.tuesVispusk,
      schedule: mentors.schedule,
      where: mentors.where,
      team: {
        id: teams.id,
        name: teams.name,
      },
    })
    .from(mentors)
    .leftJoin(teams, eq(mentors.id, teams.mentorId));

export const getMentorByEmail = async (email: string) => {
  const mentor = await selectFromMentors().where(eq(mentors.email, email));
  return mentor.at(0) ?? null;
};

export const getMentorById = async (id: number) => {
  const mentor = await selectFromMentors().where(eq(mentors.id, id));
  return mentor.at(0) ?? null;
};

export const getMentorFromSession = async () => {
  const session = await getHTSession();
  if (!session?.user?.email) return null;
  // FIXME: better to use the user relation?
  return getMentorByEmail(session.user.email);
};

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
