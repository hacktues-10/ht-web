import { getHTSession, signInRedirect } from "~/app/api/auth/session";
import { CreateTeamForm } from "./CreateTeamForm";

export default async function CreateTeamPage() {
  const session = await getHTSession();
  if (!session) {
    signInRedirect();
  }

  return <CreateTeamForm />;
}
