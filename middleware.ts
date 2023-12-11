import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { env } from "./app/env.mjs";

const hasCallbackUrl = (url: string) => {
  const urlObject = new URL(url);
  return urlObject.searchParams.has("callbackUrl");
};

export async function middleware(request: NextRequest) {
  if (request.cookies.has("next-auth.session-token")) {
    const cookieHeader = request.headers.get("cookie");
    const credentials = cookieHeader ? "include" : "same-origin";
    const response = await fetch(
      `${env.NEXTAUTH_URL}/api/checkAuthentication`,
      {
        credentials,
        headers: {
          cookie: `next-auth.session-token=${
            request.cookies.get("next-auth.session-token")?.value
          }`,
        },
      }
    );
    const { isMentorOrParticipant, hasConnectedDiscord } = (
      await response.json()
    ).body;

    if (!hasCallbackUrl(request.nextUrl.href)) {
      if (!isMentorOrParticipant) {
        return NextResponse.redirect(
          `${env.NEXTAUTH_URL}/user/configure?callbackUrl=` +
            encodeURIComponent(request.nextUrl.href)
        );
      }
      if (!hasConnectedDiscord) {
        return NextResponse.redirect(
          `${env.NEXTAUTH_URL}/api/discord?callbackUrl=` +
            encodeURIComponent(request.nextUrl.href)
        );
      }
    }
  }
  NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next).*)"],
};
