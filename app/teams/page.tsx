import { useState } from "react";
import Link from "next/link";

import { IfHTFeatureOn } from "../_integrations/components";
import TeamCard from "../components/Team/teamCard";
import { getParticipantFromSession } from "../participants/service";
import { getConfirmedTeams } from "./service";
import { Button } from "../components/ui/button";

export default async function TeamList() {
  const teams = await getConfirmedTeams();
  if (!teams.length) {
    return (
      <div>
        Все още няма потвърдени отбори.
       {participant && !participant.team.id && (
          <Button asChild variant="destructive" className="mt-4">
            <Link href="/teams/new">Създай отбор</Link>
          </Button>
        )}
      </div>
    );
  }


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
  const participant = await getParticipantFromSession();
  return (
    //bg-[url('./assets/background.png')]
    <div className="flex h-full w-full flex-col items-center justify-center bg-slate-900">
      <h1 className="self-center font-mono text-4xl font-semibold italic text-white sm:text-5xl">
        Всички отбори
      </h1>
      <IfHTFeatureOn feature="create-team">
        {participant && !participant.team.id && (
          <Button asChild variant="destructive" className="mt-4">
            <Link href="/teams/new">Създай отбор</Link>
          </Button>
        )}
      </IfHTFeatureOn>
      {studentTeams.length > 0 && (
        <>
          <h1 className="mt-8 self-center font-mono text-3xl font-semibold italic text-white sm:text-4xl">
            Отбори на ученици
          </h1>
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
        </>
      )}
      {graduateTeams.length > 0 && (
        <>
          <h1 className="mt-8 self-center font-mono text-3xl font-semibold italic text-white sm:text-4xl">
            Отбори на завършили
          </h1>
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
        </>
      )}
    </div>
  );
}
