import { NextRequest, NextResponse } from "next/server";

import { env } from "./app/env.mjs";

export async function middleware(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");
  const credentials = cookieHeader ? "include" : "same-origin";
  const response = await fetch(`${env.NEXTAUTH_URL}api/checkAuthentication`, {
    credentials,
    headers: cookieHeader ? { cookie: cookieHeader } : {},
  });
  const { isMentorOrParticipant, hasConnectedDiscord, hasSession } = (
    await response.json()
  ).body;

  if (hasSession) {
    if (!isMentorOrParticipant) {
      if (request.nextUrl.pathname !== "/user/configure") {
        return NextResponse.redirect(
          `${env.NEXTAUTH_URL}user/configure?callbackUrl=` +
            encodeURIComponent(request.nextUrl.href),
        );
      }
    } else if (!hasConnectedDiscord) {
      if (request.nextUrl.pathname !== "/discord") {
        return NextResponse.redirect(
          `${env.NEXTAUTH_URL}discord?callbackUrl=` +
            encodeURIComponent(request.nextUrl.href),
        );
      }
    }
  }

  NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|discord/error).*)"],
};
