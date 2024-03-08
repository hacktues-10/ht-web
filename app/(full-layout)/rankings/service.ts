import { eq } from "drizzle-orm";

import { db } from "~/app/db";
import { teams } from "~/app/db/schema";

const SEMIFINALS_COUNT = 7;

export async function getTeamsBySemiFinal() {
  let teamsSemiFinal = [];

  for (let i = 1; i <= SEMIFINALS_COUNT; i++) {
    const teamsInSemiFinal = await db
      .select()
      .from(teams)
      .where(eq(teams.semiFinal, i));

    if (teamsInSemiFinal.length <= 0) {
      return teamsSemiFinal;
    }

    teamsInSemiFinal.sort((a, b) => {
      return Number(b.semiFinalResult) - Number(a.semiFinalResult);
    });
    teamsSemiFinal.push(teamsInSemiFinal);
  }
  // console.log(teamsResult);
  return teamsSemiFinal;
}

export async function getAlumniTeams() {
  const alumniTeams = await db
    .select()
    .from(teams)
    .where(eq(teams.isAlumni, true));

  alumniTeams.sort((a, b) => {
    return Number(b.finalResult) - Number(a.finalResult);
  });

  return alumniTeams;
}
