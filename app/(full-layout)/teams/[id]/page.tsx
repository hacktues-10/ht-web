import Link from "next/link";
import { notFound } from "next/navigation";
import { TbBrandGithub } from "react-icons/tb";

import { IfHTFeatureOn } from "~/app/_integrations/components";
import { getImageUrl } from "~/app/_integrations/r2";
import { getMentorById } from "~/app/(full-layout)/mentors/service";
import {
  checkStateJoinRequests,
  getProjectById,
  getTeamMembers,
  isTeamFull,
  prepareParticipants,
} from "~/app/(full-layout)/teams/actions";
import {
  getTeamById,
  isParticipantEligableToJoin,
} from "~/app/(full-layout)/teams/service";
import AskToJoinButton from "~/app/components/AskToJoinButton";
import DeleteTeamButton from "~/app/components/DeleteTeamButton";
import { InviteForm } from "~/app/components/InviteForm";
import TeamDetailsComponent from "~/app/components/teamDetailsComponent";
import TeamMemberDetailedView from "~/app/components/teamMemberDetailedView";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/app/components/ui/avatar";
import { Badge } from "~/app/components/ui/badge";
import { Button } from "~/app/components/ui/button";
import { Card } from "~/app/components/ui/card";
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

  const isEligabletoJoin = isParticipantEligableToJoin(participant, team);

  const hasAskedToJoinState = await checkStateJoinRequests({
    targetTeamId: team.id,
  });

  const techn = convertToPaginatedTechnologies(team.technologies || "", 8);
  const mentor = team.mentorId ? await getMentorById(team.mentorId) : null;
  let url = null;
  if (mentor?.fileName) {
    url = await getImageUrl({ fileName: mentor?.fileName });
  }

  const preparedParticipants = await prepareParticipants(
    team,
    participant?.id ?? null,
  );
  const teamMembers = await getTeamMembers(team.id);
  // teamMembers.push(teamMembers[0]);
  // teamMembers.push(teamMembers[0]);
  // teamMembers.push(teamMembers[0]);
  // teamMembers.push(teamMembers[0]);

  const project = await getProjectById(team.projectId);
  const isFull = await isTeamFull(team.id);

  return (
    <div className="h-full w-full max-w-6xl justify-center text-center ">
      <Card className="h-min rounded-3xl border-2 p-5 pt-0 sm:p-10 sm:pt-5">
        <div className="flex w-full">
          <div className="flex items-center">
            <Button asChild variant="secondary" className="mt-8">
              <Link href="/teams">
                {"<- "}
                Назад
              </Link>
            </Button>
            {participant &&
              !participant.team.id &&
              isEligabletoJoin &&
              !isFull && (
                <div className="ml-5">
                  <IfHTFeatureOn feature="update-team-members">
                    <AskToJoinButton
                      teamid={team.id}
                      hasAskedToJoinState={hasAskedToJoinState}
                    />
                  </IfHTFeatureOn>
                </div>
              )}
          </div>

          <div className="ml-auto mr-0">
            <TeamDetailsComponent team={team} />
          </div>
        </div>
        <div className="mt-4 flex flex-grow items-center justify-center sm:mt-1">
          <h1 className="ml-auto mr-auto mt-0 flex font-mono text-4xl font-semibold italic text-white sm:text-5xl">
            {team.name}
          </h1>
        </div>
        <div className="z-10 mt-4 flex w-full flex-wrap items-center justify-center sm:mb-4 sm:mt-10">
          {teamMembers.map((member) => (
            <TeamMemberDetailedView
              member={member}
              participant={participant}
              team={team}
              key={member.id}
            />
          ))}
        </div>
      </Card>
      <div className="w-full  sm:flex">
        <Card className="mt-10 self-center rounded-3xl border-2 p-3 sm:w-3/5">
          <Tabs defaultValue="information">
            {participant?.team.id == team.id && (
              <TabsList className="mb-4">
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

            <div className="ml-1 mr-1 mt-0 rounded-3xl border-2 px-5 pb-5 pt-2 text-left sm:m-auto">
              <TabsContent value="information">
                {project ? (
                  <div>
                    <h2 className="w-full text-2xl">{project.name}</h2>
                    <h3 className="mt-4 text-xl">{project.description}</h3>

                    {project.websiteURL && (
                      <div className="mt-2 flex ">
                        <TbBrandGithub size={26} />
                        <div className="overflow-x-scroll">
                          <Link
                            className="ml-2 text-lg"
                            href={project.websiteURL}
                          >
                            {project.websiteURL}
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="items-center justify-center sm:flex">
                    <h3 className="mt-2 text-center text-xl">
                      Все още няма създаден проект :(
                    </h3>
                    {/* {participant?.team.id == team.id &&
                      participant.team.isCaptain && (
                        <Button
                          variant="outline"
                          className="mt-2 sm:ml-auto"
                          asChild
                        >
                          <Link href={`/teams/${team.id}/project/new`}>
                            Създай проект
                          </Link>
                        </Button>
                      )} */}
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
        </Card>
        <div className="sm:w-2/5">
          <Card className="m-10 ml-auto mr-auto flex h-min w-5/6 rounded-3xl border-2 p-5 sm:mr-0">
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
          </Card>

          <Card className="m-10 ml-auto mr-auto h-min w-5/6 overflow-hidden rounded-3xl border-2 p-5 sm:mr-0">
            <h3 className="mb-2 text-2xl">Технологии</h3>
            {techn && techn.length > 0 ? (
              <div className="m-2 w-full flex-auto gap-2 p-2">
                {techn.map((technology, index) => (
                  <Badge
                    variant="outline"
                    style={{
                      backgroundColor: technology?.color,
                      color: technology?.textColor,
                    }}
                    className="m-1 whitespace-nowrap text-base"
                    key={index}
                  >
                    {technology?.name}
                  </Badge>
                ))}
              </div>
            ) : (
              <Badge className="m-2 scroll-m-20 leading-7">
                Няма технологии :(
              </Badge>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
