import { eq, type InferInsertModel } from "drizzle-orm";
import invariant from "tiny-invariant";

import { db } from "../db";
import { teams } from "../db/schema";

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
}) {
  const results = await db
    .insert(teams)
    .values({
      id: `the-team-${Date.now()}`, // TODO: generate a real ID
      ...team,
    })
    .returning({ id: teams.id });
  const insertedTeam = results.at(0);
  invariant(insertedTeam, "Failed to create team");
  return insertedTeam;
}
