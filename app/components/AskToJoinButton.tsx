"use client";

import { useState } from "react";

import { askToJoinTeam } from "../(full-layout)/teams/actions";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export default function AskToJoinButton({
  teamid,
  hasAskedToJoinState,
}: {
  teamid: string;
  hasAskedToJoinState: boolean;
}) {
  const [hasAsked, setHasAsked] = useState(hasAskedToJoinState);
  const { toast } = useToast();
  async function handleAskToJoin() {
    const res = await askToJoinTeam(teamid);
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
      {hasAsked === true ? (
        <Button disabled variant="secondary">
          <h1>Ask to join</h1>
        </Button>
      ) : (
        <Button variant="secondary" onClick={() => handleAskToJoin()}>
          <h1>Ask to join</h1>
        </Button>
      )}
    </div>
  );
}
