"use server";

import { getParticipantFromSession } from "~/app/participants/service";
import {
  getInstallationsForParticipant,
  Installation,
} from "./installations/storage";
import { getReposForInstallation, Repo } from "./repos";

export const getGithubRepos = async () => {
  const participant = await getParticipantFromSession();
  if (!participant) {
    return [];
  }

  const installations = await getInstallationsForParticipant(participant.id);
  const results = await Promise.allSettled(
    installations
      .sort((a, b) => b.linkedAt.getTime() - a.linkedAt.getTime())
      .map((installation) =>
        getReposForInstallation(installation.appInstallationId).then(
          (repos) => ({ repos, installation }),
        ),
      ),
  );
  return results
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
        id: repo.id,
        name: repo.full_name,
        isPrivate: repo.private,
        updatedAt: repo.pushed_at ? new Date(repo.pushed_at) : new Date(0),
        url: repo.html_url,
        installationId: result.value.installation.id,
      })),
    )
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
};
