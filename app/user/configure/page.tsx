import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import invariant from "tiny-invariant";

import { getHTSession, signInRedirect } from "~/app/api/auth/session";
import { Card, CardContent } from "~/app/components/ui/card";
import {
  getMentorFromSession,
  isWhitelistedMentor,
} from "~/app/mentors/service";
import { getParticipantFromSession } from "~/app/participants/service";
import { MentorFrom } from "./_components/mentor-form";
import { ParticipantForm } from "./_components/participant-form";

export default async function ConfigFlowPage({
  searchParams: { callbackUrl },
}: {
  searchParams: { callbackUrl?: string };
}) {
  const session = await getHTSession();
  if (!session) signInRedirect();
  invariant(session.user?.email, "No email in session");

  const isMentor = isWhitelistedMentor(session);

  return isMentor ? (
    <IfNotMentor callbackUrl={callbackUrl}>
      <MentorFrom email={session.user.email} />
    </IfNotMentor>
  ) : (
    <IfNotParticipant callbackUrl={callbackUrl}>
      <ParticipantForm />
    </IfNotParticipant>
  );
}

async function IfNotMentor({
  callbackUrl,
  children,
}: PropsWithChildren<{
  callbackUrl?: string;
}>) {
  const mentor = await getMentorFromSession();
  if (mentor) {
    return initiateDiscordFlow(callbackUrl);
  }
  return <>{children}</>;
}

async function IfNotParticipant({
  callbackUrl,
  children,
}: PropsWithChildren<{
  callbackUrl?: string;
}>) {
  const participant = await getParticipantFromSession();
  if (participant) {
    return initiateDiscordFlow(callbackUrl);
  }
  return <>{children}</>;
}

function initiateDiscordFlow(callbackUrl?: string) {
  return redirect(
    // TODO: make this redirect to /discord?callbackUrl=...
    "/api/discord?" +
      new URLSearchParams(
        callbackUrl ? { callbackUrl } : { callbackUrl: "" },
      ).toString(),
  );
}
