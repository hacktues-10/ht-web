"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getGithubRepos } from "~/app/_integrations/github/actions";
import { Button } from "~/app/components/ui/button";
import { env } from "~/app/env.mjs";
import { openPopup } from "~/app/popups";

export default function TestPageDeletePls() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["github-installations"],
    queryFn: () => getGithubRepos(),
  });

  function handleOpen() {
    openPopup(
      `https://github.com/apps/${env.NEXT_PUBLIC_GITHUB_APP_SLUG}/installations/new`,
      800,
      600,
    ).then(() => {
      queryClient.refetchQueries({
        exact: true,
        queryKey: ["github-installations"],
      });
    });
  }
  // return ;
  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Button onClick={handleOpen}>Install</Button>
    </>
  );
}
