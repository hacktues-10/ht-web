"use server";

import { getNotificationsOfParticipant } from "~/app/_notifications/service";
import { getHTSession, HTSession } from "~/app/api/auth/session";
import {
  getParticipantFromSession,
  Participant,
} from "~/app/participants/service";

export const getHeaderData = async () => {
  const session = await getHTSession();
  const participant = await getParticipantFromSession();
  return {
    avatarName: getAvatarName(session, participant),
    notifications: participant
      ? await getNotificationsOfParticipant(participant)
      : null,
    participant:
      participant !== null
        ? {
            id: participant.id,
            isLookingForTeam: participant.isLookingForTeam,
            team: participant.team.id,
          }
        : null,
  };
};

function getAvatarName(
  session: HTSession | null,
  participant: Participant | null,
) {
  if (!participant) {
    if (session) {
      return session.user?.email?.split("@").at(0) ?? "Unknown";
    }
    return null;
  }
  return `${participant.firstName}`;
}
