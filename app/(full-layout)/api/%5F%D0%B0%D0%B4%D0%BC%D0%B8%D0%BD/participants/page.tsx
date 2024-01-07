import { AdminOrNotFound } from "../components/server";
import TableData from "../components/TableData";
import { getParticipantsAdmin } from "./service";

export default async function AdminParticipantList() {
  const participants = await getParticipantsAdmin();

  return (
    <>
      <AdminOrNotFound />
      <h1 className="text-xl font-bold">Участници</h1>
      <DisqualifyParticipant participants={participants} />
      <TableData data={participants} />
    </>
  );
}
