import Link from "next/link";
import invariant from "tiny-invariant";

import { Button } from "~/app/components/ui/button";
import { getParticipantFromSession } from "~/app/participants/service";
import CreateProjectFrom from "./CreateProjectForm";

export default async function newProject() {
  const participant = await getParticipantFromSession();

  if (!participant || !participant.team.id || !participant.team.isCaptain) {
    invariant(
      false,
      "Невалидна сесия, ако мислите че има грешка е свържете с администратор.",
    );
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="w-min self-center pb-4">
        <Button asChild variant="default" className="mt-8 ">
          <Link href="/teams">
            {"<- "}
            Назад
          </Link>
        </Button>
      </div>
      <CreateProjectFrom teamId={participant.team.id} />
    </div>
  );
}
