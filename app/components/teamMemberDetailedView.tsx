"use client";

import { getParticipantFromSession } from "../participants/service";
import { getTeamMembers } from "../teams/actions";
import { getTeamById } from "../teams/service";
import Crown from "./Crown";
import MakeCaptainComponent from "./makeCaptainComponent";
import RemoveMemberComponent from "./RemoveMemberComponent";

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
    <div className="mx-3 flex flex-col items-center justify-center align-middle sm:mx-8">
      {member.isCaptain && (
        <div className="h-4 w-8 sm:h-10 sm:w-20">
          <Crown />
        </div>
      )}
      <div
        className={`z-32 ml-auto mr-auto flex h-14 w-14 items-center justify-center rounded-full sm:h-32 sm:w-32 ${
          colors[(member.firstName?.charCodeAt(0) ?? 0) % 10]
        } text-center`}
      >
        <h1 className="p-2 text-3xl sm:text-6xl">
          {member.firstName?.charAt(0).toUpperCase()}
        </h1>
      </div>
      <div className="mt-2 flex h-auto space-x-4">
        {participant?.team.isCaptain &&
          participant.team.id === team.id &&
          participant.id !== member.id && (
            <>
              <RemoveMemberComponent memberToRemove={member} remove={true} />
              <MakeCaptainComponent participant={participant} member={member} />
            </>
          )}

        {participant?.id == member.id && !participant.team.isCaptain && (
          <RemoveMemberComponent memberToRemove={member} remove={false} />
        )}
      </div>
    </div>
  );
}
