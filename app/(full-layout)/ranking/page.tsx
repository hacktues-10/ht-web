"use client";

import { useEffect } from "react";

import { InsertingSomeShit } from "../api/%5F%D0%B0%D0%B4%D0%BC%D0%B8%D0%BD/teams/service";

export default function Ranking() {
  useEffect(() => {
    const func = async () => await InsertingSomeShit();

    func();
  }, []);

  return (
    <div>
      <h1>Ranking</h1>
    </div>
  );
}
