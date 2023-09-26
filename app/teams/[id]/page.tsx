import Link from "next/link";
import { notFound } from "next/navigation";

import AskToJoinButton from "~/app/components/AskToJoinButton";
import DeleteTeamButton from "~/app/components/DeleteTeamButton";
import TeamMember from "~/app/components/TeamMember";
import { getParticipantFromSession } from "~/app/participants/service";
import { checkStateJoinRequests } from "~/app/teams/actions";
import { getTeamById, getTeamMembers } from "../service";

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
  const hasAskedToJoinState = await checkStateJoinRequests(team.id);
  const teamMembers = await getTeamMembers(team.id);
  if (!res?.id) {
    return null;
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
      {res.team.isCaptain && res.team.id == team.id && (
        <DeleteTeamButton id={team.id} />
      )}
      {!res.team.id && (
        <AskToJoinButton
          teamid={team.id}
          hasAskedToJoinState={hasAskedToJoinState}
        />
      )}

      {teamMembers.map((member) =>
        res?.team.isCaptain == true ? (
          <TeamMember
            key={member.id}
            member={member}
            isCaptain={true}
            participantId={res.id}
          />
        ) : (
          <TeamMember
            key={member.id}
            member={member}
            isCaptain={false}
            participantId={res.id}
          />
        ),
      )}
    </div>
  );
}
