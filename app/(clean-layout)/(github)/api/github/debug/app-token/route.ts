import { NextRequest, NextResponse } from "next/server";

import { app } from "~/app/_integrations/github/app";
import { getAdminFromSession } from "~/app/(full-layout)/api/%5F%D0%B0%D0%B4%D0%BC%D0%B8%D0%BD/service";
import { env } from "~/app/env.mjs";

export async function GET(req: NextRequest) {
  const admin =
    env.VERCEL_ENV === "development" || (await getAdminFromSession());
  if (!admin) {
    return new Response("Unauthorized", { status: 401 });
  }

  // get the token
  const res = await app.octokit.auth({ type: "app" });
  return NextResponse.json(res);
}
