import { db } from "~/app/db";
import { particpants } from "~/app/db/schema";
import { getAdminFromSession } from "../service";

export async function getParticipantsAdmin() {
  const admin = await getAdminFromSession();
  if (!admin) {
    return [];
  }

  const participants = await db.select().from(particpants);

  return participants.map((participant) => ({
    ...participant,
    createdAt: participant.createdAt.toISOString(),
  }));
}
