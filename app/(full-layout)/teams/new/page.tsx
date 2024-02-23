import { getHTSession, signInRedirect } from "~/app/api/auth/session";
import { BackToTeamsButton } from "../_components/back-to-teams-button";
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
