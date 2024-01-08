import { getAlumniParticipants } from "~/app/participants/service";
import TableData from "../../components/TableData";

export default async function AlumniParticipants() {
  const data = await getAlumniParticipants();
  if (!data) return null;

  return data && <TableData data={data} />;
}
