import { getParticipantsAdmin } from "~/app/participants/service";
import { AdminOrNotFound } from "../components/server";
import TableAndOptions from "../components/TableAndOptions";

export default async function AdminParticipantList() {
  const data = await getParticipantsAdmin();

  if (!data) return null;

  return (
    <>
      <AdminOrNotFound />
      <h1 className="text-xl font-bold">Завършили</h1>
      <TableAndOptions participants={data} />
    </>
  );
}
