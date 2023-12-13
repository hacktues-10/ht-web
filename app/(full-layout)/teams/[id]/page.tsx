import Link from "next/link";
import { notFound } from "next/navigation";

import { IfHTFeatureOn } from "~/app/_integrations/components";
import {
  checkStateJoinRequests,
  getTeamMembers,
} from "~/app/(full-layout)/teams/actions";
import AskToJoinButton from "~/app/components/AskToJoinButton";
import DeleteTeamButton from "~/app/components/DeleteTeamButton";
import { InviteForm } from "~/app/components/InviteForm";
import TeamMember from "~/app/components/TeamMember";
import { Button } from "~/app/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/app/components/ui/tabs";
import { getParticipantFromSession } from "~/app/participants/service";
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

  const colors = [
    "bg-red-700",
    "bg-green-700",
    "bg-orange-700",
    "bg-yellow-700",
    "bg-emerald-700",
    "bg-cyan-700",
    "bg-sky-700",
    "bg-indigo-700",
    "bg-violet-700",
    "bg-purple-700",
  ];

  const isEligabletoJoin = isParticipantEligableToJoin(participant, team);

  const hasAskedToJoinState = await checkStateJoinRequests({
    targetTeamId: team.id,
  });

  const teamMembers = await getTeamMembers(team.id);

  return (
    <div className="h-full w-full bg-slate-900 text-center">
      <div className="w-full sm:flex">
        <div className="flex items-center">
          <Button asChild variant="secondary" className="mt-8">
            <Link href="/teams">
              {"<- "}
              Назад
            </Link>
          </Button>
        </div>
        <div className="flex flex-grow items-center justify-center">
          <h1 className="mt-8 font-mono text-4xl font-semibold text-white sm:text-5xl">
            Отбор: <span className="italic">{team.name}</span>
          </h1>
        </div>
      </div>
      <div className="mt-4 inline-grid h-20 w-full grid-cols-5 gap-5 sm:mb-4 sm:mt-10 sm:h-32">
        {teamMembers.map((member) => (
          <div key={member.id}>
            <div
              className={`z-32 h-18 w-18 ml-auto mr-auto flex items-center justify-center rounded-full sm:h-32 sm:w-32 ${
                colors[(member.firstName?.charCodeAt(0) ?? 0) % 10]
              } text-center`}
            >
              <h1 className="p-2 text-3xl sm:text-6xl">
                {member.firstName?.charAt(0).toUpperCase()}
              </h1>
            </div>
          </div>
        ))}
      </div>
      <Tabs defaultValue="information" className="w-full content-center">
        <TabsList className="mx-auto flex w-full justify-center">
          <TabsTrigger
            className="text-md m-1 sm:m-[10%] sm:text-lg"
            value="information"
          >
            Информация
          </TabsTrigger>
          <TabsTrigger
            className="text-md m-1 sm:m-[10%] sm:text-lg"
            value="members"
          >
            Участници
          </TabsTrigger>
          <TabsTrigger
            className="text-md m-1 sm:m-[10%] sm:text-lg"
            value="settings"
          >
            Настройки
          </TabsTrigger>
        </TabsList>
        <TabsContent value="students"></TabsContent>
        <TabsContent value="settings">
          <IfHTFeatureOn feature="update-team-details">
            {participant &&
              participant.team.isCaptain &&
              participant.team.id == team.id && (
                <DeleteTeamButton id={team.id} />
              )}
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
        </TabsContent>
      </Tabs>
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
