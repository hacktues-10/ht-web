import { db } from "~/app/db";
import { particpants } from "~/app/db/schema";
import { getAdminFromSession } from "../service";

export async function getParticipantsAdmin() {
  const admin = await getAdminFromSession();
  if (!admin) {
    return [];
  }
  return db.select().from(particpants);
}
