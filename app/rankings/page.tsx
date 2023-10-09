//represent the information as an array of arrays of teams, the [0] means its the first semi-final
import { getTeams } from "./actions";

export default async function RankingsPage() {
  const teams = await getTeams();
  console.log(teams);
  return <div></div>;
}
