import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "./options";

export function getHTSession() {
  return getServerSession(authOptions);
}

export function signInRedirect() {
  // TODO: redirect to current page in a better way
  // Next App router doesn't have an API for this yet
  // X-Invoke-Path is not documented, but it works
  // I don't feel good about this
  // https://stackoverflow.com/a/76585119
  const invokePath = headers().get("x-invoke-path");
  console.log({ invokePath });
  redirect(
    `/api/auth/signin?${new URLSearchParams({
      callbackUrl: invokePath ?? "/",
    })}`,
  );
}
