"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "lucide-react";
import { useForm } from "react-hook-form";
import invariant from "tiny-invariant";

import { EVENT_END } from "~/app/_configs/hackathon";
import { useHTFeatureIsOn } from "~/app/_context/growthbook/utils";
import { IfHTFeatureOff, IfHTFeatureOn } from "~/app/_integrations/components";
import { IfDateInFuture, IfDateInPast } from "~/app/components/countdowns";
import { Button } from "~/app/components/ui/button";
import { Card } from "~/app/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/components/ui/form";
import { Input } from "~/app/components/ui/input";
import { Textarea } from "~/app/components/ui/textarea";
import { useToast } from "~/app/components/ui/use-toast";
import { cn } from "~/app/utils";
import { createProject } from "../../../actions";
import {
  FeatureDisabledHeading,
  FeatureDisabledOverlay,
} from "../../../new/CreateTeamForm";
import { CreateProjectInput, createProjectSchema } from "../schemas";

export default function CreateProjectFrom({ teamId }: { teamId: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const canCreateProject = useHTFeatureIsOn("create-project");

  const form = useForm({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      teamId,
      name: "",
      description: "",
    },
  });

  async function handleSubmit(input: CreateProjectInput) {
    const res = await createProject(input);
    if (res.success) {
      router.replace(`/teams/${teamId}`);
    } else {
      toast({
        title: "Неуспешен опит",
        description: res.message,
      });
    }
  }
  return (
    <Card>
      <Form {...form}>
        <form
          className="mx-auto flex max-w-md flex-col gap-2 rounded-l p-4 shadow-md"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <h1
            className={cn(
              "py-3 text-center text-3xl font-bold",
              !canCreateProject && "text-muted-foreground",
            )}
          >
            Създай нов проект
          </h1>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Име на проекта</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Име на проекта"
                    className="mb-2 w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Описание на проекта</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Описание на проекта"
                    className="mb-2 w-full"
                    rows={10}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-3" />
          <Button
            type="submit"
            className="w-auto"
            disabled={!canCreateProject || form.formState.isSubmitting}
          >
            Създай проект
          </Button>
          <IfHTFeatureOff feature="create-project">
            <FeatureDisabledOverlay>
              <FeatureDisabledHeading>
                <IfDateInFuture date={EVENT_END}>Има време...</IfDateInFuture>
                <IfDateInPast date={EVENT_END}>Твърде късно!</IfDateInPast>
              </FeatureDisabledHeading>
              <p className="text-center">
                Създаването на проекти е затворено в момента.
              </p>
            </FeatureDisabledOverlay>
          </IfHTFeatureOff>
        </form>
      </Form>
    </Card>
  );
}
