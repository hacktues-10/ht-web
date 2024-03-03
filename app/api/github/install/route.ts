import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getInstallationById } from "~/app/_integrations/github/installations";
import { getParticipantFromSession } from "~/app/participants/service";
import { signInRedirectCustom } from "../../auth/session";

export async function GET(req: NextRequest) {
  const participant = await getParticipantFromSession();
  if (!participant) {
    return signInRedirectCustom(req.url);
  }
  const setupAction = req.nextUrl.searchParams.get("setup_action");
  if (setupAction === "request") {
    return redirect("/github/request");
  }
  // NOTE: commented, so we always save the installation to cover more bases
  // if (setupAction !== "install") {
  //   return redirect("/github/success");
  // }
  const res = z
    .string()
    .transform((s) => parseInt(s, 10))
    .pipe(z.number().int())
    .safeParse(req.nextUrl.searchParams.get("installation_id"));
  if (!res.success) {
    return redirect("/github/error?c=wp0rgu8");
  }
  const installation = await getInstallationById(res.data);
  if (!installation) {
    return redirect("/github/error?c=d10fkg");
  }
  return NextResponse.json(installation);
}
