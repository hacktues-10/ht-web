"use server";

import { getNotificationsOfParticipant } from "~/app/_notifications/service";
import { getParticipantFromSession } from "~/app/participants/service";

export const getHeaderData = async () => {
  const participant = await getParticipantFromSession();
  return {
    avatarName: participant
      ? `${participant.firstName} ${participant.lastName}`
      : null,
    notifications: participant
      ? await getNotificationsOfParticipant(participant)
      : null,
    participant:
      participant !== null
        ? {
            id: participant.id,
            isLookingForTeam: participant.isLookingForTeam,
          }
        : null,
  };
};