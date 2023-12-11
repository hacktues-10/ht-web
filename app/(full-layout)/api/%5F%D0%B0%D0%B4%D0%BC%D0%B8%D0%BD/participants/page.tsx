import { AdminOrNotFound } from "../components/server";
import { getParticipantsAdmin } from "./service";

export default async function AdminParticipantList() {
  const participants = await getParticipantsAdmin();

  return (
    <>
      <AdminOrNotFound />
      <h1 className="text-xl font-bold">Участници</h1>
      <pre>{JSON.stringify(participants, null, 2)}</pre>
    </>
  );
}
