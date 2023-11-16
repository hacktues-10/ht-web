"use client";

import { useRouter } from "next/navigation";

import { teams } from "~/app/db/schema";
import { getConfirmedTeams, getTeamById } from "~/app/teams/service";

interface TeamCardProps {
  team: Exclude<Awaited<ReturnType<typeof getConfirmedTeams>>[number], null>;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const colors = ["red", "green", "orange", "yellow"];

  console.log(team);
  const router = useRouter();
  console.log();
  return (
    <div
      onClick={() => {
        router.push(`/teams/${team.id}`);
      }}
      key={team.id}
      className="z-10 h-max w-max rounded-md bg-gray-300 bg-opacity-20 bg-clip-padding p-5 backdrop-blur-sm backdrop-filter hover:cursor-pointer"
    >
      <h1 className="w-max  p-2 text-xl">{team.name}</h1>
      <h3 className="border-b-2 border-gray-100 pl-2 text-xs">
        {team.project?.name ?? "Все още няма проект"}
      </h3>
      <div className="inline-grid grid-cols-5 gap-5 p-2">
        {team.members.map((member) => (
          <div
            //${colors[(team?.members?.firstName?.charCodeAt(0) ?? 0) % 4]}
            className={`z-20 h-10 w-10 place-content-center items-center justify-center rounded-full bg-${
              colors[(member.firstName?.charCodeAt(0) ?? 0) % 4]
            }-700 text-center`}
          >
            <h1 className="p-2">{member.firstName?.at(0)?.toUpperCase()}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamCard;
