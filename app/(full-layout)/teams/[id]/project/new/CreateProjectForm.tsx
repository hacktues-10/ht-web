"use client";

import { useRouter } from "next/navigation";
import invariant from "tiny-invariant";

import { Button } from "~/app/components/ui/button";
import { Card } from "~/app/components/ui/card";
import { Input } from "~/app/components/ui/input";
import { Textarea } from "~/app/components/ui/textarea";
import { useToast } from "~/app/components/ui/use-toast";
import { createProject } from "../../../actions";

export default function CreateProjectFrom({ teamId }: { teamId: string }) {
  const router = useRouter();
  const { toast } = useToast();

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
        <h1 className="py-3 text-center text-3xl font-bold">
          Създай нов проект
        </h1>
        <Input
          type="text"
          name="name"
          placeholder="Име на проекта"
          className="mb-2 w-full"
          required
        />
        <Textarea
          name="description"
          placeholder="Описание на проекта"
          className="mb-2 w-full"
        />
        <Input
          type="text"
          name="websiteURL"
          placeholder="Линк към github repository"
          className="mb-2 w-full"
          required
        />
        <Button type="submit" className="w-auto rounded">
          Създай проект
        </Button>
      </form>
    </Card>
  );
}
