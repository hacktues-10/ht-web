import { Metadata } from "next";

import TeamCard from "~/app/components/Team/teamCard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/app/components/ui/tabs";
import { getAllTeams } from "./service";

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
  const studentTeams = teams.filter((team: any) => !team.isAlumni);
  const alumniTeams = teams.filter((team: any) => team.isAlumni);

  let canCreateTeam = false;

  return (
    <div className="h-full w-full max-w-[1920px] content-center items-center justify-center">
      <Tabs
        defaultValue={studentTeams.length > 0 ? "students" : "alumni"}
        className="content-center"
      >
        <TabsList className="mx-auto flex w-min">
          <TabsTrigger value="students">Ученици</TabsTrigger>
          <TabsTrigger value="alumni">Завършили</TabsTrigger>
        </TabsList>
        <TabsContent value="students">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <h1 className="mt-4 self-center text-center text-3xl font-semibold text-white sm:text-4xl">
              Отбори на ученици
            </h1>
            <h2 className="m-4 self-center text-center text-2xl font-semibold tracking-tight  text-white sm:text-3xl">
              Потвърдени отбори: {studentTeams.length}
            </h2>
            <div className="inline-grid w-full grid-cols-1 gap-5 py-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {studentTeams.map((team: any, index: any) => (
                <TeamCard
                  team={{
                    id: team.id,
                    name: team.name,
                    technologies: team.technologies,
                    members: team.members.map((member: any) => ({
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
        <TabsContent value="alumni">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <h1 className="mt-4 self-center text-center text-3xl font-semibold text-white sm:mt-4 sm:text-4xl">
              Отбори на завършили
            </h1>

            <h2 className="m-4 self-center text-center text-2xl font-semibold tracking-tight  text-white sm:text-3xl">
              Потвърдени отбори: {alumniTeams.length}
            </h2>

            <div className="inline-grid w-full grid-cols-1 gap-5 py-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {alumniTeams.map((team: any, index: any) => (
                <TeamCard
                  team={{
                    id: team.id,
                    name: team.name,
                    technologies: team.technologies,
                    members: team.members.map((member: any) => ({
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
