import { notFound } from "next/navigation";

import { getAdminFromSession } from "../service";

export async function AdminOrNotFound() {
  const admin = await getAdminFromSession();
  if (!admin) {
    notFound();
  }
  return null;
}
