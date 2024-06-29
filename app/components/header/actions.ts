"use server";

import { getNotificationsOfParticipant } from "~/app/_notifications/service";
import {
  getParticipantFromSession,
  Participant,
} from "~/app/participants/service";

export const getHeaderData = async () => {
  return {
    avatarName: null,
    notifications: null,
    participant: null,
  };
};
