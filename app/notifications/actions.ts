import { eq, sql } from "drizzle-orm";

import { db } from "../db";
import { invitations, joinRequests, notifications } from "../db/schema";
import { getParticipantFromSession } from "../participants/service";
import { getTeamById } from "../teams/service";

export type NotificationList = Exclude<
  Awaited<ReturnType<typeof getNotifications>>,
  null
>;

export const getNotifications = async () => {
  const user = await getParticipantFromSession();
  if (user) {
    const userNotifications = await db
      .select({
        id: notifications.id,
        type: notifications.type,
        targetUserId: notifications.targetUserId,
        joinRequest: {
          id: joinRequests.id,
          teamId: joinRequests.teamId,
          userId: joinRequests.userId,
        },
        invitation: {
          id: invitations.id,
          teamId: invitations.teamId,
          senderParticipantId: invitations.senderParticipantId,
          invitedParticipantId: invitations.invitedParticipantId,
        },
        thereIsABugInThisRequestThatWeWillFixLater: sql<true>`true`,
      })
      .from(notifications)
      .where(eq(notifications.targetUserId, user.id))
      .leftJoin(joinRequests, eq(notifications.referenceId, joinRequests.id))
      .leftJoin(invitations, eq(notifications.referenceId, invitations.id));

    return userNotifications;
  }
  return null;
};

export const handleAcceptedJoinRequest = () => {};
