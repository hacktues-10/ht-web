import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getInstallationById as getAppInstallationById } from "~/app/_integrations/github/installations";
import {
  linkInstallationToParticipant,
  upsertInstallation,
} from "~/app/_integrations/github/installations/storage";
import { isNextControlError } from "~/app/hacks";
import { getParticipantFromSession } from "~/app/participants/service";
import { signInRedirectCustom } from "../../auth/session";

export async function GET(req: NextRequest) {
  try {
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
    const appInstallation = await getAppInstallationById(res.data);
    if (!appInstallation) {
      return redirect("/github/error?c=d10fkg");
    }
    const installation = await upsertInstallation(appInstallation.id);
    if (!installation) {
      return redirect("/github/error?c=0f2g9s");
    }
    await linkInstallationToParticipant(installation.id, participant.id);
    return redirect("/github/success");
  } catch (error) {
    if (isNextControlError(error)) {
      throw error;
    }
    // TODO: proper error logging
    console.error(error);
    return redirect("/github/error?c=9f2g9s");
  }
}
