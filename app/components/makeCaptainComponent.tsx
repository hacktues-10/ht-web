"use client";

import { useState } from "react";
import { AiTwotoneCrown } from "react-icons/ai";

import { getParticipantFromSession } from "../participants/service";
import { getTeamMembers, makeCaptain } from "../teams/actions";
import InformationDialog from "./dialog";

export default function MakeCaptainComponent({
  participant,
  member,
}: {
  member: Exclude<Awaited<ReturnType<typeof getTeamMembers>>[number], null>;
  participant: Awaited<ReturnType<typeof getParticipantFromSession>>;
}) {
  const [showDialog, setShowDialog] = useState(false);

  const handleClick = async () => {
    const { success } = await makeCaptain(participant?.id, member.id);
    if (success) {
      window.location.reload();
    } else {
      setShowDialog(true);
    }
  };

  return (
    <>
      <div
        className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 opacity-70 hover:cursor-pointer"
        onClick={handleClick}
      >
        <AiTwotoneCrown />
      </div>

      {showDialog && (
        <InformationDialog
          title="Опа, стана проблем :("
          description="Моля опитайте отново след малко, ако отново се счупи, свърпете се с някой админ :D"
          open={true}
        />
      )}
    </>
  );
}
