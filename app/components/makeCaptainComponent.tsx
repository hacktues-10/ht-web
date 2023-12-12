"use client";

import { useState } from "react";
import { AiTwotoneCrown } from "react-icons/ai";

import { getParticipantFromSession } from "../participants/service";
import { getTeamMembers, makeCaptain } from "../teams/actions";
import { useToast } from "./ui/use-toast";

export default function MakeCaptainComponent({
  participant,
  member,
}: {
  member: Exclude<Awaited<ReturnType<typeof getTeamMembers>>[number], null>;
  participant: Awaited<ReturnType<typeof getParticipantFromSession>>;
}) {
  const { toast } = useToast();
  const handleClick = async () => {
    const { success } = await makeCaptain(participant?.id, member.id);
    if (success) {
      window.location.reload();
    } else {
      toast({
        title: "Неуспешен опит",
        description: "Моля опитайте отново след мъничко.",
      });
    }
  };

  return (
    <>
      <div
        className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 opacity-70 hover:cursor-pointer hover:bg-teal-500"
        onClick={handleClick}
      >
        <AiTwotoneCrown />
      </div>
    </>
  );
}
