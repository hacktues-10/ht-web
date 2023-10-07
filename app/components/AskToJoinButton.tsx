"use client";

import { useState } from "react";

import { askToJoinTeam } from "../teams/actions";

export default function AskToJoinButton({
  teamid,
  hasAskedToJoinState,
}: {
  teamid: string;
  hasAskedToJoinState: boolean;
}) {
  const [hasAsked, setHasAsked] = useState(hasAskedToJoinState);

  async function handleAskToJoin() {
    const res = await askToJoinTeam(teamid);
    if (res?.success) {
      console.log("Request to join team sent successfully :)");
      setHasAsked(true);
    }
  }

  return (
    <div>
      {hasAsked === true ? (
        <button className="btn btn-danger">
          <h1>Already requested to join</h1>
        </button>
      ) : (
        <button className="btn btn-danger" onClick={() => handleAskToJoin()}>
          <h1>Ask to Join</h1>
        </button>
      )}
    </div>
  );
}
