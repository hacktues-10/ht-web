"use client";

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
      </div>
    </div>
  );
}
