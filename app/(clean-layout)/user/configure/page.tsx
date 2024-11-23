import { PropsWithChildren } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import invariant from "tiny-invariant";

import { HT_EDITION_NAME } from "~/app/_configs/hackathon";
import { HT_EDITION_BACKGROUND_COLOR } from "~/app/_configs/pr";
import { getHTSession, signInRedirect } from "~/app/api/auth/session";
import { getParticipantFromSession } from "~/app/participants/service";
import { ParticipantForm } from "./_components/participant-form";

export const metadata: Metadata = {
  title: "Регистрация",
  description: `Регистрирайте се за участие в ${HT_EDITION_NAME}`,
  openGraph: {
    title: "Регистрация",
    description: `Регистрирайте се за участие в ${HT_EDITION_NAME}`,
  },
};

export default async function ConfigFlowPage({
  searchParams: { callbackUrl },
}: {
  searchParams: { callbackUrl?: string };
}) {
  const session = await getHTSession();
  if (!session) signInRedirect();
  invariant(session.user?.email, "No email in session");

  return (
    <IfNotParticipant callbackUrl={callbackUrl}>
      <ParticipantForm />
    </IfNotParticipant>
  );
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
