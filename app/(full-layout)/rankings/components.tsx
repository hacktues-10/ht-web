import Link from "next/link";

import { Card } from "~/app/components/ui/card";
import { teams } from "~/app/db/schema";
import { cn } from "~/app/utils";

type TeamType = typeof teams.$inferSelect;

interface RankingProps {
  isSemifinal: boolean;
  teams: TeamType[];
}

export function Ranking({ teams, isSemifinal }: RankingProps) {
  return (
    <Card className="m-5 p-5">
      <h1 className="mb-2 text-center font-lazydog text-3xl">
        {isSemifinal ? (
          <>Полуфинал {teams[0].semiFinal}</>
        ) : teams[0].isAlumni ? (
          <>Финал - завършили</>
        ) : (
          <>Финал - ученици</>
        )}
      </h1>
      {teams.map((team, index) => (
        <div
          className={cn(
            "m-4 columns-2 rounded-xl p-2 text-xl hover:bg-slate-600",
            team.isFinalist && isSemifinal && "bg-green-200 text-black",
            index == 0 && !isSemifinal && "bg-yellow-200 text-black",
            index == 1 && !isSemifinal && "bg-gray-200 text-black",
            index == 2 && !isSemifinal && "bg-orange-800",
          )}
          key={index}
        >
          <Link href={`/teams/${team.id}`}>
            <h1>{team.name}</h1>
            <h2 className="text-right	">
              {isSemifinal ? team.semiFinalResult : team.finalResult}
            </h2>
          </Link>
        </div>
      ))}
    </Card>
  );
}

interface SemiFinalRankingProps {
  teams: TeamType[];
}

export function SemiFinalRanking(props: SemiFinalRankingProps) {
  return <Ranking teams={props.teams} isSemifinal={true} />;
}

export function FinalRanking(props: SemiFinalRankingProps) {
  return <Ranking teams={props.teams} isSemifinal={false} />;
}
