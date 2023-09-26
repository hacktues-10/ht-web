"use server";

import { eq } from "drizzle-orm";
import invariant from "tiny-invariant";
import { slugify } from "transliteration";

import { db } from "../db";
import { particpants, teams } from "../db/schema";
import { getParticipantFromSession } from "../participants/service";

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

export async function getTeamMembers(teamId: string) {
  const res = await db
    .select()
    .from(particpants)
    .where(eq(particpants.teamId, teamId));
  console.log(res);
  return res;
}

export async function removeTeamMember(memberId: number) {
  const user = await getParticipantFromSession();
  if (!user?.id) {
    return { success: false, message: "Unauthenticated" };
  }
  if (user.team.isCaptain) {
    const res = await db
      .update(particpants)
      .set({ teamId: null, isCaptain: false })
      .where(eq(particpants.id, memberId));
    console.log(res);
    if (res) {
      return { success: true };
    }
    return { success: false, message: "Failed to remove team member" };
  }
  return { success: false, message: "You are not a team captain" };
}
