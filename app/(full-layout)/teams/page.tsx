import Link from "next/link";

import { IfHTFeatureOn } from "~/app/_integrations/components";
import { getConfirmedTeamsNumber } from "~/app/(full-layout)/teams/actions";
import TeamCard from "~/app/components/Team/teamCard";
import { Button } from "~/app/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/app/components/ui/tabs";
import { getParticipantFromSession } from "~/app/participants/service";
import { getConfirmedTeams } from "./service";

export default async function TeamList() {
  const teams = await getConfirmedTeams();
  const participant = await getParticipantFromSession();

  let studentTeams: typeof teams = [];
  let graduateTeams: typeof teams = [];
  teams.map((te) => {
    if (te.isAlumni) {
      graduateTeams.push(te);
    } else {
      studentTeams.push(te);
    }
  });

  const confirmedStudentTeamsNumber = await getConfirmedTeamsNumber(false);
  const confirmedAlumniTeamsNumber = await getConfirmedTeamsNumber(true);
  let canCreateTeam = false;
  if (participant?.grade) {
    canCreateTeam =
      (confirmedAlumniTeamsNumber < 20 && parseInt(participant.grade) > 12) ||
      (confirmedStudentTeamsNumber < 20 && parseInt(participant.grade) <= 12);
  }

  //   TODO: move elsewhere
  return (
    //bg-[url('./assets/background.png')]
    <div className="justify-centerми flex h-full w-full flex-col items-center">
      <IfHTFeatureOn feature="create-team">
        {participant && !participant.team.id && canCreateTeam && (
          <Button
            asChild
            variant="destructive"
            className="m-3 xl:absolute xl:right-60 xl:top-5 xl:m-4"
          >
            <Link href="/teams/new">Създай отбор</Link>
          </Button>
        )}
      </IfHTFeatureOn>
      <Tabs
        defaultValue={studentTeams.length > 0 ? "students" : "alumni"}
        className="content-center"
      >
        <TabsList className="mx-auto flex w-min sm:absolute sm:right-5 sm:top-5 sm:m-4">
          <TabsTrigger value="students">Ученици</TabsTrigger>
          <TabsTrigger value="alumni">Завършили</TabsTrigger>
        </TabsList>
        <TabsContent value="students">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <h1 className="mt-4 self-center text-center font-mono text-3xl font-semibold italic text-white sm:text-4xl">
              Отбори на ученици
            </h1>
            <h2 className="m-4 self-center text-center font-mono text-2xl font-semibold italic tracking-tight  text-white sm:text-3xl">
              Потвърдени отбори: {confirmedStudentTeamsNumber}/70
            </h2>
            <div className="inline-grid w-full grid-cols-1 gap-5 py-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {studentTeams.map((team) => (
                <TeamCard team={team} key={team.id} />
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="alumni">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <h1 className="mt-4 self-center text-center font-mono text-3xl font-semibold italic text-white sm:mt-4 sm:text-4xl">
              Отбори на завършили
            </h1>

            <h2 className="m-4 self-center text-center font-mono text-2xl font-semibold italic tracking-tight  text-white sm:text-3xl">
              Потвърдени отбори: {confirmedAlumniTeamsNumber}/20
            </h2>

            <div className="inline-grid w-full grid-cols-1 gap-5 py-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {graduateTeams.map((team) => (
                <TeamCard team={team} key={team.id} />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
