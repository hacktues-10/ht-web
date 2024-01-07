import { Metadata } from "next";

import { SemiFinalRanking } from "./components";
import { getTeamsBySemiFinal } from "./service";

export const metadata: Metadata = {
  title: "Класация",
  description:
    "Как се класираха отборите в полуфиналите и финалите на Hack TUES X",
};

export default async function RankingsPage() {
  const teams = await getTeamsBySemiFinal();
  return (
    <div>
      {teams.map((selectedTeams, index) => (
        <SemiFinalRanking teams={selectedTeams} key={index} />
      ))}
    </div>
  );
}
