import invariant from "tiny-invariant";

import { parseElsysEmail } from "~/app/_elsys/service";
import { getHTSession } from "~/app/api/auth/session";
import { AlumniForm } from "./alumni-form";
import { StudentForm } from "./student-form";

export const ParticipantForm = async () => {
  const session = await getHTSession();
  invariant(
    session?.user?.email,
    "No email in session or no session at all even :(",
  );
  const isAlumni = parseElsysEmail(session.user.email)?.isAlumni ?? true;

  return isAlumni ? (
    <AlumniForm email={session.user.email} />
  ) : (
    <StudentForm email={session.user.email} />
  );
};
