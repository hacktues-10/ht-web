import { getHTSession } from "~/app/api/auth/session";
import { SignInButton, SignOutButton } from "~/app/components/buttons";
import MentorFrom from "~/app/components/mentorForm";
import Form from "../../components/Form";
import { mentorWhitelist } from "./actions";

export default async function Home() {
  const session = await getHTSession();

  if ((await mentorWhitelist(session?.user?.email)) && session) {
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
  } else if (session) {
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
          <Form />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p className="mb-4 text-lg font-semibold">Please sign in</p>
        <SignInButton className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Login
        </SignInButton>
      </div>
    );
  }
}
