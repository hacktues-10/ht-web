"use client";

import { useEffect, useState } from "react";

import { checkStateJoinRequests } from "~/app/teams/actions";
import { askToJoinHandler } from "../teams/actions";

export default function AskToJoinButton({ teamid }: { teamid: string }) {
  const [state, setState] = useState(false);

  useEffect(() => {
    const func = async () => {
      const res = await checkStateJoinRequests(teamid);
      setState(res);
    };
    func();
  }, []);

  async function handleAskToJoin() {
    const res = await askToJoinHandler(teamid);
    console.log(res);
    if (res?.success) {
      console.log("Request to join team sent successfully :)");
      setState(true);
    }
  }

  return (
    <div>
      {state === true ? (
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
