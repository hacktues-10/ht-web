import Link from "next/link";
import { notFound } from "next/navigation";

import AskToJoinButton from "~/app/components/AskToJoinButton";
import DeleteTeamButton from "~/app/components/DeleteTeamButton";
import { InviteForm } from "~/app/components/InviteForm";
import { getParticipantFromSession } from "~/app/participants/service";
import { checkStateJoinRequests } from "~/app/teams/actions";
import { getTeamById } from "../service";

export default async function TeamDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const participant = await getParticipantFromSession();
  const team = await getTeamById(id);
  if (!team) {
    notFound();
  }
  const hasAskedToJoinState = await checkStateJoinRequests(team.id);

  if (!participant?.team.id) {
    console.log(true);
  } else {
    console.log(false);
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
      {participant &&
        participant.team.isCaptain &&
        participant.team.id == team.id && <DeleteTeamButton id={team.id} />}
      {participant && !participant.team.id && (
        <AskToJoinButton
          teamid={team.id}
          hasAskedToJoinState={hasAskedToJoinState}
        />
      )}
      {participant &&
        participant.team.id === team.id &&
        participant.team.isCaptain && (
          <InviteForm teamId={participant.team.id.toString()} />
        )}
    </div>
  );
}
