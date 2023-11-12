"use server";

import { zact } from "zact/server";
import { z } from "zod";

import { getServerSideGrowthBook } from "~/app/_integrations/growthbook";
import { getParticipantFromSession } from "~/app/participants/service";
import { createTeam } from "../service";

export const createTeamAction = zact(
  z.object({
    name: z.string(),
    description: z.string(),
  }),
)(async (input) => {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("create-team")) {
    return {
      success: false,
      error: "Създаването на отбори не е позволено по това време.",
    } as const;
  }

  const participant = await getParticipantFromSession();
  if (!participant) {
    // TODO: да извадим съобщенията в отделен файл
    return { success: false, error: "Not logged in as a participant" } as const;
  }

  let isAlumni = false;
  if (participant.grade && parseInt(participant.grade) > 12) {
    isAlumni = true;
  }

  if (participant.team.id !== null) {
    return { success: false, error: "Already in a team" } as const;
  }
  const team = await createTeam({
    name: input.name,
    description: input.description,
    captainId: participant.id,
    isAlumni: isAlumni,
  });
  return { success: true, team } as const;
});
