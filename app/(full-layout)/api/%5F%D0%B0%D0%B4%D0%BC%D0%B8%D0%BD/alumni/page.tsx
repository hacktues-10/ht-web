import { getAlumniParticipantsAdmin } from "~/app/participants/service";
import { AdminOrNotFound } from "../components/server";
import TableAndOptions from "../components/TableAndOptions";

export default async function AlumniParticipants() {
  const data = await getAlumniParticipantsAdmin();

  if (!data) return null;

  return (
    data && (
      <>
        <AdminOrNotFound />
        <h1 className="text-xl font-bold">Ученици</h1>
        <TableAndOptions participants={data} />;
      </>
    )
  );
}
