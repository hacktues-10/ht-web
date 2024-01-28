import { AdminOrNotFound } from "../components/server";
import TableData from "../components/TableAndOptions/components/TableData";
import TeamsTableAndOptions from "../components/TableAndOptions/TeamsTableAndOptions";
import { getTeamsAdmin } from "./service";

export default async function AdminTeamList() {
  const teams = await getTeamsAdmin();

  return (
    <>
      <AdminOrNotFound />
      <h1 className="text-xl font-bold">Отбори</h1>
      <TeamsTableAndOptions teams={teams} />
    </>
  );
}
