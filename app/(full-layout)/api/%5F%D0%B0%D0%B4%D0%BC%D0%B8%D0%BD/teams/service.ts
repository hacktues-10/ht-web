import { eq } from "drizzle-orm";

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
        firstName: mentors.firstName,
        lastName: mentors.lastName,
        company: mentors.companyName,
      },
      isAlumni: teams.isAlumni,
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
      mentor: `${team.mentor?.firstName ?? " "} ${
        team.mentor?.lastName ?? " "
      } ${team.mentor?.company ?? " "}`,
      isAlumni: team.isAlumni ? "Yes" : "No",
      members: team.members,
      semiFinal: team.semiFinal,
      isFinalist: team.isFinalist ? "Yes" : "No",
      final: team.final,
    };
  });
}

export type TeamsAdmin = Awaited<ReturnType<typeof getTeamsAdmin>>;
