import { NextRequest, NextResponse } from "next/server";

import { env } from "./app/env.mjs";

const hasCallbackUrl = (pathname: string) => {
  return pathname === "/discord" || pathname === "/user/configure";
};

export async function middleware(request: NextRequest) {
  if (request.cookies.has("next-auth.session-token")) {
    const cookieHeader = request.headers.get("cookie");
    const credentials = cookieHeader ? "include" : "same-origin";
    const response = await fetch(`${env.NEXTAUTH_URL}api/checkAuthentication`, {
      credentials,
      headers: {
        cookie: `next-auth.session-token=${request.cookies.get(
          "next-auth.session-token",
        )?.value}`,
      },
    });
    const { isMentorOrParticipant, hasConnectedDiscord } = (
      await response.json()
    ).body;
    console.log(request.nextUrl.pathname);
    if (!hasCallbackUrl(request.nextUrl.pathname)) {
      if (!isMentorOrParticipant) {
        return NextResponse.redirect(
          `${env.NEXTAUTH_URL}user/configure?callbackUrl=` +
            encodeURIComponent(request.nextUrl.href),
        );
      }
      if (!hasConnectedDiscord) {
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
  matcher: ["/((?!api|_next).*)"],
};
