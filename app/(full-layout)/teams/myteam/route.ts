import {
    getParticipantFromSession,
    Participant
  } from "~/app/participants/service";

import TeamDetailPage from "../[id]/page"
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
 

export async function GET(req: NextRequest) {
    const participant = await getParticipantFromSession()

    if (!participant || !participant.team.id)
    {
        redirect("/teams/")
    }

    redirect(`/teams/${participant.team.id}`)
}