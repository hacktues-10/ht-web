import Link from "next/link";

import { getHTSession } from "~/app/api/auth/session";
import { SignOutButton } from "~/app/components/buttons";
import { Button } from "~/app/components/ui/button";
import { getParticipantFromSession } from "~/app/participants/service";

export default async function SignOut() {
  const participant = await getParticipantFromSession();
  const session = await getHTSession();
  return (
    <section className="mt-32 flex w-full max-w-sm flex-col gap-5">
      {participant ? (
        <>
          <h1 className="text-center text-3xl font-semibold">
            Излез от своя акаунт
          </h1>
          <h2 className="text-center text-xl font-semibold">
            Влезли сте като: {session?.user?.email}
          </h2>
          <Button variant={"destructive"} asChild>
            <SignOutButton>Излез</SignOutButton>
          </Button>
        </>
      ) : (
        <>
          <h1 className="text-center text-3xl font-semibold">
            Не сте влезли в своя акаунт.
          </h1>
          <h2 className="text-center text-xl font-semibold ">
            Ако имате съществуващ акаунт, можете да влезе или да се
            регистрирате, ако нямате такава.
          </h2>
          <div className="flex flex-wrap justify-center">
            <Button className="m-2" asChild>
              <Link href="/login">Вход</Link>
            </Button>
            <Button className="m-2" asChild>
              <Link href="/signup">Регистрирай се</Link>
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
