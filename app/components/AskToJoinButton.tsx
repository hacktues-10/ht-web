"use client";

import { useState } from "react";

import { askToJoinTeam } from "../(full-layout)/teams/actions";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export default function AskToJoinButton({
  teamId,
  hasAskedToJoinState,
}: {
  teamId: string;
  hasAskedToJoinState: boolean;
}) {
  const [hasAsked, setHasAsked] = useState(hasAskedToJoinState);
  const { toast } = useToast();
  async function handleAskToJoin() {
    const res = await askToJoinTeam(teamId);
    if (res?.success) {
      toast({
        title: "Поздравления!",
        description: "Запитването бе изпратено успешно.",
      });
      setHasAsked(true);
    } else {
      toast({
        title: "Неуспешен опит",
        description: "Моля опитайте отново след мъничко.",
      });
    }
  }

  return (
    <div className="mt-8">
      <Button
        variant="secondary"
        disabled={hasAsked}
        onClick={() => handleAskToJoin()}
      >
        <h1>Заявка за влизане</h1>
      </Button>
    </div>
  );
}
