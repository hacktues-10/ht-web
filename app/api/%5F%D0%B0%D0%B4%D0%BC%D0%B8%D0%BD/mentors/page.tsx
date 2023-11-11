import { AdminOrNotFound } from "../components/server";
import { getMentorsAdmin } from "./service";

export default async function AdminMentorList() {
  const mentors = await getMentorsAdmin();

  return (
    <>
      <AdminOrNotFound />
      <h1 className="text-xl font-bold">Ментори</h1>
      <pre>{JSON.stringify(mentors, null, 2)}</pre>
    </>
  );
}
