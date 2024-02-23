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
  const realStudent = students.filter((student) => student.team);
  const alumni = await getAlumniParticipantsAdmin();
  const realAlumni = alumni.filter((alumnus) => alumnus.team);
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
        Участници: {realAlumni.length + realStudent.length}
        <br />
        Завървшили: {realAlumni.length}
        <br />
        Ученици: {realStudent.length}
        <br />
        Отбори: {teamsCount}
        <br />
        {/* Ментори: {mentorsCount} */}
      </div>
    </>
  );
}
