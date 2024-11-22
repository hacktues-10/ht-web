import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import invariant from "tiny-invariant";

import { getAdminFromSession } from "~/app/(full-layout)/api/%5F%D0%B0%D0%B4%D0%BC%D0%B8%D0%BD/service";
import { getParticipantFromSession } from "~/app/participants/service";
import { authOptions } from "./options";

export async function getHTSession() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  invariant(session.user !== undefined, "User is missing from session");
  invariant(session.user.email, "Email is missing from session");
  return session;
}

export type HTSession = Exclude<Awaited<ReturnType<typeof getHTSession>>, null>;

export function signInRedirect(): never {
  // TODO: redirect to current page in a better way
  // Next App router doesn't have an API for this yet
  // X-Invoke-Path is not documented, but it works
  // I don't feel good about this
  // https://stackoverflow.com/a/76585119
  const invokePath = headers().get("x-invoke-path");
  return signInRedirectCustom(invokePath ?? "/");
}

export function signInRedirectCustom(callbackUrl: string): never {
  return redirect(`/api/auth/signin?${new URLSearchParams({ callbackUrl })}`);
}

export async function getUserAuthorization() {
  const session = await getHTSession();
  const participant = await getParticipantFromSession();
  const admin = await getAdminFromSession();
  return {
    hasSession: !!session,
    isParticipant: !!participant,
    hasConnectedDiscord: !!participant?.discordUser,
    isAdmin: !!admin,
  };
}
