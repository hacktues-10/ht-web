import Link from "next/link";
import { notFound } from "next/navigation";
import { TbBrandGithub } from "react-icons/tb";

import { IfHTFeatureOn } from "~/app/_integrations/components";
import { getImageUrl } from "~/app/_integrations/r2";
import { getMentorById } from "~/app/(full-layout)/mentors/services";
import {
  checkStateJoinRequests,
  getProjectById,
  getTeamMembers,
  isTeamFull,
  prepareParticipants,
  removeTeamMember,
} from "~/app/(full-layout)/teams/actions";
import {
  getTeamById,
  isParticipantEligableToJoin,
} from "~/app/(full-layout)/teams/service";
import AskToJoinButton from "~/app/components/AskToJoinButton";
import DeleteTeamButton from "~/app/components/DeleteTeamButton";
import { InviteForm } from "~/app/components/InviteForm";
import TeamDetailsComponent from "~/app/components/teamDetailsComponent";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/app/components/ui/avatar";
import { Badge } from "~/app/components/ui/badge";
import { Button } from "~/app/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/app/components/ui/tabs";
import { getParticipantFromSession } from "~/app/participants/service";
import { convertToPaginatedTechnologies } from "~/app/technologies";

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

  const techn = convertToPaginatedTechnologies(team.technologies || "", 8);
  const mentor = await getMentorById(team.mentorId);
  let url = null;
  if (mentor?.fileName) {
    url = await getImageUrl({ fileName: mentor?.fileName });
  }

  const preparedParticipants = await prepareParticipants(
    team,
    participant?.id ?? null,
  );
  const teamMembers = await getTeamMembers(team.id);

  const project = await getProjectById(team.projectId);
  const isFull = await isTeamFull(team.id);
  return (
    <div className="h-full w-full max-w-6xl justify-center text-center ">
      <div className="rounded-3xl border-2 bg-slate-900 p-10 pt-5">
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
            <h1 className="ml-auto mr-auto mt-8 flex font-mono text-4xl font-semibold italic text-white sm:text-5xl">
              {team.name}
            </h1>
          </div>
          <div className="mr-0 flex">
            <TeamDetailsComponent team={team} />
          </div>
        </div>
        <div className="mt-4 inline-grid h-20 w-full grid-cols-5 gap-5 sm:mb-4 sm:mt-10 sm:h-32">
          {teamMembers.map((member) => (
            <div key={member.id}>
              <div
                className={`z-32 ml-auto mr-auto flex h-14 w-14 items-center justify-center rounded-full sm:h-32 sm:w-32 ${
                  colors[(member.firstName?.charCodeAt(0) ?? 0) % 10]
                } text-center`}
              >
                <h1 className="p-2 text-3xl sm:text-6xl">
                  {member.firstName?.charAt(0).toUpperCase()}
                </h1>
              </div>
              {participant?.team.isCaptain &&
                participant.team.id == team.id &&
                participant.id != member.id && (
                  <div className="z-10 ml-auto mr-auto mt-2 flex h-4 w-4 items-center justify-center rounded-full bg-gray-500 opacity-70 sm:h-8 sm:w-8">
                    <h1
                      className="p-2 text-lg sm:text-xl"
                      onClick={() => {
                        removeTeamMember(member.id);
                      }}
                    >
                      X
                    </h1>
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full sm:flex">
        <div className="mt-10 self-center rounded-3xl border-2 bg-slate-900 p-3 sm:w-3/5">
          <Tabs defaultValue="information">
            {participant?.team.id == team.id && (
              <TabsList>
                <TabsTrigger className="text-md sm:text-lg" value="information">
                  Информация
                </TabsTrigger>
                {participant?.team.isCaptain &&
                  participant?.team.id == team.id && (
                    <TabsTrigger
                      className="text-md sm:text-lg"
                      value="settings"
                    >
                      Настройки
                    </TabsTrigger>
                  )}
              </TabsList>
            )}

            <div className="m-auto ml-auto mr-auto mt-5 rounded-3xl border-2 p-10 pb-5 pt-5 text-left">
              <TabsContent value="information">
                {participant && !participant.team.id && isEligabletoJoin && (
                  <IfHTFeatureOn feature="update-team-members">
                    <AskToJoinButton
                      teamid={team.id}
                      hasAskedToJoinState={hasAskedToJoinState}
                    />
                  </IfHTFeatureOn>
                )}
                {project ? (
                  <div>
                    <h2 className="mt-4 w-full text-2xl">{project.name}</h2>
                    <h3 className="mt-4 text-xl">{project.description}</h3>

                    {project.websiteURL && (
                      <div className="mt-2 flex">
                        <TbBrandGithub size={28} />
                        <Link
                          className="ml-2 text-xl"
                          href={project.websiteURL}
                        >
                          {project.websiteURL}
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex">
                    <h3 className="mt-2 text-xl">
                      Все още няма създаден проект :(
                    </h3>
                    {participant?.team.id == team.id &&
                      participant.team.isCaptain && (
                        <Button variant="outline" className="ml-auto" asChild>
                          <Link href={`/teams/${team.id}/project/new`}>
                            Създай проект
                          </Link>
                        </Button>
                      )}
                  </div>
                )}
              </TabsContent>
              <TabsContent
                value="settings"
                className="w-full items-center justify-center sm:flex"
              >
                <IfHTFeatureOn feature="update-team-members">
                  {participant &&
                    participant.team.id === team.id &&
                    participant.team.isCaptain &&
                    !isFull && (
                      <div className="m-auto justify-center text-center text-xl sm:mt-auto">
                        <h3 className="mb-3 ">Покани участник</h3>
                        <InviteForm
                          teamId={participant.team.id.toString()}
                          participants={preparedParticipants}
                        />
                      </div>
                    )}
                </IfHTFeatureOn>
                <IfHTFeatureOn feature="update-team-details">
                  {participant &&
                    participant.team.isCaptain &&
                    participant.team.id == team.id && (
                      <div className="m-auto mt-5 justify-center text-center">
                        <DeleteTeamButton id={team.id} />
                      </div>
                    )}
                </IfHTFeatureOn>
              </TabsContent>
            </div>
          </Tabs>
        </div>
        <div className="sm:w-2/5">
          <div className="m-10 ml-auto mr-auto flex h-min w-5/6 rounded-3xl border-2 bg-slate-900 p-5 sm:mr-0">
            {team.mentorId && url ? (
              <>
                <div>
                  <Avatar>
                    <AvatarImage src={url}></AvatarImage>
                    <AvatarFallback>?</AvatarFallback>
                  </Avatar>
                </div>
                <h2 className="m-auto text-lg">
                  {mentor?.firstName} {mentor?.lastName}
                </h2>
              </>
            ) : (
              <>
                <div>
                  <Avatar>
                    <AvatarImage></AvatarImage>
                    <AvatarFallback>?</AvatarFallback>
                  </Avatar>
                </div>
                <h2 className="m-auto text-lg">Все още няма ментор</h2>
              </>
            )}
          </div>

          <div className="m-10 ml-auto mr-auto h-min w-5/6 overflow-hidden rounded-3xl border-2 bg-slate-900 p-5 sm:mr-0">
            <h3 className="text-2xl">Технологии</h3>
            {techn && techn.length > 0 ? (
              <div className="flex w-full gap-2 overflow-hidden p-2">
                {techn.map((technology, index) => (
                  <Badge
                    variant="outline"
                    style={{
                      backgroundColor: technology?.color,
                      color: technology?.textColor,
                    }}
                    className="whitespace-nowrap text-base"
                    key={index}
                  >
                    {technology?.name}
                  </Badge>
                ))}
              </div>
            ) : (
              <Badge className="scroll-m-20 leading-7">
                Няма технологии :(
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
