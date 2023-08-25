"use server";

import { zact } from "zact/server";
import { z } from "zod";

import { createTeam } from "../service";

export const createTeamAction = zact(
  z.object({
    name: z.string(),
    description: z.string(),
  }),
)(async (input) => {
  const team = await createTeam(input);
  if (!team) {
    throw new Error("Failed to create team, it's null for some reason");
  }
  return {
    team,
  };
});
