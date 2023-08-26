"use server";

import { zact } from "zact/server";
import { z } from "zod";

import { getParticipantFromSession } from "~/app/participants/service";
import { createTeam } from "../service";

export const createTeamAction = zact(
  z.object({
    name: z.string(),
    description: z.string(),
  }),
)(async (input) => {
  const participant = await getParticipantFromSession();
  console.log({ participant });
  if (!participant) {
    throw new Error("Not logged in as a participant");
  }
  if (participant.team) {
    throw new Error("Already in a team");
  }
  const team = await createTeam({
    name: input.name,
    description: input.description,
    captainId: participant.id,
  });
  return { team };
});
