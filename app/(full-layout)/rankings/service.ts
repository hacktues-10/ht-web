import { unstable_cache } from "next/cache";
import { eq } from "drizzle-orm";

import { db } from "~/app/db";
import { teams } from "~/app/db/schema";
import { env } from "~/app/env.mjs";
import { MINUTE } from "~/app/utils";

const SEMIFINALS_COUNT = 7;

export const getTeamsBySemiFinal = unstable_cache(
  async () => {
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
    return teamsSemiFinal;
  },
  ["students-results", env.VERCEL_ENV],
  {
    revalidate: 5 * MINUTE,
    tags: ["teams"],
  },
);
