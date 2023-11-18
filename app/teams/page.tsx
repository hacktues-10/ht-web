import { useState } from "react";
import Link from "next/link";

import { IfHTFeatureOn } from "../_integrations/components";
import { getHTSession } from "../api/auth/session";
import TeamCard from "../components/Team/teamCard";
import TeamMember from "../components/TeamMember";
import { getParticipantFromSession } from "../participants/service";
import { getConfirmedTeams, getTeamById } from "./service";

export default async function TeamList() {
  const teams = await getConfirmedTeams();
  if (!teams.length) {
    return (
      <div>
        Все още няма потвърдени отбори.
        <Link href="/teams/new" className="text-pink-700 underline">
          Създай отбор
        </Link>
      </div>
    );
  }

  let studentTeams = [];
  let graduateTeams = [];
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
        {participant && (
          <div className="m-2 w-max rounded-lg bg-rose-400 hover:bg-orange-300">
            <Link
              href="/teams/new"
              className="p-5 font-serif text-3xl font-semibold italic tracking-tight sm:text-4xl "
            >
              Създай отбор
            </Link>
          </div>
        )}
      </IfHTFeatureOn>
      {studentTeams.length > 0 && (
        <>
          <h1 className="mt-8 self-center font-mono text-3xl font-semibold italic text-white sm:text-4xl">
            Отбори на ученици
          </h1>
          <div className="inline-grid w-max grid-cols-1 gap-5 py-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {teams.map((team) => (
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
          <div className="inline-grid w-max grid-cols-1 gap-5 py-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {teams.map((team) => (
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
