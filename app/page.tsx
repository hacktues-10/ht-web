import { getHTSession } from "./api/auth/session";
import { SignInButton, SignOutButton } from "./components/buttons";
import { Hourglass, Test } from "./components/hourglass";

export default async function Home() {
  return <Test />;
  // return <Hourglass fillAmount={0.5} />;
  // const session = await getHTSession();
  // if (session) {
  //   return (
  //     <>
  //       Signed in as {session?.user?.email} <br />
  //       <SignOutButton>Sign out</SignOutButton>
  //     </>
  //   );
  // } else {
  //   return (
  //     <div>
  //       <SignInButton>Login</SignInButton>
  //     </div>
  //   );
  // }
}
