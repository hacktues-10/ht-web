import invariant from "tiny-invariant";

import { AdminOrNotFound } from "./components/server";
import { getAdminFromSession } from "./service";

export default async function AdminPage() {
  const admin = await getAdminFromSession();
  return (
    <>
      <AdminOrNotFound />
      <div>Здрасти, {admin?.firstName}!</div>
    </>
  );
}
