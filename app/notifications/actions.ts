import { eq } from "drizzle-orm";

import { db } from "../db";
import { notifications } from "../db/schema";
import { getParticipantFromSession } from "../participants/service";

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
