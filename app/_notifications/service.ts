import { eq, sql } from "drizzle-orm";
import invariant from "tiny-invariant";

import { db } from "~/app/db";
import {
  invitations,
  joinRequests,
  notifications,
  particpants,
  teams,
} from "~/app/db/schema";
import { Participant } from "../participants/service";

export type HTNotification = Awaited<
  ReturnType<typeof getNotificationsOfParticipant>
>[number];

export async function getNotificationsOfParticipant(participant: Participant) {
  const notificationRes = await db
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
        invitedParticipantId: invitations.invitedParticipantId,
        senderParticipantId: invitations.senderParticipantId,
      },
      // FIXME: this
      thereIsABugInThisRequestThatWeWillFixLater: sql<true>`true`,
    })
    .from(notifications)
    .where(eq(notifications.targetUserId, participant.id))
    .leftJoin(joinRequests, eq(notifications.referenceId, joinRequests.id))
    .leftJoin(invitations, eq(notifications.referenceId, invitations.id));

  return Promise.all(
    notificationRes.map(async (notification) => {
      if (notification.type === "ask_join") {
        invariant(notification.joinRequest, "joinRequest should be defined");
        const senderParticipant = await db.query.particpants.findFirst({
          where: eq(particpants.id, notification.joinRequest.userId),
          columns: {
            id: true,
            firstName: true,
            lastName: true,
            grade: true,
            parallel: true,
            technologies: true,
          },
        });
        invariant(senderParticipant, "team should be defined");
        return {
          id: notification.id,
          type: "ask_join" as const,
          targetUserId: notification.targetUserId,
          joinRequest: {
            id: notification.joinRequest.id,
            teamId: notification.joinRequest.teamId,
            userId: notification.joinRequest.userId,
            senderParticipant,
          },
        };
      } else if (notification.type === "invitation") {
        invariant(notification.invitation, "invitation should be defined");
        const senderParticipant = await db.query.particpants.findFirst({
          where: eq(
            particpants.id,
            notification.invitation.senderParticipantId,
          ),
          columns: {
            id: true,
            firstName: true,
            lastName: true,
            grade: true,
            parallel: true,
            technologies: true,
          },
        });
        invariant(senderParticipant, "senderParticipant should be defined");
        return {
          id: notification.id,
          type: "invitation" as const,
          targetUserId: notification.targetUserId,
          invitation: {
            id: notification.invitation.id,
            teamId: notification.invitation.teamId,
            senderParticipant,
          },
        };
      }
      invariant(
        false,
        `notification type ${notification.type} is not supported`,
      );
    }),
  );
}
