import { Metadata } from "next";

import { FinalRanking, SemiFinalRanking } from "./components";
import { getAlumniTeams, getTeamsBySemiFinal } from "./service";

export const metadata: Metadata = {
  title: "Класация",
  description:
    "Как се класираха отборите в полуфиналите и финалите на Hack TUES X",
};

export default async function RankingsPage() {
  const teams = await getTeamsBySemiFinal();
  const alumniTeams = await getAlumniTeams();

  const finalists = teams
    .map((selectedTeams) =>
      selectedTeams.filter((team) => team.isFinalist == true),
    )
    .flat();
  return (
    <div>
      <h1 className="mt-5 text-center font-lazydog text-6xl">Класация</h1>
      <div className="m-10">
        <h1 className="mt-5 text-center font-lazydog text-5xl">Финали</h1>
        {finalists.length > 0 && <FinalRanking teams={finalists} />}
        {alumniTeams.length > 0 && <FinalRanking teams={alumniTeams} />}
      </div>
      <div className="m-10">
        <h1 className="mt-5 text-center font-lazydog text-5xl">Полуфинали</h1>
        <div className="grid grid-cols-1 justify-center align-middle md:grid-cols-2 lg:grid-cols-3">
          {teams.map((selectedTeams, index) => (
            <div
              className={`${
                index === teams.length - 1 ? "col-start-1 lg:col-start-2" : ""
              }`}
              key={index}
            >
              <SemiFinalRanking teams={selectedTeams} key={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
