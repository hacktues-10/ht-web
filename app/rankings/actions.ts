"use server";

import { eq } from "drizzle-orm";

import { db } from "../db";
import { teams } from "../db/schema";

export async function getTeams() {
  let teamsResult = [];
  //TOMI KAZA CHE SHTE SA 7, TAKA CHE 7 :)))
  for (let i = 1; i < 8; i++) {
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
