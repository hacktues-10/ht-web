import Link from "next/link";
import { notFound } from "next/navigation";

import AskToJoinButton from "~/app/components/AskToJoinButton";
import DeleteTeamButton from "~/app/components/DeleteTeamButton";
import { getParticipantFromSession } from "~/app/participants/service";
import { getTeamById } from "../service";

export default async function TeamDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const res = await getParticipantFromSession();

  const team = await getTeamById(id);
  if (!team) {
    notFound();
  }
  return (
    <div className="text-center">
      <Link
        href="/teams"
        className="bg-gradient-to-r from-pink-500 via-green-500 to-orange-900 bg-clip-text font-serif text-6xl font-extrabold italic text-transparent underline"
      >
        {"<- "}
        Назад
      </Link>
      <h1>{team.name}</h1>
      {res?.team.isCaptain && res?.team.id == team.id && (
        <DeleteTeamButton id={team.id} />
      )}
      {!res?.team.id && <AskToJoinButton />}
    </div>
  );
}
