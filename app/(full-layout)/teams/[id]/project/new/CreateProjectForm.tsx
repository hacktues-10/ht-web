"use client";

import { useRouter } from "next/navigation";
import { Link } from "lucide-react";
import invariant from "tiny-invariant";

import { EVENT_END } from "~/app/_configs/hackathon";
import { useHTFeatureIsOn } from "~/app/_context/growthbook/utils";
import { IfHTFeatureOn } from "~/app/_integrations/components";
import { IfDateInFuture, IfDateInPast } from "~/app/components/countdowns";
import { Button } from "~/app/components/ui/button";
import { Card } from "~/app/components/ui/card";
import { Input } from "~/app/components/ui/input";
import { Textarea } from "~/app/components/ui/textarea";
import { useToast } from "~/app/components/ui/use-toast";
import { cn } from "~/app/utils";
import { createProject } from "../../../actions";
import {
  FeatureDisabledHeading,
  FeatureDisabledOverlay,
} from "../../../new/CreateTeamForm";

export default function CreateProjectFrom({ teamId }: { teamId: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const canCreateProject = useHTFeatureIsOn("create-project");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target;
    invariant(form instanceof HTMLFormElement);
    const formData = new FormData(form);
    const name = formData.get("name");
    const description = formData.get("description");
    const websiteURL = formData.get("websiteURL");

    if (
      !name ||
      typeof name !== "string" ||
      typeof description !== "string" ||
      typeof websiteURL !== "string" ||
      !description ||
      !websiteURL
    ) {
      return;
    }

    const res = await createProject({ name, description, websiteURL, teamId });
    if (res.success) {
      router.push(`/teams/${teamId}`);
    } else {
      toast({
        title: "Неуспешен опит",
        description: res.message,
      });
    }
  }
  return (
    <Card>
      <form
        className="mx-auto flex max-w-md flex-col gap-2 rounded-l p-4 shadow-md"
        onSubmit={handleSubmit}
      >
        <h1
          className={cn(
            "py-3 text-center text-3xl font-bold",
            !canCreateProject && "text-muted-foreground",
          )}
        >
          Създай нов проект
        </h1>
        <Input
          type="text"
          name="name"
          placeholder="Име на проекта"
          className="mb-2 w-full"
          required
          disabled={!canCreateProject}
        />
        <Textarea
          name="description"
          placeholder="Описание на проекта"
          className="mb-2 w-full"
          disabled={!canCreateProject}
        />
        <Input
          type="text"
          name="websiteURL"
          placeholder="Линк към github repository"
          className="mb-2 w-full"
          required
          disabled={!canCreateProject}
        />
        <Button
          type="submit"
          className="w-auto rounded"
          disabled={!canCreateProject}
        >
          Създай проект
        </Button>
        <FeatureDisabledOverlay>
          <FeatureDisabledHeading>
            <IfDateInFuture date={EVENT_END}>Има време...</IfDateInFuture>
            <IfDateInPast date={EVENT_END}>Твърде късно!</IfDateInPast>
          </FeatureDisabledHeading>
          <p className="text-center">
            Създаването на проекти е затворено в момента.
          </p>
        </FeatureDisabledOverlay>
      </form>
    </Card>
  );
}
