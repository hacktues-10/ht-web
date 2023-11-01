import { SemiFinalRanking } from "./components";
import { getTeamsBySemiFinal } from "./service";

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
