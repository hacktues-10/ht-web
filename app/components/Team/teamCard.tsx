"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { teams } from "~/app/db/schema";
import { getConfirmedTeams, getTeamById } from "~/app/teams/service";
import { getParticipant } from "~/app/user/configure/actions";

interface TeamCardProps {
  team: Exclude<Awaited<ReturnType<typeof getConfirmedTeams>>[number], null>;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const colors = [
    "bg-red-700",
    "bg-green-700",
    "bg-orange-700",
    "bg-yellow-700",
    "bg-emerald-700",
    "bg-cyan-700",
    "bg-sky-700",
    "bg-indigo-700",
    "bg-violet-700",
    "bg-purple-700",
  ];

  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`/teams/${team.id}`);
      }}
      key={team.id}
      className="z-10 h-max w-max rounded-md bg-gray-300 bg-opacity-20 bg-clip-padding p-5 shadow-[0_4px_12px_rgba(8,_112,_184,_0.7)] backdrop-blur-sm backdrop-filter hover:cursor-pointer"
    >
      <h2 className="w-max scroll-m-20 p-2 text-3xl font-semibold tracking-tight first:mt-0">
        {team.name}
      </h2>
      <p className="scroll-m-20 border-b border-gray-100/50 pl-2 leading-7 [&:not(:first-child)]:mt-2">
        {team.project?.name ?? "Все още няма проект"}
      </p>
      <div className="mt-2 inline-grid grid-cols-5 gap-5 border-b border-gray-100/50 p-2">
        {team.members.map((member) => (
          <div key={member.id}>
            {/* {member.isCaptain ? <div></div> : null} */}
            {/* HoverCard */}
            {/* <HoverCardTrigger> */}
            <div
              className={`z-20 flex h-10 w-10 items-center justify-center rounded-full ${
                colors[(member.firstName?.charCodeAt(0) ?? 0) % 10]
              } text-center`}
            >
              <h1 className="p-2">
                {member.firstName?.charAt(0).toUpperCase()}
              </h1>
            </div>
            {/* </HoverCardTrigger>  */}
            {/* <HoverCardContent>
                The React Framework – created and maintained by @vercel.
                </HoverCardContent> */}
            {/* HoverCard */}
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default TeamCard;
