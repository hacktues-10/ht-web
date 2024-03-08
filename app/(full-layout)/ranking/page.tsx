import { Card } from "~/app/components/ui/card";
import { cn } from "~/app/utils";
import { getAllTeams } from "../teams/service";

export default async function Ranking() {
  const teams = await getAllTeams();
  const semiFinals = [1, 2, 3, 4, 5, 6, 7];
  console.log(teams.slice(0, 10));
  return (
    <div>
      <h1>Ranking</h1>
      {semiFinals.map((semiFinal) => {
        return (
          <div key={semiFinal} className="w-full justify-center text-center">
            <h1 className="text-center font-lazydog text-3xl">
              Semi Final {semiFinal}
            </h1>
            <Card className="m-5 w-full text-center">
              {teams
                .filter((team) => team.semiFinal === semiFinal)
                .sort((a, b) => {
                  return Number(b.semiFinalResult) - Number(a.semiFinalResult);
                })
                .map((team) => {
                  return (
                    <div
                      key={team.id}
                      className={cn(
                        "flex justify-between p-5",
                        team.isFinalist && "bg-white text-black",
                      )}
                    >
                      <div className="rounded-xl border-2  border-gray-500 p-2">
                        <h2>{team.name}</h2>
                      </div>
                      <div className="rounded-xl border-2  border-gray-500 p-2">
                        <p>{team.semiFinalResult}</p>
                      </div>
                    </div>
                  );
                })}
            </Card>
          </div>
        );
      })}
    </div>
  );
}
