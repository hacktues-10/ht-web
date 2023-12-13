"use client";

import { removeTeamMember } from "~/app/(full-layout)/teams/actions";
import { particpants } from "../db/schema";

type memberType = typeof particpants.$inferSelect;

export default function TeamMember({
  member,
  isCaptain,
  participantId,
}: {
  member: memberType;
  isCaptain: boolean | undefined;
  participantId: number | undefined;
}) {
  const handleRemoveFromTeam = async () => {
    const res = await removeTeamMember(member.id);
    if (res.success) {
      window.location.reload();
    }
  };

  return (
    <div className="mx-2 my-4 rounded-lg bg-white p-4 shadow-md">
      <div className="team-member__info">
        <h3 className="text-lg font-semibold text-gray-800">
          {member.firstName} {member.lastName}
        </h3>
        {member.parallel ? (
          <p className="mt-2 text-gray-600">
            {member.grade}
            {member.parallel}
          </p>
        ) : (
          <p className="mt-2 text-gray-600">Випуск: {member.grade}</p>
        )}

        {isCaptain && participantId != member.id ? (
          <button
            className="mt-4 rounded-full bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
            onClick={() => handleRemoveFromTeam()}
          >
            Delete
          </button>
        ) : null}
      </div>
    </div>
  );
}
