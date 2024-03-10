import { components, operations } from "@octokit/openapi-types";
import { OctokitResponse } from "@octokit/types";

import { env } from "~/app/env.mjs";
import { app } from "../app";

export async function ghGetReposForInstallation(appInstallationId: number) {
  try {
    const octokit = await app.getInstallationOctokit(appInstallationId);
    const res = await octokit.request("GET /installation/repositories", {
      headers: {
        "x-github-api-version": "2022-11-28",
      },
      per_page: 100, // ако някой има повече от 100 хранилища, да духа супата ;-;
      //                (може да даде достъп само до тези, които са му нужни, в случай на тикети)
    });
    return res.data.repositories;
  } catch (error) {
    // TODO: proper error logging
    console.error("getReposForInstallation error", error);
    return [];
  }
}

export async function ghGetRepoById(appInstallationId: number, repoId: number) {
  try {
    const octokit = await app.getInstallationOctokit(appInstallationId);
    const res = (await octokit.request("GET /repositories/{repository_id}", {
      headers: {
        "x-github-api-version": "2022-11-28",
      },
      repository_id: repoId,
    })) as OctokitResponse<components["schemas"]["full-repository"]>;
    return res.data;
  } catch (error) {
    // TODO: proper error logging
    console.error("getRepoById error", error);
    return null;
  }
}

export type Repo = Awaited<
  ReturnType<typeof ghGetReposForInstallation>
>[number];

export async function ghPublishRepo(appInstallationId: number, repoId: number) {
  const octokit = await app.getInstallationOctokit(appInstallationId);
  try {
    const res = (await octokit.request("PATCH /repositories/{repository_id}", {
      headers: {
        "x-github-api-version": "2022-11-28",
      },
      repository_id: repoId,
      private: false,
    })) as OctokitResponse<components["schemas"]["full-repository"]>;
    return {
      success: res.data.visibility === "public",
    };
  } catch (error) {
    if (env.VERCEL_ENV !== "production") {
      throw error;
    }

    // TODO: proper error logging
    console.error("publishRepo error", error);
    return {
      success: false,
    };
  }
}

export async function ghArchiveRepo(appInstallationId: number, repoId: number) {
  const octokit = await app.getInstallationOctokit(appInstallationId);
  try {
    const res = (await octokit.request("PATCH /repositories/{repository_id}", {
      headers: {
        "x-github-api-version": "2022-11-28",
      },
      repository_id: repoId,
      archived: true,
    })) as OctokitResponse<components["schemas"]["full-repository"]>;
    return {
      success: res.data.archived,
    };
  } catch (error) {
    if (env.VERCEL_ENV !== "production") {
      throw error;
    }

    // TODO: proper error logging
    console.error("archiveRepo error", error);
    return {
      success: false,
    };
  }
}
