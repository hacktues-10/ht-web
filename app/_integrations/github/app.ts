import { App } from "octokit";

import { env } from "~/app/env.mjs";
import { SECOND } from "~/app/utils";
import {
  deleteInstallationRecord,
  getInstallationRecordByAppInstallationId,
} from "./installations/storage";

export const app = new App({
  appId: env.GITHUB_APP_ID,
  // NOTE: key must be in PKCS#8 format
  // To convert:
  //      $ openssl pkcs8 -topk8 -inform PEM -outform PEM -in leaks2.pem -out leaks2_pkcs8.pem -nocrypt
  // (from ChatGPT, but it works, so cool ig??)
  privateKey: env.GITHUB_PRIVATE_KEY,
  webhooks: {
    secret: env.GITHUB_WEBHOOK_SECRET,
  },
});

const sleep = (s: number) =>
  new Promise((resolve) => setTimeout(resolve, s * SECOND));

app.webhooks.on("installation_repositories", async ({ octokit, payload }) => {
  await sleep(10);
  console.log("installation", payload);
});

app.webhooks.on("installation.deleted", async ({ octokit, payload }) => {
  const installationRecord = await getInstallationRecordByAppInstallationId(
    payload.installation.id,
  );
  if (!installationRecord) {
    console.error("installation record not found", payload.installation.id);
    return;
  }
  await deleteInstallationRecord(installationRecord.id);
});
