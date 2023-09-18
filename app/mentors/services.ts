import { eq } from "drizzle-orm";

import { mentors } from "~/app/db/schema";
import { db } from "../db";

export const getMentor = async (email: string) => {
  const mentor = await db
    .select()
    .from(mentors)
    .where(eq(mentors.email, email));
  return mentor[0];
};

export const getAllMentors = async () => {
  const allMentors = await db.select().from(mentors);
  return allMentors;
};
