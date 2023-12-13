import { eq } from "drizzle-orm";

import { db } from "~/app/db";
import { discordUsers } from "~/app/db/schema";

export const getUserDiscordName = async (id: number) => {
  const res = await db
    .select()
    .from(discordUsers)
    .where(eq(discordUsers.participantId, id));

  return res.at(0)?.discordUsername || null;
};
