"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import invariant from "tiny-invariant";

import { useHTFeatureIsOn } from "~/app/_context/growthbook/utils";
import { IfHTFeatureOff, IfHTFeatureOn } from "~/app/_integrations/components";
import { OverlayContainer } from "~/app/(clean-layout)/_components/countdown-overlay";
import { Button } from "~/app/components/ui/button";
import { Card } from "~/app/components/ui/card";
import { Input } from "~/app/components/ui/input";
import { Textarea } from "~/app/components/ui/textarea";
import { useToast } from "~/app/components/ui/use-toast";
import { checkUserCanCreateTeam, createTeamAction } from "./actions";

export function CreateTeamForm() {
  const router = useRouter();
  const { toast } = useToast();
  const canCreateTeam = useHTFeatureIsOn("create-team");
  const [isEligible, setIsEligible] = useState(true);

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

  const checkUserTeam = useCallback(async () => {
    const { isEligableToCreateTeam } = await checkUserCanCreateTeam();
    if (!isEligableToCreateTeam && isEligible) {
      toast({
        title: "Не можете да създадете отбор",
        description: canCreateTeam ? (
          <>
            Моля, ако мислите, че има грешка, свържете се с нас на адрес{" "}
            <Link className="underline" href="mailto:hacktues@elsys-bg.org">
              hacktues@elsys-bg.org
            </Link>
          </>
        ) : (
          <>Създаването на отбори е затворено в момента.</>
        ),
      });
      setIsEligible(false);
    } else {
      setIsEligible(true);
    }
  }, [toast, canCreateTeam]);

  useEffect(() => {
    checkUserTeam();
  }, [checkUserTeam]);

  const isDisabled = !canCreateTeam || !isEligible;

  return (
    <Card>
      <form
        className="relative mx-auto flex max-w-md flex-col gap-2 rounded-l p-4 shadow-md"
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
          disabled={isDisabled}
        />
        <Textarea
          name="description"
          placeholder="Описание на отбора"
          className="mb-2 w-full "
          disabled={isDisabled}
        />
        <Button
          type="submit"
          disabled={isDisabled}
          className="-z-1 w-auto"
          variant={!isDisabled ? "default" : "secondary"}
        >
          Създай отбор
        </Button>
        <IfHTFeatureOff feature="create-team">
          <FeatureDisabledOverlay>
            <FeatureDisabledHeading>
              Създаването на отбори е затворено
            </FeatureDisabledHeading>
            <IfHTFeatureOn feature="update-team-members">
              <p className="text-center">
                Все още можете да се присъедините към съществуващ отбор.
              </p>
              <Button variant="secondary" asChild>
                <Link href="/teams">Разгледайте отборите!</Link>
              </Button>
            </IfHTFeatureOn>
          </FeatureDisabledOverlay>
        </IfHTFeatureOff>
      </form>
    </Card>
  );
}

export const FeatureDisabledOverlay = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <OverlayContainer className="bg-background/90">
    <div className="flex flex-col gap-4 p-6">{children}</div>
  </OverlayContainer>
);

export const FeatureDisabledHeading = ({
  children,
}: {
  children: React.ReactNode;
}) => <h1 className="text-center text-2xl font-bold">{children}</h1>;
