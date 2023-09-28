import { eq, or, sql } from "drizzle-orm";

import { getHTSession } from "../api/auth/session";
import { db } from "../db";
import { particpants, teams, users } from "../db/schema";

const selectFromParticipants = () =>
  db
    .select({
      id: particpants.id,
      firstName: particpants.firstName,
      lastName: particpants.lastName,
      email: users.email,
      phoneNumber: particpants.phoneNumber,
      grade: particpants.grade,
      parallel: particpants.parallel,
      allergies: particpants.allergies,
      tShirtId: particpants.tShirtId,
      isLookingForTeam: particpants.isLookingForTeam,
      team: {
        id: teams.id,
        name: teams.name,
        isCaptain: particpants.isCaptain,
      },
    })
    .from(particpants)
    .innerJoin(users, eq(particpants.userId, users.id))
    .leftJoin(teams, eq(particpants.teamId, teams.id));

export async function getParticipantByEmail(email: string) {
  const results = await selectFromParticipants().where(eq(users.email, email));
  return results.at(0) ?? null;
}

export async function getParticipantById(id: number) {
  const results = await selectFromParticipants().where(eq(particpants.id, id));
  return results.at(0) ?? null;
}

export async function getParticipantFromSession() {
  const session = await getHTSession();
  if (!session || !session.user?.email) {
    return null;
  }
  return getParticipantByEmail(session.user.email);
}
