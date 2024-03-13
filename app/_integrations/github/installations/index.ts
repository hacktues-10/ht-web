import { app } from "../app";

export async function ghGetInstallationById(installationId: number) {
  try {
    const { data } = await app.octokit.request(
      "GET /app/installations/{installation_id}",
      {
        headers: {
          "x-github-api-version": "2022-11-28",
        },
        installation_id: installationId,
      },
    );
    return data;
  } catch (error) {
    return null;
  }
}
