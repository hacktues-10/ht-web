import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getCsrfToken } from "next-auth/react";
import invariant from "tiny-invariant";

import {
  getMentorByEmail,
  getMentorFromSession,
} from "~/app/(full-layout)/mentors/service";
import {
  getParticipantByEmail,
  getParticipantFromSession,
} from "~/app/participants/service";
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
  return redirect(
    `/api/auth/signin?${new URLSearchParams({
      callbackUrl: invokePath ?? "/",
    })}`,
  );
}

export async function getUserAuthorization() {
  const session = await getHTSession();
  const mentor = await getMentorFromSession();
  const participant = await getParticipantFromSession();

  return {
    hasSession: !!session,
    isMentor: !!mentor,
    isParticipant: !!participant,
    hasConnectedDiscord: !!mentor?.discordUser || !!participant?.discordUser,
  };
}

export function getHTCsrfToken() {
  return getCsrfToken({
    req: {
      headers: [...headers()].reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        {},
      ),
    },
  });
}
