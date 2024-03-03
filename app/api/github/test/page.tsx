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
import { Button } from "~/app/components/ui/button";
import { ToastAction } from "~/app/components/ui/toast";
import { useToast } from "~/app/components/ui/use-toast";
import { env } from "~/app/env.mjs";
import { openPopup } from "~/app/popups";

const REPOS_QUERY_KEY = ["github-installations"];

function AddRepoButton(props: {
  repoGithubId: number;
  installationId: number;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const result = await addRepo({
        githubId: props.repoGithubId,
        installationId: props.installationId,
      });
      if (!result.success) {
        throw new Error(result.message);
      }
      return result.id;
    },
    onSuccess: async (createdId) => {
      await queryClient.cancelQueries({
        exact: true,
        queryKey: REPOS_QUERY_KEY,
      });
      const previousData = queryClient.getQueryData(REPOS_QUERY_KEY);
      if (Array.isArray(previousData)) {
        const repos = previousData as unknown[];
        queryClient.setQueryData(
          REPOS_QUERY_KEY,
          repos.map((repo) => {
            if (
              typeof repo === "object" &&
              repo &&
              "githubId" in repo &&
              repo.githubId === props.repoGithubId
            ) {
              return { ...repo, id: createdId };
            }
            return repo;
          }),
        );
      }
      await queryClient.refetchQueries({
        exact: true,
        queryKey: REPOS_QUERY_KEY,
      });
    },
    onError: (error) => {
      toast({
        title: "Хранилището не бе добавено",
        description: error.message,
        action: error.message.includes("отново") ? (
          <ToastAction altText="Опитай пак" onClick={() => mutation.mutate()}>
            Опитай пак
          </ToastAction>
        ) : undefined,
      });
    },
  });

  return (
    <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
      add
    </Button>
  );
}

function RemoveRepoButton(props: { repoId: number }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await removeRepo({
        id: props.repoId,
      });
      if (!response.success) {
        throw new Error(response.message);
      }
    },
    onSuccess: async () => {
      await queryClient.cancelQueries({
        exact: true,
        queryKey: REPOS_QUERY_KEY,
      });
      const previousData = queryClient.getQueryData(REPOS_QUERY_KEY);
      if (Array.isArray(previousData)) {
        queryClient.setQueryData(
          REPOS_QUERY_KEY,
          previousData.map((repo) => {
            if (
              typeof repo === "object" &&
              repo &&
              "id" in repo &&
              repo.id === props.repoId
            ) {
              return { ...repo, id: null };
            }
            return repo;
          }),
        );
      }
      await queryClient.refetchQueries({
        exact: true,
        queryKey: REPOS_QUERY_KEY,
      });
    },
    onError: (error) => {
      toast({
        title: "Хранилишето не бе премахнато",
        description: error.message,
        action: error.message.includes("отново") ? (
          <ToastAction altText="Опитай пак" onClick={() => mutation.mutate()}>
            Опитай пак
          </ToastAction>
        ) : undefined,
      });
    },
  });

  return (
    <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
      remove
    </Button>
  );
}

export default function TestPageDeletePls() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: REPOS_QUERY_KEY,
    queryFn: () => getGithubRepos(),
  });

  function handleOpen() {
    openPopup(
      `https://github.com/apps/${env.NEXT_PUBLIC_GITHUB_APP_SLUG}/installations/new`,
      800,
      600,
    ).then(() => {
      // queryClient.refetchQueries({
      //   exact: true,
      //   queryKey: REPOS_QUERY_KEY,
      // });
      queryClient.resetQueries({
        exact: true,
        queryKey: REPOS_QUERY_KEY,
      });
    });
  }
  // return ;
  return (
    <>
      {data
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
        : "Loading..."}
      <Button onClick={handleOpen}>Install</Button>
    </>
  );
}
