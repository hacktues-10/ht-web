import { eq } from "drizzle-orm";

import { db } from "~/app/db";
import { mentors, teams } from "~/app/db/schema";
import { getAdminFromSession } from "../service";

export async function getTeamsResultsAdmin() {
  const admin = await getAdminFromSession();
  if (!admin) {
    return [];
  }
  const teamsResult = await db
    .select({
      id: teams.id,
      name: teams.name,
      semiFinal: teams.semiFinal,
      semiFinalResult: teams.semiFinalResult,
      isFinalist: teams.isFinalist,
      final: teams.finalResult,
    })
    .from(teams)
    .leftJoin(mentors, eq(mentors.id, teams.mentorId));

  return teamsResult.map((team) => {
    return {
      id: team.id,
      name: team.name,
      semiFinal: team.semiFinal,
      semiFinalResult: team.semiFinalResult,
      isFinalist: team.isFinalist ? "Yes" : "No",
      final: team.final,
    };
  });
}

export type TeamsResultAdmin = Awaited<ReturnType<typeof getTeamsResultsAdmin>>;
