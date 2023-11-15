import { AdminOrNotFound } from "./components/server";
import { getParticipantsAdmin } from "./participants/service";
import { getAdminFromSession } from "./service";
import { getTeamsAdmin } from "./teams/service";

export default async function AdminPage() {
  const admin = await getAdminFromSession();

  // XXX: Use SQL to aggregate, instead of doing it in the app.
  const participants = await getParticipantsAdmin();
  const participantsCount = participants.length;
  const teams = await getTeamsAdmin();
  const teamsCount = teams.length;
  const mentors = await getTeamsAdmin();
  const mentorsCount = mentors.length;

  return (
    <>
      <AdminOrNotFound />
      <div>
        <h1 className="text-lg font-bold">Здрасти, {admin?.firstName}!</h1>
        {/* FIXME: better UI */}
        Участници: {participantsCount}
        <br />
        Отбори: {teamsCount}
        <br />
        Ментори: {mentorsCount}
      </div>
    </>
  );
}
