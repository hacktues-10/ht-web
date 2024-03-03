import { Metadata } from "next";
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
import { signInRedirectCustom } from "../../../../../api/auth/session";

export const metadata: Metadata = {
  title: "Свързване с GitHub...",
  description: "Свързва се с GitHub...",
};

const URL_TO_THIS_PAGE = "/api/github/install";

export default async function GithubLoadingPage({
  searchParams,
}: {
  searchParams: {
    setup_action?: string;
    installation_id?: string;
  };
}) {
  try {
    const participant = await getParticipantFromSession();
    if (!participant) {
      return signInRedirectCustom(
        `${URL_TO_THIS_PAGE}?${new URLSearchParams(searchParams).toString()}`,
      );
    }
    const setupAction = searchParams.setup_action;
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
      .safeParse(searchParams.installation_id);
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
