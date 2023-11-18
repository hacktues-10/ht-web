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
      <div className="flex flex-wrap gap-2 py-2">
        {teams.map((team) => (
          <>
            <TeamCard key={team.id} team={team} />
            <TeamCard key={team.id} team={team} />
            <TeamCard key={team.id} team={team} />
            <TeamCard key={team.id} team={team} />
          </>
        ))}
      </div>
    </div>
  );
}
