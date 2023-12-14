"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogOutIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SignOutButton } from "~/app/components/buttons";
import { Button } from "~/app/components/ui/button";
import { Card } from "~/app/components/ui/card";
import { Checkbox } from "~/app/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/components/ui/select";
import { Separator } from "~/app/components/ui/separator";
import { Textarea } from "~/app/components/ui/textarea";
import { cn } from "~/app/utils";
import { everyoneStep3Schema } from "../../schemas";
import { NextStepButton, PrevStepButton, StepButtons } from "../step-buttonts";

type EveryoneStep3Data = z.infer<typeof everyoneStep3Schema>;

const TSHIRTS = [
  {
    id: 1,
    size: "XS",
  },
  {
    id: 2,
    size: "S",
  },
  {
    id: 3,
    size: "M",
  },
  {
    id: 4,
    size: "L",
  },
  {
    id: 5,
    size: "XL",
  },
] as const;

// TODO: add more info about whats in the form in its name
export const EveryoneStep3 = ({
  email,
  initialData,
  onNext,
  onPrev,
  className,
}: {
  email: string;
  initialData: Partial<EveryoneStep3Data>;
  onNext: (data: EveryoneStep3Data) => void;
  onPrev: () => void;
  className?: string;
}) => {
  const [willInputAllergies, setWillInputAllergies] = useState(false);
  const form = useForm<EveryoneStep3Data>({
    resolver: zodResolver(everyoneStep3Schema),
    defaultValues: initialData,
  });

  const canSubmit =
    form.formState.dirtyFields.tShirtId &&
    (!willInputAllergies || form.formState.dirtyFields.allergies);

  return (
    <section
      className={cn(
        "flex w-full max-w-xl flex-col items-center gap-2",
        className,
      )}
    >
      <h2 className="text-center text-4xl font-extrabold">Вашите подаръци</h2>
      <Card className="block w-full p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              onNext({
                ...data,
                allergies: willInputAllergies ? data.allergies : undefined,
              }),
            )}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="tShirtId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Размер на тениска</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    // FIXME: to show placeholder
                    // defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Изберете размер на тениска" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TSHIRTS.map((tShirt) => (
                        <SelectItem
                          key={tShirt.id}
                          value={tShirt.id.toString()}
                        >
                          {tShirt.size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={willInputAllergies}
                  onCheckedChange={() =>
                    setWillInputAllergies(
                      (willInputAllergies) => !willInputAllergies,
                    )
                  }
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Алергии или хранителни ограничения</FormLabel>
                {/* <FormDescription>
                  You can manage your mobile notifications in the...
                </FormDescription> */}
              </div>
            </FormItem>

            {willInputAllergies && (
              <FormField
                control={form.control}
                name="allergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Алергии и хранителни ограничения</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Мляко, яйца, ядки..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>
                      You can <span>@mention</span> other users and
                      organizations.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <StepButtons
              left={<PrevStepButton onClick={onPrev} />}
              right={
                <NextStepButton
                  disabled={!canSubmit}
                  isLoading={form.formState.isSubmitting}
                />
              }
            />
          </form>
        </Form>
      </Card>
    </section>
  );
};

function Step1Header({ email }: { email: string }) {
  return (
    <div className="p-6 text-center">
      <p className="text-muted-foreground">
        Влезли сте като <span className="font-semibold underline">{email}</span>
        .
      </p>
      <div className="py-1" />
      <Button asChild variant="destructive" className="gap-2" size="sm">
        <SignOutButton>
          <LogOutIcon className="h-4 w-4" /> Изход
        </SignOutButton>
      </Button>
    </div>
  );
}
