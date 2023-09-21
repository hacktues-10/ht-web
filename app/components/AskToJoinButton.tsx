"use client";

import { askToJoinHandler } from "../teams/actions";

export default function AskToJoinButton({ teamid }: { teamid: string }) {
  console.log(teamid);

  async function handleAskToJoin() {
    const res = await askToJoinHandler(teamid);
    console.log(res);
    if (res?.success) {
      console.log("Request to join team sent successfully :)");
    }
  }
  return (
    <button className="btn btn-danger" onClick={() => handleAskToJoin()}>
      <h1>Ask to Join</h1>
    </button>
  );
}
