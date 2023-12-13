import { eq, sql } from "drizzle-orm";

import { db } from "~/app/db";
import { invitations, joinRequests, notifications } from "~/app/db/schema";
import { Participant } from "../participants/service";

export type HTNotification = Awaited<
  ReturnType<typeof getNotificationsOfParticipant>
>[number];

export async function getNotificationsOfParticipant(participant: Participant) {
  return db
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
      // FIXME: this
      thereIsABugInThisRequestThatWeWillFixLater: sql<true>`true`,
    })
    .from(notifications)
    .where(eq(notifications.targetUserId, participant.id))
    .leftJoin(joinRequests, eq(notifications.referenceId, joinRequests.id))
    .leftJoin(invitations, eq(notifications.referenceId, invitations.id));
}
