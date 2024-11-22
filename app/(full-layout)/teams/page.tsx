import { Metadata } from "next";
import Link from "next/link";

import { MAX_TEAMS_STUDENTS } from "~/app/_configs/hackathon";
import { IfHTFeatureOn } from "~/app/_integrations/components";
import TeamCard from "~/app/components/Team/teamCard";
import { Button } from "~/app/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/app/components/ui/tabs";
import { getParticipantFromSession } from "~/app/participants/service";
import { getAllTeams, isTeamConfirmed } from "./service";

export const metadata: Metadata = {
  title: "Отбори",
  description: "Отборите, които участват в Hack TUES X",
  openGraph: {
    title: "Отбори",
    description: "Отборите, които участват в Hack TUES X",
  },
};

export default async function TeamListPage() {
  const teams = await getAllTeams();
  const participant = await getParticipantFromSession();

  const confirmedStudentTeamsNumber =
  teams.filter(isTeamConfirmed).length;

  let canCreateTeam = false;
  if (participant?.grade) {
    canCreateTeam =
      (confirmedStudentTeamsNumber < MAX_TEAMS_STUDENTS &&
        parseInt(participant.grade) <= 12);
  }

  //   TODO: move elsewhere
  return (
    //bg-[url('./assets/background.png')]
    <div className="h-full w-full max-w-[1920px] content-center items-center justify-center">
      <IfHTFeatureOn feature="create-team">
        {participant &&
          !participant.team.id &&
          canCreateTeam &&
          !participant.isDisqualified && (
            <div className="flex flex-col items-center justify-center">
              <Button asChild size="lg" className="mx-auto mb-3 mt-3">
                <Link href="/teams/new">Създай отбор</Link>
              </Button>
            </div>
          )}
      </IfHTFeatureOn>

      <Tabs
        defaultValue={teams.length > 0 ? "students" : "alumni"}
        className="content-center"
      >
        <TabsList className="mx-auto flex w-min">
          <TabsTrigger value="students">Ученици</TabsTrigger>
        </TabsList>
        <TabsContent value="students">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <h1 className="mt-4 self-center text-center text-3xl font-semibold text-white sm:text-4xl">
              Отбори на ученици
            </h1>
            <h2 className="m-4 self-center text-center text-2xl font-semibold tracking-tight  text-white sm:text-3xl">
              Потвърдени отбори: {confirmedStudentTeamsNumber}
            </h2>
            <div className="inline-grid w-full grid-cols-1 gap-5 py-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {teams.map((team, index) => (
                <TeamCard
                  team={{
                    id: team.id,
                    name: team.name,
                    technologies: team.technologies,
                    members: team.members.map((member) => ({
                      id: member.id,
                      firstName: member.firstName,
                      lastName: member.lastName,
                      isCaptain: member.isCaptain,
                      grade: member.grade,
                      parallel: member.parallel,
                      discordUser: member.discordUser
                        ? {
                            discordUsername: member.discordUser.discordUsername,
                          }
                        : undefined,
                    })),
                    project: team.project ? { name: team.project.name } : null,
                  }}
                  index={index}
                  key={team.id}
                />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
