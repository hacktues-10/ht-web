"use server";

import { eq } from "drizzle-orm";

import { db } from "~/app/db";
import { askJoin, notifications, particpants } from "~/app/db/schema";

interface DetailedNotification {
  teamName: string | undefined;
  id: number;
  userId: number;
  teamId: string;
}

export const handleAcceptedJoinRequest = async (
  detailedNotific: DetailedNotification | undefined,
) => {
  console.log(detailedNotific);

  if (detailedNotific?.userId && detailedNotific.teamId) {
    try {
      await db
        .update(particpants)
        .set({ teamId: detailedNotific?.teamId, isCaptain: false })
        .where(eq(particpants.id, detailedNotific?.userId));

      await db
        .delete(notifications)
        .where(eq(notifications.referenceId, detailedNotific?.id));

      await db.delete(askJoin).where(eq(askJoin.id, detailedNotific.id));
      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }
  return { success: false };
};

export const handleDeclineJoinReqest = async (
  detailedNotific: DetailedNotification | undefined,
) => {
  console.log(detailedNotific);
  if (detailedNotific?.userId && detailedNotific.teamId) {
    try {
      await db
        .delete(notifications)
        .where(eq(notifications.referenceId, detailedNotific?.id));

      await db.delete(askJoin).where(eq(askJoin.id, detailedNotific.id));
      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }
  return { success: false };
};
