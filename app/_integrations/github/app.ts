import { App } from "octokit";
import invariant from "tiny-invariant";

import { env } from "~/app/env.mjs";
import { SECOND } from "~/app/utils";
import { getServerSideGrowthBook } from "../growthbook";
import {
  deleteInstallationRecord,
  getInstallationRecordByAppInstallationId,
  markInstallationAsSuspended,
} from "./installations/storage";
import { ghArchiveRepo, ghPublishRepo } from "./repos";
import {
  acceptRepoCommit,
  batchMarkReposAsSuspended,
  batchRemoveRepos,
  getRepoByGithubId,
  renameRepo,
  unimportRepo,
} from "./repos/storage";

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

app.webhooks.on(
  "installation_repositories.removed",
  async ({ octokit, payload }) => {
    const unimportedRepos = [] as {
      url: string;
      name: string;
      projectId: number;
    }[];
    for (const repo of payload.repositories_removed) {
      const existingRepo = await getRepoByGithubId(repo.id);
      if (!existingRepo) {
        console.error("repo not found", repo.id);
        continue;
      }
      await unimportRepo(existingRepo.id);
      unimportedRepos.push(existingRepo);
    }
    const projectIdToRepos = unimportedRepos.reduce(
      (acc, repo) => {
        const existing = acc.find((r) => r.projectId === repo.projectId);
        if (existing) {
          existing.repos.push({
            url: repo.url,
            name: repo.name,
          });
        } else {
          acc.push({
            projectId: repo.projectId,
            repos: [
              {
                url: repo.url,
                name: repo.name,
              },
            ],
          });
        }
        return acc;
      },
      [] as { projectId: number; repos: { url: string; name: string }[] }[],
    );
    // TODO: notify team here
    console.error({
      projectIdToRepos,
    });
  },
);

app.webhooks.on("installation.deleted", async ({ octokit, payload }) => {
  const installationRecord = await getInstallationRecordByAppInstallationId(
    payload.installation.id,
  );
  if (!installationRecord) {
    console.error("installation record not found", payload.installation.id);
    return;
  }
  const repos = await batchRemoveRepos(installationRecord.id);
  await deleteInstallationRecord(installationRecord.id);
  // TODO: notify team here
  console.error({
    repos,
  });
});

app.webhooks.on("installation.suspend", async ({ octokit, payload }) => {
  const installationRecord = await getInstallationRecordByAppInstallationId(
    payload.installation.id,
  );
  if (!installationRecord) {
    console.error("installation record not found", payload.installation.id);
    return;
  }
  await markInstallationAsSuspended(installationRecord.id, true);
  const repos = await batchMarkReposAsSuspended(installationRecord.id, true);
  // TODO: notify team here
  console.error({
    repos,
  });
});

app.webhooks.on("installation.unsuspend", async ({ octokit, payload }) => {
  const installationRecord = await getInstallationRecordByAppInstallationId(
    payload.installation.id,
  );
  if (!installationRecord) {
    console.error("installation record not found", payload.installation.id);
    return;
  }
  await markInstallationAsSuspended(installationRecord.id, false);
  await batchMarkReposAsSuspended(installationRecord.id, false);
});

app.webhooks.on("repository.renamed", async ({ octokit, payload }) => {
  const existingRepo = await getRepoByGithubId(payload.repository.id);
  if (!existingRepo) {
    console.error("repo not found", payload.repository.id);
    return;
  }
  await renameRepo({
    id: existingRepo.id,
    name: payload.repository.name,
    url: payload.repository.html_url,
  });
});

app.webhooks.on("repository.privatized", async ({ octokit, payload }) => {
  const existingRepo = await getRepoByGithubId(payload.repository.id);
  if (!existingRepo) {
    console.error("repo not found", payload.repository.id);
    return;
  }
  const gb = await getServerSideGrowthBook();
  if (gb.isOn("publish-github-repos")) {
    invariant(payload.installation, "Installation was not received, docs lied");
    const result = await ghPublishRepo(
      payload.installation.id,
      existingRepo.githubId,
    );
    if (!result.success) {
      throw new Error("Failed to publish repo");
    }
    // TODO: notify here
    console.error("repo published", existingRepo.githubId);
  } else {
    const repo = await unimportRepo(existingRepo.id);
    if (!repo) {
      throw new Error("Failed to unimport repo");
    }
    // TODO: notify here
    console.error("repo unimported", existingRepo.githubId);
  }
});

app.webhooks.on("push", async ({ octokit, payload }) => {
  const receivedAt = new Date();

  const gb = await getServerSideGrowthBook();
  if (gb.isOff("count-github-pushes")) {
    return;
  }

  const existingRepo = await getRepoByGithubId(payload.repository.id);
  if (!existingRepo) {
    console.error("repo not found", payload.repository.id);
    return;
  }
  const isToDefaultBranch =
    payload.ref === `refs/heads/${payload.repository.default_branch}`;
  if (!isToDefaultBranch) {
    return;
  }

  if (!payload.repository.pushed_at || !payload.head_commit) {
    return;
  }

  await acceptRepoCommit({
    id: existingRepo.id,
    lastAcceptedCommit: payload.after,
    lastAcceptedPushAt: new Date(payload.repository.pushed_at),
    lastAcceptedCommitDate: new Date(payload.head_commit.timestamp),
    lastAcceptedCommitReceivedAt: receivedAt,
  });
});

app.webhooks.on("repository.unarchived", async ({ octokit, payload }) => {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("archive-github-repos")) {
    return;
  }

  const existingRepo = await getRepoByGithubId(payload.repository.id);
  if (!existingRepo) {
    console.error("repo not found", payload.repository.id);
    return;
  }

  invariant(payload.installation, "Installation was not received, docs lied");
  const result = await ghArchiveRepo(
    payload.installation.id,
    existingRepo.githubId,
  );
  if (!result.success) {
    throw new Error("Failed to archive repo");
  }
  // TODO: notify here
  console.error("repo archived", existingRepo.githubId);
});
