import Link from "next/link";
import { notFound } from "next/navigation";

import { getServerSideGrowthBook } from "~/app/_integrations/growthbook";
import { getHTSession, signInRedirect } from "~/app/api/auth/session";
import { Button } from "~/app/components/ui/button";
import { CreateTeamForm } from "./CreateTeamForm";

export const dynamic = "force-dynamic";

export default async function CreateTeamPage() {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("create-team")) {
    notFound();
  }

  const session = await getHTSession();
  if (!session) {
    signInRedirect();
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="w-min self-center pb-4">
        <Button asChild variant="secondary" className="mt-8 ">
          <Link href="/teams">
            {"<- "}
            Назад
          </Link>
        </Button>
      </div>
      <CreateTeamForm />
    </div>
  );
}
