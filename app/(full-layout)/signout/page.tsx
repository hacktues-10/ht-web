import { Metadata } from "next";

import { LoggedInAsChip } from "~/app/(clean-layout)/user/configure/_components/steps/step1";
import { getHTSession, signInRedirect } from "~/app/api/auth/session";
import { Card } from "~/app/components/ui/card";

export const metadata: Metadata = {
  title: "Изход",
  description: "Излезте от своя акаунт",
};

export default async function SignOut() {
  const session = await getHTSession();
  if (!session?.user?.email) {
    signInRedirect();
  }
  return (
    <section className="mt-32 flex w-full max-w-sm flex-col gap-5">
      <h1 className="text-center text-3xl font-extrabold">
        Излезте от своя акаунт
      </h1>
      <Card className="p-3">
        <LoggedInAsChip email={session.user.email} />
      </Card>
    </section>
  );
}
