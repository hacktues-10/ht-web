import { App } from "octokit";
import invariant from "tiny-invariant";

import { getTeamByProjectId } from "~/app/(full-layout)/teams/service";
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
import { githubNewInstallationUrl } from "./urls";

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
    const projectIdToRepos = getProjectToReposMap(unimportedRepos);
    for (const { projectId, repos } of projectIdToRepos) {
      const team = await getTeamByProjectId(projectId);
      if (!team) {
        console.error("team not found", projectId);
        continue;
      }
      invariant(team.teams.discordRoleId);
      const reposList = formatReposList(repos);
      await notifyTeam({
        teamChannelId: team.teams.discordTextChannelId,
        teamRoleId: team.teams.discordRoleId,
        message: `# <@&${team.teams.discordRoleId}> ${capfirst(
          getYourRepositoriesText(repos),
        )} ${getWereRemovedText(repos)} от сайта!
Достъпът на GitHub приложението до ${getYourRepositoriesText(
          repos,
        )} ${reposList} бе премахнат и ${pluralizeRepo(
          repos,
        )} ${getWereRemovedText(repos)} от сайта на Hack TUES X.

Ако това е нежелано, моля, възстановете достъпа и добавете отново ${pluralizeRepo(
          repos,
        )} от страницата на вашия отбор.

${getDisqualificationWarning(team.teams.isAlumni)}`,
        links: [
          {
            name: "Управление на достъпа",
            url: githubNewInstallationUrl,
          },
          {
            name: "Управление на хранилищата",
            url: `https://hacktues.bg/teams/${team.teams.id}`,
          },
        ],
      });
    }
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
  const projectIdToRepos = getProjectToReposMap(repos);
  const reposList = formatReposList(repos);
  for (const { projectId, repos } of projectIdToRepos) {
    const team = await getTeamByProjectId(projectId);
    if (!team) {
      console.error("team not found", projectId);
      continue;
    }
    invariant(team.teams.discordRoleId);
    await notifyTeam({
      teamChannelId: team.teams.discordTextChannelId,
      teamRoleId: team.teams.discordRoleId,
      message: `# <@&${team.teams.discordRoleId}> ${capfirst(
        getYourRepositoriesText(repos),
      )} ${getWereRemovedText(repos)} от сайта!
Достъпът на GitHub приложението до вашия акаунт бе отстранен и ${getYourRepositoriesText(
        repos,
      )} ${reposList} ${getWereRemovedText(repos)} от сайта на Hack TUES X.

Ако това е нежелано, моля, възстановете достъпа и добавете отново ${pluralizeRepo(
        repos,
      )} на страницата на отбора.

${getDisqualificationWarning(team.teams.isAlumni)}`,
      links: [
        {
          name: "Възстановяване на достъпа",
          url: githubNewInstallationUrl,
        },
        {
          name: "Управление на хранилищата",
          url: `https://hacktues.bg/teams/${team.teams.id}`,
        },
      ],
    });
  }
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
  const projectIdToRepos = getProjectToReposMap(repos);
  for (const { projectId, repos } of projectIdToRepos) {
    const team = await getTeamByProjectId(projectId);
    if (!team) {
      console.error("team not found", projectId);
      continue;
    }
    invariant(team.teams.discordRoleId);
    const reposList = formatReposList(repos);
    await notifyTeam({
      teamChannelId: team.teams.discordTextChannelId,
      teamRoleId: team.teams.discordRoleId,
      message: `# <@&${team.teams.discordRoleId}> ${capfirst(
        getYourRepositoriesText(repos),
      )} временно ${getWereRemovedText(repos)} от сайта!
Достъпът на GitHub приложението до ${getYourRepositoriesText(
        repos,
      )} ${reposList} беше временно ограничен с бутона "Suspend" и ${pluralizeRepo(
        repos,
      )} временно ${getWereRemovedText(repos)} от сайта на Hack TUES X.

Ако това е нежелано, моля, възстановете достъпа чрез "Unsuspend" бутона в GitHub за да добавите ${pluralizeRepo(
        repos,
      )} отново на сайта.

${getDisqualificationWarning(team.teams.isAlumni)}`,
      links: [
        {
          name: "Възстановяване на достъпа",
          url: githubNewInstallationUrl,
        },
        {
          name: "Управление на хранилищата",
          url: `https://hacktues.bg/teams/${team.teams.id}`,
        },
      ],
    });
  }
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
    name: payload.repository.full_name,
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
    const team = await getTeamByProjectId(existingRepo.projectId);
    if (!team) {
      console.error("team not found", existingRepo.projectId);
      return;
    }
    invariant(team.teams.discordRoleId);
    await notifyTeam({
      teamChannelId: team.teams.discordTextChannelId,
      teamRoleId: team.teams.discordRoleId,
      message: `# <@&${
        team.teams.discordRoleId
      }> Вашето хранилище бе направено отново публично!
Вие променихте видимостта на ${formatReposList([
        existingRepo,
      ])} в GitHub от "Public" на "Private". Тъй като не можете да участвате в Hack TUES X с частни хранилища, ние го направихме отново публично.

Ако желаете да премахнете хранилището от сайта, можете да го направите от страницата на отбора.

${getDisqualificationWarning(team.teams.isAlumni)}`,
      links: [
        {
          url: `https://hacktues.bg/teams/${team.teams.id}`,
          name: "Управление на хранилищата",
        },
      ],
    });
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
  const team = await getTeamByProjectId(existingRepo.projectId);
  if (!team) {
    console.error("team not found", existingRepo.projectId);
    return;
  }
  invariant(team.teams.discordRoleId);
  await notifyTeam({
    teamChannelId: team.teams.discordTextChannelId,
    teamRoleId: team.teams.discordRoleId,
    message: `# <@&${team.teams.discordRoleId}> Времето за работа приключи!
Бе установен опит за качване на промени в ${formatReposList([
      existingRepo,
    ])}. Крайният срок за предаване на проектите изтече и хранилището бе архивирано.`,
  });
  console.error("repo archived", existingRepo.githubId);
});

async function notifyTeam(options: {
  teamChannelId: string;
  teamRoleId: string;
  message: string;
  links?: { url: string; name: string }[];
}) {
  const response = await fetch(
    `https://discord.com/api/channels/${options.teamChannelId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bot ${env.DISCORD_BOT_ID}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: options.message,
        allowed_mentions: {
          roles: [options.teamRoleId],
        },
        components: options.links
          ? [
              {
                type: 1,
                components: options.links.map((link) => ({
                  type: 2,
                  url: link.url,
                  label: link.name,
                  style: 5,
                })),
              },
            ]
          : undefined,
      }),
    },
  );
  if (!response.ok) {
    console.error(
      "failed to send message",
      JSON.stringify(await response.json()),
    );
  }
}

const getDisqualificationWarning = (isAlumni: boolean) =>
  `**Отбор, който няма хранилище, качено на сайта след края на първия работен ден (<t:1710383400:D>), няма да бъде допуснат до ${
    !isAlumni ? "полуфинал" : "финал"
  }!**`;

const getProjectToReposMap = <T extends { projectId: number }>(repos: T[]) =>
  repos.reduce(
    (acc, { projectId, ...rest }) => {
      const existing = acc.find((r) => r.projectId === projectId);
      if (existing) {
        existing.repos.push(rest);
      } else {
        acc.push({
          projectId: projectId,
          repos: [rest],
        });
      }
      return acc;
    },
    [] as { projectId: T["projectId"]; repos: Omit<T, "projectId">[] }[],
  );

const listFormat = new Intl.ListFormat("bg", {
  style: "long",
  type: "conjunction",
});

function formatReposList(repos: { url: string; name: string }[]) {
  const list = repos.map((repo) => `[\`${repo.name}\`](<${repo.url}>)`);
  return listFormat.format(list);
}

function getYourRepositoriesText(repos: unknown[]) {
  return repos.length === 1 ? "вашето хранилище" : "вашите хранилища";
}

function getWereRemovedText(repos: unknown[]) {
  return repos.length === 1 ? "е премахнато" : "са премахнати";
}

function capfirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function pluralizeRepo(repos: unknown[]) {
  return repos.length === 1 ? "хранилището" : "хранилищата";
}
