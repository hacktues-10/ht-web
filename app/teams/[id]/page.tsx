import Link from "next/link";
import { notFound } from "next/navigation";

import AskToJoinButton from "~/app/components/AskToJoinButton";
import DeleteTeamButton from "~/app/components/DeleteTeamButton";
import { InviteForm } from "~/app/components/InviteForm";
import TeamMember from "~/app/components/TeamMember";
import { getParticipantFromSession } from "~/app/participants/service";
import { checkStateJoinRequests } from "~/app/teams/actions";
import { getTeamById, getTeamMembers } from "../service";

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

  const teamMembers = await getTeamMembers(team.id);

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
      {teamMembers.map((member) => (
        <TeamMember
          member={member}
          isCaptain={res.team.isCaptain}
          participantId={res.id}
        />
      ))}
    </div>
  );
}
