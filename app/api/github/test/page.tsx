"use client";

import {
  Mutation,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  addRepo,
  getGithubRepos,
  removeRepo,
} from "~/app/_integrations/github/actions";
import { GitHubRepoDialog } from "~/app/_integrations/github/components";
import {
  REPOS_QUERY_KEY,
  useAddRepo,
  useGithubRepos,
  useRemoveRepo,
} from "~/app/_integrations/github/hooks";
import { Button } from "~/app/components/ui/button";
import { ToastAction } from "~/app/components/ui/toast";
import { useToast } from "~/app/components/ui/use-toast";
import { env } from "~/app/env.mjs";
import { openPopup } from "~/app/popups";

export default function TestPageDeletePls() {
  // const { data } = useGithubRepos();

  // return ;
  return (
    <>
      {/* {data
        ? data.map((repo) => (
            <div key={repo.githubId} className="flex gap-1">
              <h3>{repo.name}</h3>
              {!repo.id ? (
                <AddRepoButton
                  repoGithubId={repo.githubId}
                  installationId={repo.installationId}
                />
              ) : (
                <RemoveRepoButton repoId={repo.id} />
              )}
            </div>
          ))
        : "Loading..."} */}
      {/* <Button onClick={handleOpen}>Install</Button> */}
      <GitHubRepoDialog>
        <Button variant="ghost">Добави Хранилище</Button>
      </GitHubRepoDialog>
    </>
  );
}
