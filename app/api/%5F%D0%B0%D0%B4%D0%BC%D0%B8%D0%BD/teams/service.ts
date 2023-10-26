import { db } from "~/app/db";
import { teams } from "~/app/db/schema";
import { getAdminFromSession } from "../service";

export async function getTeamsAdmin() {
  const admin = await getAdminFromSession();
  if (!admin) {
    return [];
  }
  return db.select().from(teams);
}
