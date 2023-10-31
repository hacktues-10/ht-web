import Link from "next/link";

import { IfHTFeatureOn } from "../_integrations/components";
import { getHTSession } from "../api/auth/session";
import { getConfirmedTeams } from "./service";

export default async function TeamList() {
  const teams = await getConfirmedTeams();

  if (!teams.length) {
    return (
      <div>
        Все още няма потвърдени отбори.{" "}
        {/* TODO: да показваме ли това когато не сме логнати? */}
        <Link href="/teams/new" className="text-pink-700 underline">
          Създай отбор
        </Link>
      </div>
    );
  }

  //   TODO: move elsewhere
  const session = await getHTSession();

  return (
    <div>
      <h1 className="font-mono italic text-slate-800 underline">
        Всички отбори
      </h1>
      <IfHTFeatureOn feature="create-team">
        {session && (
          <div className="border-[5px] border-green-950 bg-yellow-500">
            <Link
              href="/teams/new"
              className="bg-gradient-to-r from-pink-500 via-green-500 to-orange-900 bg-clip-text font-serif text-6xl font-extrabold italic text-transparent underline"
            >
              Създай отбор
            </Link>
          </div>
        )}
      </IfHTFeatureOn>
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
