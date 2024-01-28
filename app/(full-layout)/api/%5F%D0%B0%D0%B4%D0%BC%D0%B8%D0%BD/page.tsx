import {
  getAlumniParticipantsAdmin,
  getStudentParticipantsAdmin,
} from "~/app/participants/service";
import { AdminOrNotFound } from "./components/server";
import { getAdminFromSession } from "./service";
import { getTeamsAdmin } from "./teams/service";

export default async function AdminPage() {
  const admin = await getAdminFromSession();

  // XXX: Use SQL to aggregate, instead of doing it in the app.

  const students = await getStudentParticipantsAdmin();
  const alumni = await getAlumniParticipantsAdmin();
  const teams = await getTeamsAdmin();
  const teamsCount = teams.length;
  // const mentors = await getTeamsAdmin();
  // const mentorsCount = mentors.length;

  return (
    <>
      <AdminOrNotFound />
      <div>
        <h1 className="text-lg font-bold">Здрасти, {admin?.firstName}!</h1>
        {/* FIXME: better UI */}
        Участници: {alumni.length + students.length}
        <br />
        Завървшили: {alumni.length}
        <br />
        Ученици: {students.length}
        <br />
        Отбори: {teamsCount}
        <br />
        {/* Ментори: {mentorsCount} */}
      </div>
    </>
  );
}
