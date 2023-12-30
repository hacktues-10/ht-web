import { NextRequest, NextResponse } from "next/server";

import { CheckAuthenticationResponse } from "./app/api/checkAuthentication/route";

export async function middleware(request: NextRequest) {
  // const baseUrl = request.nextUrl.origin;
  const baseUrl = "http://127.0.0.1:3000";
  const cookieHeader = request.headers.get("cookie");
  const credentials = cookieHeader ? "include" : "same-origin";
  const response = await fetch(`${baseUrl}/api/checkAuthentication`, {
    credentials,
    headers: cookieHeader ? { cookie: cookieHeader } : {},
  });
  const { isMentorOrParticipant, hasConnectedDiscord, hasSession } =
    (await response.json()) as CheckAuthenticationResponse;

  if (hasSession) {
    if (!isMentorOrParticipant) {
      if (request.nextUrl.pathname !== "/user/configure") {
        return NextResponse.redirect(
          `${baseUrl}/user/configure?callbackUrl=` +
            encodeURIComponent(request.nextUrl.href),
        );
      }
    } else if (!hasConnectedDiscord) {
      if (request.nextUrl.pathname !== "/discord") {
        return NextResponse.redirect(
          `${baseUrl}/discord?callbackUrl=` +
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
