import Link from "next/link";

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

  return (
    <div>
      <h1>Всички отбори</h1>
      <ul className="flex flex-wrap gap-2">
        {teams.map((team) => (
          <li key={team.id}>
            <Link href={`/teams/${team.id}`}>
              <a>{team.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
