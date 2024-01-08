import { Metadata } from "next";
import Link from "next/link";
import invariant from "tiny-invariant";

import { IfHTFeatureOn } from "~/app/_integrations/components";
import { Button } from "~/app/components/ui/button";
import { getParticipantFromSession } from "~/app/participants/service";
import { BackToTeamsButton } from "../../../new/page";
import CreateProjectFrom from "./CreateProjectForm";

export const metadata: Metadata = {
  title: "Създай проект",
  description: "Създай проект към твоя отбор за Hack TUES X",
};

export default async function NewProjectPage() {
  const participant = await getParticipantFromSession();

  if (!participant || !participant.team.id || !participant.team.isCaptain) {
    invariant(
      false,
      "Невалидна сесия, ако мислите че има грешка е свържете с администратор.",
    );
  }

  return (
    <div className="flex flex-col justify-center">
      <IfHTFeatureOn feature="create-project">
        <div className="w-min self-center pb-4">
          <BackToTeamsButton />
        </div>
        <CreateProjectFrom teamId={participant.team.id} />
      </IfHTFeatureOn>
    </div>
  );
}
