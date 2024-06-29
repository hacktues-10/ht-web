"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { useHTFeatureIsOn } from "~/app/_context/growthbook/utils";
import { GitHubRepoDialog } from "~/app/_integrations/github/components";
import { ErrorMessage } from "~/app/components/error-message";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/app/components/ui/alert-dialog";
import { Button } from "~/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/app/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/components/ui/form";
import { Input } from "~/app/components/ui/input";
import { Textarea } from "~/app/components/ui/textarea";
import { useToast } from "~/app/components/ui/use-toast";
import {
  UpdateFallbackGitHubReposInput,
  updateFallbackGitHubReposSchema,
  UpdateProjectInput,
  updateProjectSchema,
  UpdateWebsiteUrlInput,
  updateWebsiteUrlSchema,
} from "./schemas";

export function UpdateProjectDialog({
  children,
  teamId,
  name,
  description,
}: React.PropsWithChildren<{
  teamId: string;
  name: string;
  description: string;
}>) {
  const [open, setOpen] = useState(false);
  const [discardConfirmOpen, setDiscardConfirmOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      teamId,
      name,
      description,
    },
  });

  const { toast } = useToast();

  const updateProjectMutation = useMutation({
    mutationFn: async (data: UpdateProjectInput) => {
      throw new Error("its static version of the site sowwy");
    },
    onSuccess: () => {
      toast({
        title: "Промените са запазени",
        description: "Успешно обновихте проекта",
      });
    },
    onError: (error) => {
      toast({
        title: "Редакциите не бяха запазени",
        description: error.message,
      });
    },
  });

  async function handleSubmit(data: UpdateProjectInput) {
    await updateProjectMutation.mutateAsync(data);
    form.reset(
      {
        teamId: data.teamId,
        name: data.name,
        description: data.description,
      },
      {
        keepDirty: false,
      },
    );
    setOpen(false);
  }

  function handleOpenChange(open: boolean) {
    if (!open && form.formState.isDirty) {
      setDiscardConfirmOpen(true);
    } else {
      setOpen(open);
    }
  }

  function handleConfirmDiscard() {
    form.reset(
      {
        teamId,
        name,
        description,
      },
      {
        keepDirty: false,
      },
    );
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DiscordConfirmationDialog
          open={discardConfirmOpen}
          onOpenChange={setDiscardConfirmOpen}
          onConfirm={handleConfirmDiscard}
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Проект</DialogTitle>
              <DialogDescription>
                Редактирайте името и описанието на Вашия проект.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Име</FormLabel>
                    <FormControl>
                      <Input placeholder="Име" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Описание</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Описанието на вашия проект..."
                        rows={10} //  ДЕСЕТОТО ЮБИЛЕЙНО ИЗДАНИЕ!!!
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={
                  form.formState.isSubmitting || !form.formState.isDirty
                }
              >
                Запази
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function DiscordConfirmationDialog({
  open,
  onOpenChange,
  children,
  onConfirm,
}: React.PropsWithChildren<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}>) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Имате незапазени промени</AlertDialogTitle>
          <AlertDialogDescription>
            Сигурни ли сте, че искате да отхвърлите Вашите редакции?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Назад</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Отхвърли промените
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function UpdateWebsiteUrlDialog({
  children,
  websiteUrl,
  teamId,
}: React.PropsWithChildren<{ websiteUrl?: string; teamId: string }>) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(updateWebsiteUrlSchema),
    defaultValues: {
      websiteUrl: websiteUrl,
      teamId,
    },
  });

  const { toast } = useToast();

  const updateWebsiteUrlMutation = useMutation({
    mutationFn: async (data: UpdateWebsiteUrlInput) => {
      throw new Error("its static version of the site sowwy");
    },
    onSuccess: () => {
      toast({
        title: "Промените са запазени",
        description: "Успешно обновихте линка към демото",
      });
    },
    onError: (error) => {
      toast({
        title: "Промените не бяха запазени",
        description: error.message,
      });
    },
  });

  async function handleSubmit(data: UpdateWebsiteUrlInput) {
    await updateWebsiteUrlMutation.mutateAsync(data);
    form.reset(
      {
        teamId: data.teamId,
        websiteUrl: data.websiteUrl,
      },
      {
        keepDirty: false,
      },
    );
    form.setValue("websiteUrl", data.websiteUrl, {
      shouldDirty: false,
      shouldTouch: false,
    });
    setOpen(false);
  }

  const willDelete = !form.watch("websiteUrl");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Линк към демо</DialogTitle>
              <DialogDescription>
                Връзка към хостната версия или видео демонстрация на Вашия
                проект.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Линк</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://demo.hacktues.bg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <WebsiteUrlConfirmationDialog
                willDelete={willDelete}
                onClick={form.handleSubmit(handleSubmit)}
              >
                <Button
                  type={willDelete ? "button" : "submit"}
                  disabled={
                    form.formState.isSubmitting || !form.formState.isDirty
                  }
                >
                  Запази
                </Button>
              </WebsiteUrlConfirmationDialog>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function WebsiteUrlConfirmationDialog({
  children,
  willDelete,
  onClick,
}: React.PropsWithChildren<{ willDelete: boolean; onClick: () => void }>) {
  if (!willDelete) {
    return children;
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Сигурни ли сте?</AlertDialogTitle>
          <AlertDialogDescription>
            Наистина ли искате да премахнете линка към демото на Вашия проект?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Назад</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>
            Преманхи линка
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function UpdateFallbackReposDialog(
  props: React.PropsWithChildren<{
    teamId: string;
    fallbackGitHubRepos: string;
  }>,
) {
  const canAddGitHubRepos = useHTFeatureIsOn("add-github-repos");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(updateFallbackGitHubReposSchema),
    defaultValues: {
      teamId: props.teamId,
      fallbackGitHubRepos: props.fallbackGitHubRepos,
    },
  });

  const { toast } = useToast();

  const updateFallbackReposMutation = useMutation({
    mutationFn: async (data: UpdateFallbackGitHubReposInput) => {
      throw new Error("its static version of the site sowwy");
    },
    onSuccess: () => {
      toast({
        title: "Промените са запазени",
        description: "Успешно редактирахте хранилищата",
      });
    },
    onError: (error) => {
      toast({
        title: "Промените не бяха запазени",
        description: error.message,
      });
    },
  });

  if (canAddGitHubRepos) {
    return <GitHubRepoDialog>{props.children}</GitHubRepoDialog>;
  }

  async function handleSubmit(data: UpdateFallbackGitHubReposInput) {
    await updateFallbackReposMutation.mutateAsync(data);
    form.reset(
      {
        teamId: data.teamId,
        fallbackGitHubRepos: data.fallbackGitHubRepos,
      },
      {
        keepDirty: false,
      },
    );
    setOpen(false);
  }

  function handleOpenChange(open: boolean) {
    if (!open && form.formState.isDirty) {
      setConfirmOpen(true);
    } else {
      setOpen(open);
    }
  }

  function handleConfirmDiscard() {
    form.reset(
      {
        teamId: props.teamId,
        fallbackGitHubRepos: props.fallbackGitHubRepos,
      },
      {
        keepDirty: false,
      },
    );
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DiscordConfirmationDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          onConfirm={handleConfirmDiscard}
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data: any) =>
              handleSubmit({
                ...data,
                fallbackGitHubRepos: (
                  data.fallbackGitHubRepos as any as string[]
                ).join("\n"),
              }),
            )}
          >
            <DialogHeader>
              <DialogTitle>GitHub хранилища</DialogTitle>
              <div className="py-3">
                <ErrorMessage>
                  Поради техническа неизправност, интеграцията с GitHub е
                  временно спряна. Моля, използвайте това поле, за да въведете
                  хранилищата ръчно.
                </ErrorMessage>
              </div>
            </DialogHeader>
            <div className="py-4">
              <FormField
                control={form.control}
                name="fallbackGitHubRepos"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>GitHub хранилища</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={[
                          "https://github.com/torvalds/linux",
                          "https://github.com/git/git",
                        ].join("\n")}
                        rows={10}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Линкове към GitHub хранилища, разделени с нов ред.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={
                  form.formState.isSubmitting || !form.formState.isDirty
                }
              >
                Запази
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
