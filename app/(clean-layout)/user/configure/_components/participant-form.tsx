import invariant from "tiny-invariant";

import { getHTSession } from "~/app/api/auth/session";
import { StudentForm } from "./student-form";

export const ParticipantForm = async () => {
  const session = await getHTSession();
  invariant(
    session?.user?.email,
    "No email in session or no session at all even :(",
  );
  return (
    <StudentForm email={session.user.email} />
  );
};
