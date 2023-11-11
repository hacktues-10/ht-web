import Link from "next/link";

import { getHTSession } from "../api/auth/session";
import { getParticipantFromSession } from "../participants/service";
import { getConfirmedTeams } from "./service";

export default async function TeamList() {
  const teams = await getConfirmedTeams();
  const participant = await getParticipantFromSession();
  if (!teams.length) {
    return (
      <div>
        Все още няма потвърдени отбори.{" "}
        {participant && participant.team.id == null && (
          <Link href="/teams/new" className="text-pink-700 underline">
            Създай отбор
          </Link>
        )}
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-mono italic text-slate-800 underline">
        Всички отбори
      </h1>
      {participant && participant.team.id == null && (
        <div className="border-[5px] border-green-950 bg-yellow-500">
          <Link
            href="/teams/new"
            className="bg-gradient-to-r from-pink-500 via-green-500 to-orange-900 bg-clip-text font-serif text-6xl font-extrabold italic text-transparent underline"
          >
            Създай отбор
          </Link>
        </div>
      )}
      <ul className="flex flex-wrap gap-2 py-2">
        {teams.map((team) => (
          <li
            key={team.id}
            className="rounded border border-gray-800 bg-gray-100 p-2"
          >
            <Link href={`/teams/${team.id}`}>{team.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
