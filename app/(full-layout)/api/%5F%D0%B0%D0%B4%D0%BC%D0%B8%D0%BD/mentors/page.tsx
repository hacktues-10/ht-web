import { AdminOrNotFound } from "../components/server";
import TableData from "../components/TableData";
import { getMentorsAdmin } from "./service";

export default async function AdminMentorList() {
  const mentors = await getMentorsAdmin();

  return (
    <>
      <AdminOrNotFound />
      <h1 className="text-xl font-bold">Ментори</h1>
      <TableData data={mentors} />
    </>
  );
}
