import Link from "next/link";
import { notFound } from "next/navigation";

import { IfHTFeatureOn } from "~/app/_integrations/components";
import AskToJoinButton from "~/app/components/AskToJoinButton";
import DeleteTeamButton from "~/app/components/DeleteTeamButton";
import { InviteForm } from "~/app/components/InviteForm";
import TeamMember from "~/app/components/TeamMember";
import { getParticipantFromSession } from "~/app/participants/service";
import { checkStateJoinRequests, getTeamMembers } from "~/app/teams/actions";
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
  const isEligabletoJoin = isParticipantEligableToJoin(participant, team);

  const hasAskedToJoinState = await checkStateJoinRequests({
    targetTeamId: team.id,
  });

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
      <IfHTFeatureOn feature="update-team-details">
        {participant &&
          participant.team.isCaptain &&
          participant.team.id == team.id && <DeleteTeamButton id={team.id} />}
      </IfHTFeatureOn>
      <IfHTFeatureOn feature="update-team-members">
        {participant && !participant.team.id && isEligabletoJoin && (
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
      </IfHTFeatureOn>
      {teamMembers.map((member) => (
        <TeamMember
          key={member.id}
          member={member}
          isCaptain={participant?.team.isCaptain}
          participantId={participant?.id}
        />
      ))}
    </div>
  );
}

function isParticipantEligableToJoin(
  participant: Awaited<ReturnType<typeof getParticipantFromSession>>,
  team: Exclude<Awaited<ReturnType<typeof getTeamById>>, null>,
) {
  if (!participant || !participant.grade) {
    return false;
  }
  const grade = parseInt(participant.grade);
  return (grade > 12 && team.isAlumni) || (grade < 13 && !team.isAlumni);
}
