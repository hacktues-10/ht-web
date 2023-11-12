import { eq } from "drizzle-orm";
import invariant from "tiny-invariant";
import { slugify } from "transliteration";

import { db } from "../db";
import { particpants, teams } from "../db/schema";

export async function getConfirmedTeams() {
  return db.select().from(teams);
}

export async function getTeamById(id: string) {
  const results = await db.select().from(teams).where(eq(teams.id, id));
  return results.at(0) ?? null;
}

export async function createTeam(team: {
  name: string;
  description: string;
  captainId: number;
  isAlumni: boolean;
}) {
  // TODO: verify if name is ok
  const results = await db
    .insert(teams)
    .values({
      id: slugify(team.name),
      ...team,
    })
    .returning({ id: teams.id });
  const insertedTeam = results.at(0);
  invariant(insertedTeam, "Failed to create team");
  await db
    .update(particpants)
    .set({
      isCaptain: true,
      teamId: insertedTeam.id,
    })
    .where(eq(particpants.userId, team.captainId));
  return insertedTeam;
}
