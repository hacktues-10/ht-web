import { teams } from "../db/schema";

type TeamType = typeof teams.$inferSelect;

interface RankingProps {
  isSemifinal: boolean;
  teams: TeamType[];
}

export function Ranking({ teams, isSemifinal }: RankingProps) {
  console.log(teams);
  return (
    <div className="m-5 border-2 border-solid p-5">
      <h1 className="mb-2 text-center">
        {isSemifinal ? <>Полуфинал {teams[0].semiFinal}</> : <>Финал</>}
      </h1>
      {teams.map((team, index) => (
        <div className="columns-2" key={index}>
          <h1>{team.name}</h1>
          <h2 className="text-right	">
            {isSemifinal ? team.semiFinalResult : team.finalResult}
          </h2>
        </div>
      ))}
    </div>
  );
}

interface SemiFinalRankingProps {
  teams: TeamType[];
}

export function SemiFinalRanking(props: SemiFinalRankingProps) {
  return <Ranking teams={props.teams} isSemifinal={true} />;
}
