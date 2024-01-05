import { LoggedInAsChip } from "~/app/(clean-layout)/user/configure/_components/steps/step1";
import { signInRedirect } from "~/app/api/auth/session";
import { Card } from "~/app/components/ui/card";
import { getParticipantFromSession } from "~/app/participants/service";

export default async function SignOut() {
  const participant = await getParticipantFromSession();
  if (!participant) {
    signInRedirect();
  }
  return (
    <section className="mt-32 flex w-full max-w-sm flex-col gap-5">
      <h1 className="text-center text-3xl font-extrabold">
        Излезте от своя акаунт
      </h1>
      <Card className="p-3">
        <LoggedInAsChip email={participant.email} />
      </Card>
    </section>
  );
}
