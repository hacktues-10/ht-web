import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { app } from "~/app/_integrations/github/app";
import { getAdminFromSession } from "~/app/(full-layout)/api/%5F%D0%B0%D0%B4%D0%BC%D0%B8%D0%BD/service";
import { db } from "~/app/db";
import { githubInstallations } from "~/app/db/schema";
import { env } from "~/app/env.mjs";

export async function GET(req: NextRequest) {
  const admin =
    env.VERCEL_ENV === "development" || (await getAdminFromSession());
  if (!admin) {
    return new Response("Unauthorized", { status: 401 });
  }
  let githubInstallationId = req.nextUrl.searchParams.get(
    "installation_github_id",
  );
  const installationRecordId = req.nextUrl.searchParams.get(
    "installation_record_id",
  );
  if (!githubInstallationId && !installationRecordId) {
    return new Response("Invalid request", { status: 400 });
  }
  if (!githubInstallationId && installationRecordId) {
    const results = await db
      .select({ githubInstallationId: githubInstallations.appInstallationId })
      .from(githubInstallations)
      .where(eq(githubInstallations.id, parseInt(installationRecordId)));
    const installationRecord = results.at(0);
    if (!installationRecord) {
      return new Response("Installation record not found", { status: 404 });
    }
    githubInstallationId = installationRecord.githubInstallationId.toString();
  }
  try {
    const octokit = await app.getInstallationOctokit(
      parseInt(githubInstallationId!),
    );
    const response = await octokit.auth({ type: "installation" });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
