"use client";

import { AiTwotoneCrown } from "react-icons/ai";

import { getParticipantFromSession } from "../participants/service";
import { getTeamMembers, removeTeamMember } from "../teams/actions";
import { getTeamById } from "../teams/service";
import MakeCaptainComponent from "./makeCaptainComponent";

export default function TeamMemberDetailedView({
  member,
  participant,
  team,
}: {
  member: Exclude<Awaited<ReturnType<typeof getTeamMembers>>[number], null>;
  participant: Awaited<ReturnType<typeof getParticipantFromSession>>;
  team: Exclude<Awaited<ReturnType<typeof getTeamById>>, null>;
}) {
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

  return (
    <div className="flex flex-col items-center justify-center align-middle">
      <div
        className={`z-32 ml-auto mr-auto flex h-14 w-14 items-center justify-center rounded-full sm:h-32 sm:w-32 ${
          colors[(member.firstName?.charCodeAt(0) ?? 0) % 10]
        } text-center`}
      >
        <h1 className="p-2 text-3xl sm:text-6xl">
          {member.firstName?.charAt(0).toUpperCase()}
        </h1>
      </div>
      <div className="mt-2 flex space-x-4">
        {participant?.team.isCaptain &&
          participant.team.id === team.id &&
          participant.id !== member.id && (
            <div
              className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 opacity-70"
              onClick={() => {
                removeTeamMember(member.id);
              }}
            >
              <h1 className="p-2 text-lg sm:text-xl">X</h1>
            </div>
          )}
        {participant?.team.isCaptain &&
          participant.team.id === team.id &&
          participant.id !== member.id && (
            <MakeCaptainComponent participant={participant} member={member} />
          )}
      </div>
    </div>
  );
}
