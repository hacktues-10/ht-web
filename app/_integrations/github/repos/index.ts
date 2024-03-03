import { app } from "../app";

export async function getReposForInstallation(appInstallationId: number) {
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

export type Repo = Awaited<ReturnType<typeof getReposForInstallation>>[number];
