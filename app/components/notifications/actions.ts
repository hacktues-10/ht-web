"use server";

import { eq } from "drizzle-orm";

import { db } from "~/app/db";
import { joinRequests, notifications, particpants } from "~/app/db/schema";

interface JoinRequest {
  id: number;
  userId: number;
  teamId: string;
}

// FIXME: use zact
export const acceptJoinRequest = async (
  joinRequest: JoinRequest | undefined
) => {
  console.log(joinRequest);

  if (joinRequest?.userId && joinRequest.teamId) {
    try {
      await db
        .update(particpants)
        .set({ teamId: joinRequest?.teamId, isCaptain: false })
        .where(eq(particpants.id, joinRequest?.userId));

      await db
        .delete(notifications)
        .where(eq(notifications.referenceId, joinRequest?.id));

      await db.delete(joinRequests).where(eq(joinRequests.id, joinRequest.id));
      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }
  return { success: false };
};

// FIXME: use zact
export const declineJoinRequest = async (joinRequest: JoinRequest) => {
  console.log(joinRequest);
  if (joinRequest?.userId && joinRequest.teamId) {
    try {
      await db
        .delete(notifications)
        .where(eq(notifications.referenceId, joinRequest?.id));

      await db.delete(joinRequests).where(eq(joinRequests.id, joinRequest.id));
      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }
  return { success: false };
};
