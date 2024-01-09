import { getStudentParticipantsAdmin } from "~/app/participants/service";
import { AdminOrNotFound } from "../components/server";
import TableAndOptions from "../components/TableAndOptions";

export default async function AlumniParticipants() {
  const data = await getStudentParticipantsAdmin();

  if (!data) return null;

  return (
    <>
      <AdminOrNotFound />
      <h1 className="text-xl font-bold">Ученици</h1>
      <TableAndOptions participants={data} />;
    </>
  );
}
