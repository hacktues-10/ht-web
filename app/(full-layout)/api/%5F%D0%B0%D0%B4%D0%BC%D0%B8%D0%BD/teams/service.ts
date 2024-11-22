import { eq } from "drizzle-orm";
import { slugify } from "transliteration";

import { db } from "~/app/db";
import { mentors, teams } from "~/app/db/schema";
import { getAdminFromSession } from "../service";

export async function getTeamsAdmin() {
  const admin = await getAdminFromSession();
  if (!admin) {
    return [];
  }
  const teamsResult = await db
    .select({
      id: teams.id,
      name: teams.name,
      description: teams.description,
      mentor: {
        id: mentors.id,
        name: mentors.name,
        company: mentors.companyName,
      },
      members: teams.memberCount,
      semiFinal: teams.semiFinalResult,
      isFinalist: teams.isFinalist,
      final: teams.finalResult,
    })
    .from(teams)
    .leftJoin(mentors, eq(mentors.id, teams.mentorId));

  return teamsResult.map((team) => {
    return {
      id: team.id,
      name: team.name,
      description: team.description,
      mentor: `${team.mentor?.name ?? ""} ${team.mentor?.company ?? ""}`,
      members: team.members,
      semiFinal: team.semiFinal,
      isFinalist: team.isFinalist ? "Yes" : "No",
      final: team.final,
    };
  });
}

export type TeamsAdmin = Awaited<ReturnType<typeof getTeamsAdmin>>;
