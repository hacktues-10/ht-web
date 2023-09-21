import { eq } from "drizzle-orm";

import { mentors } from "~/app/db/schema";
import { db } from "../db";

export const getAllMentors = async () => {
  const allMentors = await db.select().from(mentors);
  return allMentors;
};
