import { getHTSession, signInRedirect } from "~/app/api/auth/session";
import MentorFrom from "~/app/components/Forms/mentorForm";
import { SignOutButton } from "~/app/components/buttons";
import { isWhitelistedMentor } from "~/app/mentors/service";
import Form from "../../components/Forms/Form";

export default async function Home() {
  const session = await getHTSession();
  if (!session) signInRedirect();

  if (isWhitelistedMentor(session)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="mb-4 w-full text-center">
          <h1 className="text-2xl font-semibold">
            Signed in as {session?.user?.email}.
          </h1>
          <SignOutButton variant="destructive">Sign out</SignOutButton>
        </div>
        <div className="w-full">
          <MentorFrom email={session?.user?.email} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="mb-4 w-full text-center">
          <h1 className="text-2xl font-semibold">
            Signed in as {session?.user?.email}.
          </h1>
          <SignOutButton variant="destructive">Sign out</SignOutButton>
        </div>
        <div className="w-full">
          <Form email={session?.user?.email} />
        </div>
      </div>
    );
  }
}
