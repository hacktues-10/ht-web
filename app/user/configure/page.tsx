import invariant from "tiny-invariant";
import { getHTSession, signInRedirect } from "~/app/api/auth/session";
import MentorFrom from "~/app/components/Forms/mentorForm";
import { SignOutButton } from "~/app/components/buttons";
import {
  getMentorFromSession,
  isWhitelistedMentor,
} from "~/app/mentors/service";
import { getParticipantFromSession } from "~/app/participants/service";
import Form from "../../components/Forms/Form";

export default async function Home() {
  const session = await getHTSession();
  if (!session) signInRedirect();
  invariant(session.user?.email, "No email in session");

  const isMentor = isWhitelistedMentor(session);

  return isMentor ? (
    <MentorFrom email={session.user.email} />
  ) : (
    <Form email={session.user.email} />
  );
}

async function SignedInChip() {
  const session = await getHTSession();

  return (
    <div className="mb-4 w-full text-center">
      <h1 className="text-2xl font-semibold">
        Signed in as {session?.user?.email}.
      </h1>
      <SignOutButton variant="destructive">Sign out</SignOutButton>
    </div>
  );
}
