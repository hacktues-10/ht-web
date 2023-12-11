import invariant from "tiny-invariant";

import { getHTSession, signInRedirect } from "~/app/api/auth/session";
import { Card, CardContent } from "~/app/components/ui/card";
import { isWhitelistedMentor } from "~/app/mentors/service";
import { MentorFrom } from "./_components/mentor-form";
import { ParticipantForm } from "./_components/participant-form";

export default async function ConfigFlowPage() {
  const session = await getHTSession();
  if (!session) signInRedirect();
  invariant(session.user?.email, "No email in session");

  const isMentor = isWhitelistedMentor(session);

  return isMentor ? (
    <MentorFrom email={session.user.email} />
  ) : (
    <ParticipantForm />
  );
}
