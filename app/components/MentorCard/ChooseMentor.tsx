"use client";

import { ChooseTeamMentor } from "~/app/mentors/actions";

export default function ChooseMentor({
  mentorId,
  teamId,
}: {
  mentorId: number;
  teamId: string;
}) {
  const handleMentorChoose = async () => {
    const res = await ChooseTeamMentor(mentorId, teamId);
    if (res.success) {
      window.location.reload();
    }
  };

  return (
    <button onClick={() => handleMentorChoose()} className="m-5 text-black">
      Избери ментор
    </button>
  );
}
