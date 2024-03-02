import { App } from "octokit";

import { env } from "~/app/env.mjs";
import { SECOND } from "~/app/utils";

export const app = new App({
  appId: env.GITHUB_APP_ID,
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
