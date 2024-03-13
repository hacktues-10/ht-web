"use server";

import invariant from "tiny-invariant";
import { z } from "zod";

import { zact } from "~/app/_zact/server";
import { getProjectByTeamId } from "~/app/(full-layout)/teams/service";
import { env } from "~/app/env.mjs";
import {
  getParticipantFromSession,
  Participant,
} from "~/app/participants/service";
import { getServerSideGrowthBook } from "../growthbook";
import {
  getInstallationRecordByParticipantId,
  getInstallationsForParticipant,
  Installation,
} from "./installations/storage";
import {
  ghGetRepoById,
  ghGetReposForInstallation,
  ghPublishRepo,
  Repo,
} from "./repos";
import {
  getRepoById,
  getReposForProject,
  importRepo,
  unimportRepo,
} from "./repos/storage";

export const getGithubRepos = async () => {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("add-github-repos")) {
    return [];
  }

  const participant = await getParticipantFromSession();
  if (!participant) {
    return [];
  }

  const [githubRepos, participantRepos] = await Promise.all([
    fetchGithubRepos(participant.id),
    getImportedReposForParticipant(participant),
  ]);
  const forbiddenRepos = new Set(
    participantRepos
      .filter((repo) => repo.participantId !== participant.id)
      .map((repo) => repo.githubId),
  );
  const reposIdMap = new Map(
    participantRepos.map((repo) => [repo.githubId, repo.id] as const),
  );
  return githubRepos
    .filter(
      (
        result,
      ): result is PromiseFulfilledResult<{
        repos: Repo[];
        installation: Installation;
      }> => result.status === "fulfilled",
    )
    .flatMap((result) =>
      result.value.repos.map((repo) => ({
        id: reposIdMap.get(repo.id) ?? null,
        githubId: repo.id,
        name: repo.full_name,
        isPrivate: repo.private,
        updatedAt: new Date(
          repo.pushed_at || repo.updated_at || repo.created_at || 0,
        ),
        url: repo.html_url,
        installationId: result.value.installation.id,
      })),
    )
    .filter((repo) => !forbiddenRepos.has(repo.githubId))
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
};

export const addRepo = zact(
  z.object({ githubId: z.number().int(), installationId: z.number().int() }),
)(async (input) => {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("add-github-repos")) {
    return {
      success: false,
      message: "Функционалността е изключена",
    } as const;
  }

  const participant = await getParticipantFromSession();
  if (!participant) {
    return {
      success: false,
      message: "Не сте влезли като участник",
    } as const;
  }
  if (!participant.team.id) {
    return {
      success: false,
      message: "Не сте член на отбор",
    } as const;
  }
  const project = await getProjectByTeamId(participant.team.id);
  if (!project) {
    return {
      success: false,
      message: participant.team.isCaptain
        ? "Моля, създайте проект, за да добавите хранилише"
        : "Отборът ви няма проект",
    } as const;
  }
  const installation = await getInstallationRecordByParticipantId(
    participant.id,
    input.installationId,
  );
  if (!installation) {
    return {
      success: false,
      message: "Не можете да добавите хранилише от тази инсталация",
    } as const;
  }
  invariant(installation.id === input.installationId);
  const githubRepo = await ghGetRepoById(
    installation.appInstallationId,
    input.githubId,
  );
  if (!githubRepo) {
    return {
      success: false,
      message: "Не можем да намерим хранилишето в GitHub.",
    } as const;
  }
  if (gb.isOn("publish-github-repos") && githubRepo.private) {
    const { success } = await ghPublishRepo(
      installation.appInstallationId,
      githubRepo.id,
    );
    if (!success) {
      return {
        success: false,
        message: "Не можете да добавите хранилише, което не е публично.",
      } as const;
    }
  }
  const repo = await importRepo({
    githubId: githubRepo.id,
    name: githubRepo.full_name,
    installationId: installation.id,
    projectId: project.id,
    participantId: participant.id,
    url: githubRepo.html_url,
  });
  if (!repo) {
    return {
      success: false,
      retry: true,
      message: "Грешка при добавяне на хранилишето. Моля, опитайте отново.",
    } as const;
  }
  return {
    success: true,
    id: repo.id,
  };
});

export const removeRepo = zact(
  z.object({
    id: z.number().int(),
  }),
)(async (input) => {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("add-github-repos")) {
    return {
      success: false,
      message: "Функционалността е изключена",
    } as const;
  }

  const participant = await getParticipantFromSession();
  if (!participant) {
    return {
      success: false,
      message: "Не сте влезли като участник",
    } as const;
  }
  const repo = await getRepoById(input.id);
  if (!repo) {
    return {
      success: false,
      message: "Хранилишето не съществува",
    } as const;
  }
  if (repo.participantId !== participant.id) {
    return {
      success: false,
      message: "Това хранилише не е добавено от вас",
    } as const;
  }
  try {
    await unimportRepo(repo.id);
  } catch (error) {
    if (env.VERCEL_ENV !== "production") {
      throw error;
    }
    console.error("removeRepo error", error);
    return {
      success: false,
      message: "Грешка при премахване на хранилишето. Моля, опитайте отново.",
    } as const;
  }
  return {
    success: true,
  } as const;
});

async function fetchGithubRepos(participantId: number) {
  const installations = await getInstallationsForParticipant(participantId);
  const results = await Promise.allSettled(
    installations
      .sort((a, b) => b.linkedAt.getTime() - a.linkedAt.getTime())
      .map((installation) =>
        ghGetReposForInstallation(installation.appInstallationId).then(
          (repos) => ({ repos, installation }),
        ),
      ),
  );
  return results;
}

async function getImportedReposForParticipant(participant: Participant) {
  if (!participant.team.id) {
    return [];
  }
  const project = await getProjectByTeamId(participant.team.id);
  if (!project) {
    return [];
  }
  return getReposForProject(project.id);
}
