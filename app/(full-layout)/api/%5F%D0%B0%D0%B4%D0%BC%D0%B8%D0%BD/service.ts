"use server";

import { eq } from "drizzle-orm";

import { getHTSession } from "~/app/api/auth/session";
import { db } from "~/app/db";
import { admins, users } from "~/app/db/schema";

export async function getAdminFromSession() {
  const session = await getHTSession();
  if (!session?.user?.email) {
    return null;
  }
  const adminsList = await db
    .select()
    .from(admins)
    .leftJoin(users, eq(admins.userId, users.id))
    .where(eq(users.email, session.user.email));
  return adminsList.at(0)?.admins ?? null;
}
