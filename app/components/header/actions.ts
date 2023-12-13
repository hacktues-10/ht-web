"use server";

import { getNotificationsOfParticipant } from "~/app/notifications/service";
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
  };
};
