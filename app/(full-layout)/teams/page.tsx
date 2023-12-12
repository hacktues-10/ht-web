import { useState } from "react";
import Link from "next/link";

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

  //   TODO: move elsewhere
  return (
    //bg-[url('./assets/background.png')]
    <div className="flex h-full w-full flex-col items-center justify-center bg-slate-900">
      <IfHTFeatureOn feature="create-team">
        {participant && !participant.team.id && (
          <Button asChild variant="destructive" className="mt-4">
            <Link href="/teams/new">Създай отбор</Link>
          </Button>
        )}
      </IfHTFeatureOn>
      <Tabs
        defaultValue={studentTeams.length > 0 ? "students" : "alumni"}
        className="content-center"
      >
        <TabsList className="mx-auto flex w-min justify-center">
          <TabsTrigger value="students">Ученици</TabsTrigger>
          <TabsTrigger value="alumni">Завършили</TabsTrigger>
        </TabsList>
        <TabsContent value="students">
          <div className="flex h-full w-full flex-col items-center justify-center bg-slate-900">
            <h1 className="mt-8 self-center font-mono text-3xl font-semibold italic text-white sm:text-4xl">
              Отбори на ученици
            </h1>
            {studentTeams.length < 1 && (
              <h2 className="mt-8 self-center font-mono text-2xl font-semibold italic text-white sm:text-3xl">
                Все още няма потвърдени отбори.
              </h2>
            )}
            <div className="inline-grid w-full grid-cols-1 gap-5 py-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {studentTeams.map((team) => (
                <>
                  <TeamCard team={team} />
                  <TeamCard team={team} />
                  <TeamCard team={team} />
                  <TeamCard team={team} />
                  <TeamCard team={team} />
                  <TeamCard team={team} />
                </>
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="alumni">
          <div className="flex h-full w-full flex-col items-center justify-center bg-slate-900">
            <h1 className="mt-8 self-center font-mono text-3xl font-semibold italic text-white sm:text-4xl">
              Отбори на завършили
            </h1>
            {graduateTeams.length < 1 && (
              <h2 className="mt-8 self-center font-mono text-2xl font-semibold italic text-white sm:text-3xl">
                Все още няма потвърдени отбори.
              </h2>
            )}
            <div className="inline-grid w-full grid-cols-1 gap-5 py-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {graduateTeams.map((team) => (
                <>
                  <TeamCard team={team} />
                  <TeamCard team={team} />
                  <TeamCard team={team} />
                  <TeamCard team={team} />
                  <TeamCard team={team} />
                  <TeamCard team={team} />
                </>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
