import { getHTSession } from "./api/auth/session";
import { SignInButton, SignOutButton } from "./components/buttons";

export default async function Home() {
  const session = await getHTSession();
  console.log(session);
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <SignOutButton>Sign out</SignOutButton>
      </>
    );
  } else {
    return (
      <div>
        <SignInButton>Login</SignInButton>
      </div>
    );
  }
}
