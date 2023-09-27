"use client";

import { ChoseTeamMentor } from "~/app/mentors/actions";

export default function ChoseMentor({
  mentorId,
  teamId,
}: {
  mentorId: number;
  teamId: string;
}) {
  const handleMentorChose = async () => {
    const res = await ChoseTeamMentor(mentorId, teamId);
    if (res.success) {
      window.location.reload();
    }
  };

  return (
    <button onClick={() => handleMentorChose()} className="m-5 text-black">
      Избери ментор
    </button>
  );
}
