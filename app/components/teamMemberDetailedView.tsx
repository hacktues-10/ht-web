"use client";

import { getParticipantFromSession } from "../participants/service";
import { getTeamMembers } from "../teams/actions";
import { getTeamById } from "../teams/service";
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
      <div className="mt-2 flex h-10 space-x-4 sm:h-auto">
        {participant?.team.isCaptain &&
          participant.team.id === team.id &&
          participant.id !== member.id && (
            <>
              <RemoveMemberComponent
                memberToRemove={member}
                title={
                  "Сигурни ли сте, че искате да премахнете този участник от отбора?"
                }
              />
              <MakeCaptainComponent participant={participant} member={member} />
            </>
          )}
        {participant?.id == member.id && (
          <RemoveMemberComponent
            memberToRemove={member}
            title={"Сигурни ли сте, че искате да напуснете този отбор?"}
          />
        )}
      </div>
    </div>
  );
}
