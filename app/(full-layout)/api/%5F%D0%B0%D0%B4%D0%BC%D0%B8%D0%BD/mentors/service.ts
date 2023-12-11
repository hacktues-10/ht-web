import { db } from "~/app/db";
import { mentors } from "~/app/db/schema";
import { getAdminFromSession } from "../service";

export async function getMentorsAdmin() {
  const admin = await getAdminFromSession();
  if (!admin) {
    return [];
  }
  return db.select().from(mentors);
}
