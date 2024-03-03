import { app } from "../app";

export async function getReposForInstallation(appInstallationId: number) {
  try {
    const octokit = await app.getInstallationOctokit(appInstallationId);
    const res = await octokit.request("GET /installation/repositories", {
      headers: {
        "x-github-api-version": "2022-11-28",
      },
    });
    return res.data.repositories;
  } catch (error) {
    // TODO: proper error logging
    console.error("getReposForInstallation error", error);
    return [];
  }
}

export type Repo = Awaited<ReturnType<typeof getReposForInstallation>>[number];
