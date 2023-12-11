"use client";

import { chooseTeamMentor } from "~/app/(full-layout)/mentors/actions";

export default function ChooseMentor({
  mentorId,
  teamId,
}: {
  mentorId: number;
  teamId: string;
}) {
  const handleMentorChoose = async () => {
    const res = await chooseTeamMentor(mentorId, teamId);
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
