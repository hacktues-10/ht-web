//represent the information as an array of arrays of teams, the [0] means its the first semi-final
import SemiFinalRanking from "../components/SemiFinalRanking";
import { getTeamsBySemiFinal } from "./actions";

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
