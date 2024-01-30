import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { slugify } from "transliteration";

import { getTeamById } from "~/app/(full-layout)/teams/service";
import { db } from "~/app/db";
import { teams } from "~/app/db/schema";
import { getAdminFromSession } from "../service";

export async function AdminOrNotFound() {
  const admin = await getAdminFromSession();
  if (!admin) {
    notFound();
  }
  return null;
}
