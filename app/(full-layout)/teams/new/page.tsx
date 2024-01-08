import Link from "next/link";

import { getHTSession, signInRedirect } from "~/app/api/auth/session";
import { Button } from "~/app/components/ui/button";
import { CreateTeamForm } from "./CreateTeamForm";

export default async function CreateTeamPage() {
  const session = await getHTSession();
  if (!session) {
    signInRedirect();
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="w-min self-center pb-4">
        <BackToTeamsButton />
      </div>
      <CreateTeamForm />
    </div>
  );
}

export function BackToTeamsButton() {
  return (
    <Button asChild variant="secondary" className="mt-8 backdrop-blur-md">
      <Link href="/teams">
        {"<- "}
        Назад
      </Link>
    </Button>
  );
}
