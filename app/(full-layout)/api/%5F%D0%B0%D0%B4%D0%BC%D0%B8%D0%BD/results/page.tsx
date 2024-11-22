import { AdminOrNotFound } from "../components/server";
import TeamsResultsTableAndOptions from "../components/TableAndOptions/TeamsResultsTableAndOptions";
import { getTeamsResultsAdmin } from "./service";

export default async function AdminTeamList() {
  const teams = await getTeamsResultsAdmin();

  return (
    <>
      <AdminOrNotFound />
      <h1 className="text-xl font-bold">Отбори</h1>
      <TeamsResultsTableAndOptions teams={teams} />
    </>
  );
}
