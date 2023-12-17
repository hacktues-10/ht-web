import { eq, isNull } from "drizzle-orm";

import { getHTSession } from "../api/auth/session";
import { db } from "../db";
import { discordUsers, particpants, teams, users } from "../db/schema";

export type Participant = Awaited<
  ReturnType<typeof selectFromParticipants>
>[number];

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
      technologies: particpants.technologies,
      team: {
        id: teams.id,
        name: teams.name,
        isCaptain: particpants.isCaptain,
      },
      discordUser: {
        discordId: discordUsers.discordId,
        discordUsername: discordUsers.discordUsername,
      },
    })
    .from(particpants)
    .innerJoin(users, eq(particpants.userId, users.id))
    .leftJoin(teams, eq(particpants.teamId, teams.id))
    .leftJoin(discordUsers, eq(particpants.id, discordUsers.participantId));

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

export function isParticipantStudent(participant: Participant) {
  return participant.grade.length <= 2;
}

export function isParticipantAlumni(participant: Participant) {
  return !isParticipantStudent(participant);
}

export async function getParticipantsWithNoTeam() {
  const results = await selectFromParticipants().where(
    isNull(particpants.teamId),
  );
  return results;
}

export function formatParticipantDiscordNick(participant: Participant) {
  if (isParticipantStudent(participant)) {
    return `${participant.firstName} ${participant.lastName} (${participant.grade}${participant.parallel})`;
  } else {
    return `${participant.firstName} ${participant.lastName} (ТУЕС'${participant.grade})`;
  }
}
