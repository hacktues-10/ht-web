import { eq } from "drizzle-orm";

import { db } from "~/app/db";
import { teams } from "~/app/db/schema";

// TOMI KAZA CHE SHTE SA 7, TAKA CHE 7 :)))
const SEMIFINALS_COUNT = 7;

export async function getTeamsBySemiFinal() {
  let teamsResult = [];
  for (let i = 1; i <= SEMIFINALS_COUNT; i++) {
    const teamsInSemiFinal = await db
      .select()
      .from(teams)
      .where(eq(teams.semiFinal, i));

    if (teamsInSemiFinal.length <= 0) {
      return teamsResult;
    }
    teamsResult.push(teamsInSemiFinal);
  }
  console.log(teamsResult);
  return teamsResult;
}
