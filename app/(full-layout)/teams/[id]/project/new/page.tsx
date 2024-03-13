import { Metadata } from "next";
import { redirect } from "next/navigation";

import { IfHTFeatureOn } from "~/app/_integrations/components";
import { signInRedirect } from "~/app/api/auth/session";
import { getParticipantFromSession } from "~/app/participants/service";
import {
  BackToMyTeamButton,
  BackToTeamsButton,
} from "../../../_components/back-to-teams-button";
import CreateProjectFrom from "./CreateProjectForm";

export const metadata: Metadata = {
  title: "Създай проект",
  description: "Създай проект към твоя отбор за Hack TUES X",
  openGraph: {
    title: "Създай проект",
    description: "Създай проект към твоя отбор за Hack TUES X",
    type: "website",
  },
};

export default async function NewProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const participant = await getParticipantFromSession();

  if (!participant || !participant.team.id) {
    signInRedirect();
  }

  if (participant.team.id !== params.id || !participant.team.isCaptain) {
    redirect("/teams/myteam");
  }

  return (
    <div className="flex flex-col justify-center">
      <IfHTFeatureOn feature="create-project">
        <div className="w-min self-center pb-4">
          <BackToMyTeamButton />
        </div>
        <CreateProjectFrom teamId={participant.team.id} />
      </IfHTFeatureOn>
    </div>
  );
}
