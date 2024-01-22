import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

import { getParticipantFromSession } from "~/app/participants/service";

export async function GET(req: NextRequest) {
  const participant = await getParticipantFromSession();

  if (!participant || !participant.team.id) {
    redirect("/teams/");
  }

  redirect(`/teams/${participant.team.id}`);
}
