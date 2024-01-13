import { and, eq, isNull } from "drizzle-orm";
import invariant from "tiny-invariant";

import { Team } from "../(full-layout)/teams/service";
import { getHTSession } from "../api/auth/session";
import { db } from "../db";
import {
  discordUsers,
  invitations,
  particpants,
  teams,
  users,
} from "../db/schema";

export type Participant = Awaited<
  ReturnType<typeof selectFromParticipants>
>[number];

const selectFromParticipants = () =>
  db
    .select({
      id: particpants.id,
      firstName: particpants.firstName,
      middleName: particpants.middleName,
      lastName: particpants.lastName,
      email: users.email,
      phoneNumber: particpants.phoneNumber,
      grade: particpants.grade,
      parallel: particpants.parallel,
      allergies: particpants.allergies,
      tShirtId: particpants.tShirtId,
      isLookingForTeam: particpants.isLookingForTeam,
      isDisqualified: particpants.isDisqualified,
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

export async function getInvitationsForParticipant(participantId: any) {
  return db
    .select({
      id: invitations.id,
      teamId: invitations.teamId,
      invitedId: invitations.invitedParticipantId,
    })
    .from(particpants)
    .leftJoin(invitations, eq(invitations.invitedParticipantId, participantId));
}

export async function hasInvitationFromTeam(participantId: any, teamId: any) {
  const invitations = await getInvitationsForParticipant(participantId);
  for (const invite of invitations) {
    if (invite.teamId === teamId) {
      return true;
    }
  }
  return false;
}

export function isParticipantStudent(participant: Participant) {
  return participant.grade.length <= 2;
}

export function isParticipantAlumni(participant: Participant) {
  return !isParticipantStudent(participant);
}

export async function getParticipantsWithNoTeam(Invite: boolean = false) {
  if (Invite) {
    const results = await selectFromParticipants().where(
      and(
        isNull(particpants.teamId),
        eq(particpants.isLookingForTeam, true),
        eq(particpants.isDisqualified, false),
      ),
    );
    return results;
  }
  const results = await selectFromParticipants().where(
    isNull(particpants.teamId),
  );
  return results;
}

function formatParticipantQualifier(participant: Participant) {
  if (isParticipantStudent(participant)) {
    return `(${participant.grade}${participant.parallel})`;
  } else {
    return `(ТУЕС'${participant.grade})`;
  }
}

const DISCORD_NICK_MAX_LENGTH = 32;

export function formatParticipantDiscordNick(participant: Participant) {
  const qualifier = formatParticipantQualifier(participant);
  let nick = `${participant.firstName} ${participant.lastName} ${qualifier}`;

  if (nick.length > DISCORD_NICK_MAX_LENGTH) {
    const lastNameInitial = participant.lastName.at(0)
      ? ` ${participant.lastName.at(0)}.`
      : "";
    nick = `${participant.firstName}${lastNameInitial} ${qualifier}`;
  }

  if (nick.length > DISCORD_NICK_MAX_LENGTH) {
    nick = `${participant.firstName} ${qualifier}`;
  }

  if (nick.length > DISCORD_NICK_MAX_LENGTH) {
    const afterNickname = ` ${qualifier}`;
    nick =
      nick.slice(0, DISCORD_NICK_MAX_LENGTH - afterNickname.length) +
      afterNickname;
  }

  invariant(
    nick.length <= DISCORD_NICK_MAX_LENGTH,
    "bug in discord nick algorithm",
  );

  return nick;
}
