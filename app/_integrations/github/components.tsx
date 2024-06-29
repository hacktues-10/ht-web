"use client";

import { PropsWithChildren, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Command } from "cmdk";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "~/app/components/ui/dialog";
import { Skeleton } from "~/app/components/ui/skeleton";

export function GitHubRepoDialog({ children }: PropsWithChildren<{}>) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        asChild
        onMouseEnter={() =>
          queryClient.ensureQueryData({
            queryKey: ["github-installations"],
          })
        }
      >
        {children}
      </DialogTrigger>
      <DialogContent className="w-[90vmin]">
        <GitHubDisabledContent />
      </DialogContent>
    </Dialog>
  );
}

function GitHubDisabledContent() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-center text-2xl font-semibold">
        GitHub интеграцията е изключена
      </h1>
      <p className="text-center text-muted-foreground">
        GitHub интеграцията е временно изключена от организатор. Моля, опитайте
        по-късно.
      </p>
    </div>
  );
}

function RepoListItem(props: {
  left: React.ReactNode;
  right: React.ReactNode;
  asItem?: boolean;
  value?: string;
}) {
  const Comp = props.asItem ? Command.Item : "div";
  return (
    <Comp
      className="flex items-center justify-between border-b p-4 last:border-none"
      value={props.value}
    >
      <div className="flex items-center gap-2">{props.left}</div>
      <div className="flex items-center">{props.right}</div>
    </Comp>
  );
}

export const RepoListItemSkeleton = () =>
  Array.from({ length: 4 }).map((_, i) => (
    <RepoListItem
      key={i}
      left={<Skeleton className="h-5 w-[250px]" />}
      right={<Skeleton className="h-9 w-[100px]" />}
    />
  ));
