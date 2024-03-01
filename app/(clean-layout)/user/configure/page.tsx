import { PropsWithChildren } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import invariant from "tiny-invariant";

import { isWhitelistedMentor } from "~/app/(full-layout)/mentors/service";
import { getHTSession, signInRedirect } from "~/app/api/auth/session";
import { getParticipantFromSession } from "~/app/participants/service";
import { MentorFrom } from "./_components/mentor-form";
import { ParticipantForm } from "./_components/participant-form";

export const metadata: Metadata = {
  title: "Регистрация",
  description: "Регистрирайте се за участие в Hack TUES X",
};

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
  const mentor = null;
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
    "/discord?" +
      new URLSearchParams(
        callbackUrl ? { callbackUrl } : { callbackUrl: "" },
      ).toString(),
  );
}
