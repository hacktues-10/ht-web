import { eq } from "drizzle-orm";

import { db } from "../db";
import { joinRequests, notifications } from "../db/schema";
import { getParticipantFromSession } from "../participants/service";
import { getTeamById } from "../teams/service";

export const getNotifications = async () => {
  const user = await getParticipantFromSession();
  if (user) {
    const userNotifications = await db
      .select()
      .from(notifications)
      .where(eq(notifications.targetUserId, user.id));

    return userNotifications;
  }
};

export const getNotificationDetails = async (notification: {
  id: number;
  targetUserId: number;
  referenceId: number;
  type: "invitation" | "ask_join";
}) => {
  if (notification.type === "ask_join") {
    const res = await db
      .select()
      .from(joinRequests)
      .where(eq(joinRequests.id, notification.referenceId));

    const team = await getTeamById(res[0].teamId);

    return {
      ...res[0],
      teamName: team?.name,
    };
  }
};

export const handleAcceptedJoinRequest = () => {};
