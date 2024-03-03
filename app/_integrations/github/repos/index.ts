import { components } from "@octokit/openapi-types";
import { OctokitResponse } from "@octokit/types";

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
