import Link from "next/link";
import { GiPodiumSecond, GiPodiumThird, GiPodiumWinner } from "react-icons/gi";

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
            "m-1 my-2 w-full rounded-xl p-2 text-xl  font-medium hover:bg-slate-600 sm:m-2 md:m-4",
            team.isFinalist && isSemifinal && "bg-green-200 text-black",
            index == 0 && !isSemifinal && "bg-yellow-200 text-black",
            index == 1 && !isSemifinal && "bg-gray-200 text-black",
            index == 2 && !isSemifinal && "bg-orange-800",
            index > 2 && !isSemifinal && "border border-white",
            !team.isFinalist && isSemifinal && "border border-white",
          )}
          key={index}
        >
          <Link
            href={`/teams/${team.id}`}
            className="flex w-full justify-between "
          >
            <div className="mx-2 flex w-full gap-5 ">
              <h2 className={!isSemifinal && index < 3 ? "hidden" : "block"}>
                {index + 1}
              </h2>
              {index == 0 && !isSemifinal && (
                <GiPodiumWinner className="text-3xl" />
              )}
              {index == 1 && !isSemifinal && (
                <GiPodiumSecond className="text-3xl" />
              )}
              {index == 2 && !isSemifinal && (
                <GiPodiumThird className="text-3xl" />
              )}
              <h1
                className={cn(
                  "text-lg sm:text-xl",
                  index < 3 && "font-semibold",
                )}
              >
                {team.name.length > 12 && !team.name.includes(" ")
                  ? team.name.slice(0, 12) + " " + team.name.slice(12)
                  : team.name}
              </h1>
            </div>
            <h2 className="w-min text-end">
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
