import { NextResponse, type NextRequest } from "next/server";

import { env } from "~/app/env.mjs";
import { resolveCallbackUrl } from "~/app/utils";

export function GET(req: NextRequest) {
  const redirect_uri =
    req.headers.get("host") === "localhost:3000"
      ? "http://" + (req.headers.get("host") || "") + "/api/discord/callback"
      : "https://" + (req.headers.get("host") || "") + "/api/discord/callback";

  const res = NextResponse.redirect(
    `https://discord.com/oauth2/authorize?${new URLSearchParams([
      ["response_type", "code"],
      ["client_id", env.DISCORD_CLIENT_ID],
      ["scope", "identify guilds.join"],
      ["redirect_uri", redirect_uri],
      ["prompt", "none"],
    ])}`,
  );
  const untrustedCallbackUrl = req.nextUrl.searchParams.get("callbackUrl");
  if (untrustedCallbackUrl) {
    const callbackUrl = resolveCallbackUrl(untrustedCallbackUrl, req);
    res.cookies.set("callbackUrl", callbackUrl, {
      path: "/api/discord/callback",
      maxAge: 60 * 60,
    });
  }
  return res;
}
