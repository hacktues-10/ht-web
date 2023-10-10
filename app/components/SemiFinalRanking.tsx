import { teams } from "../db/schema";

const teamType = teams.$inferSelect;

interface SemiFinalRankingProps {
  teams: (typeof teamType)[];
}

export default function SemiFinalRanking(props: SemiFinalRankingProps) {
  const { teams } = props;
  console.log(teams);
  return (
    <div className="m-5 border-2 border-solid p-5">
      <h1 className="mb-2 text-center">SemiFinal {teams[0].semiFinal}</h1>
      {teams.map((team, index) => (
        <div className="columns-2" key={index}>
          <h1>{team.name}</h1>
          <h2 className="text-right	">{team.semiFinalResult}</h2>
        </div>
      ))}
    </div>
  );
}
