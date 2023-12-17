"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import invariant from "tiny-invariant";

import { Button } from "~/app/components/ui/button";
import { Card } from "~/app/components/ui/card";
import { Input } from "~/app/components/ui/input";
import { Textarea } from "~/app/components/ui/textarea";
import { useToast } from "~/app/components/ui/use-toast";
import { checkUserCanCreateTeam, createTeamAction } from "./actions";

export function CreateTeamForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target;
    invariant(form instanceof HTMLFormElement);
    const formData = new FormData(form);

    const name = formData.get("name");
    const description = formData.get("description");

    if (!name || typeof name !== "string" || typeof description !== "string") {
      return;
    }

    const res = await createTeamAction({ name, description });
    if (res.success) {
      router.push(`/teams/${res.team.id}`);
    } else {
      toast({
        title: "Неуспешен опит",
        description: res.error,
      });
    }
  }

  useEffect(() => {
    async function checkUserTeam() {
      const { isEligableToCreateTeam } = await checkUserCanCreateTeam();
      if (!isEligableToCreateTeam) {
        toast({
          title: "Не можете да създадете отбор",
          description:
            "Моля, ако мислите, че има грешка, свържете се с hacktues@elsys-bg.org",
        });
        setButtonDisabled(true);
      } else {
        setButtonDisabled(false);
      }
    }

    const caller = async () => {
      await checkUserTeam();
    };
    caller();
  }, []);

  return (
    <Card>
      <form
        className="mx-auto flex max-w-md flex-col gap-2 rounded-l p-4 shadow-md"
        onSubmit={handleSubmit}
      >
        <h1 className="py-3 text-center text-3xl font-bold">
          Създай нов отбор
        </h1>
        <Input
          type="text"
          name="name"
          placeholder="Име на отбора"
          className="mb-2 w-full"
          required
        />
        <Textarea
          name="description"
          placeholder="Описание на отбора"
          className="mb-2 w-full "
        />
        <Button
          type="submit"
          disabled={isButtonDisabled}
          className="w-auto rounded"
        >
          Създай отбор
        </Button>
      </form>
    </Card>
  );
}
