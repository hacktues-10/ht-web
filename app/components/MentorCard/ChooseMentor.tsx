"use client";

import { chooseTeamMentor } from "~/app/(full-layout)/mentors/actions";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

export default function ChooseMentor({
  mentorId,
  teamId,
}: {
  mentorId: number;
  teamId: string;
}) {
  const { toast } = useToast();

  const handleMentorChoose = async () => {
    // console.log(mentorId, teamId);
    const res = await chooseTeamMentor(mentorId, teamId);
    if (!res.success) {
      toast({ title: "Този ментор вече е зает от друг отбор" });
      window.location.reload();
    }
  };

  return (
    <Button onClick={() => handleMentorChoose()} className="w-full text-black">
      Избери ментор
    </Button>
  );
}
