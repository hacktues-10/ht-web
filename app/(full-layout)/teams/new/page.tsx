import { notFound } from "next/navigation";

import { getServerSideGrowthBook } from "~/app/_integrations/growthbook";
import { getHTSession, signInRedirect } from "~/app/api/auth/session";
import { CreateTeamForm } from "./CreateTeamForm";

export default async function CreateTeamPage() {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("create-team")) {
    notFound();
  }

  const session = await getHTSession();
  if (!session) {
    signInRedirect();
  }

  return <CreateTeamForm />;
}
