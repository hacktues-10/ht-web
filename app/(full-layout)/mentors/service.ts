import { unstable_cache } from "next/cache";
import { eq } from "drizzle-orm";

import { getHTSession, HTSession } from "~/app/api/auth/session";
import { db } from "~/app/db";
import { discordUsers, mentors, teams } from "~/app/db/schema";
import { SECOND } from "~/app/utils";

export const getAllMentors = unstable_cache(
  async () => {
    const allMentors = await selectFromMentors();
    allMentors.sort((a, b) => a.name.localeCompare(b.name));
    return allMentors;
  },
  ["all-mentors"],
  {
    revalidate: 1 * SECOND,
    tags: ["mentors"],
  },
);

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

export const getMentorById = async (id: number) => {
  const mentor = await selectFromMentors().where(eq(mentors.id, id));
  return mentor.at(0) ?? null;
};