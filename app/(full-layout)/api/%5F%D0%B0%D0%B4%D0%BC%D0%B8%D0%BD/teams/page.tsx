import { AdminOrNotFound } from "../components/server";
import { getTeamsAdmin } from "./service";

export default async function AdminTeamList() {
  const teams = await getTeamsAdmin();

  return (
    <>
      <AdminOrNotFound />
      <h1 className="text-xl font-bold">Отбори</h1>
      <pre>{JSON.stringify(teams, null, 2)}</pre>
    </>
  );
}
