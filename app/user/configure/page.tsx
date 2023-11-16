import { getHTSession, signInRedirect } from "~/app/api/auth/session";
import MentorFrom from "~/app/components/Forms/mentorForm";
import { SignOutButton } from "~/app/components/buttons";
import Form from "../../components/Forms/Form";
import { isInMentorWhitelist } from "~/app/mentors/service";

export default async function Home() {
  const session = await getHTSession();
  if (!session) signInRedirect();

  if (session.user?.email && (await isInMentorWhitelist(session.user.email))) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="mb-4 w-full text-center">
          <h1 className="text-2xl font-semibold">
            Signed in as {session?.user?.email}.
          </h1>
          <SignOutButton className="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
            Sign out
          </SignOutButton>
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
          <SignOutButton className="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
            Sign out
          </SignOutButton>
        </div>
        <div className="w-full">
          <Form email={session?.user?.email} />
        </div>
      </div>
    );
  }
}
