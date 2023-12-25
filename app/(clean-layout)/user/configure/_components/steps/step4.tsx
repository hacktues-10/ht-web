"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, LogOutIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SignOutButton } from "~/app/components/buttons";
import TechnologiesTab from "~/app/components/Technologies/technologiesContainer";
import { Button, buttonVariants } from "~/app/components/ui/button";
import { Card, CardContent } from "~/app/components/ui/card";
import { Checkbox } from "~/app/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/components/ui/form";
import {
  convertTechnologiesToText,
  convertToTechnology,
} from "~/app/technologies";
import { cn } from "~/app/utils";
import { everyoneStep4Schema } from "../../schemas";
import { NextStepButton, StepButtons } from "../step-buttonts";

type EveryoneStep4Data = z.infer<typeof everyoneStep4Schema>;

// TODO: add more info about whats in the form in its name
export const EveryoneStep4 = ({
  email,
  initialData,
  defaultValues,
  onNext,
  onPrev,
  className,
  isAlumni,
}: {
  email: string;
  initialData: Partial<EveryoneStep4Data>;
  defaultValues: EveryoneStep4Data;
  onNext: (data: EveryoneStep4Data) => void;
  onPrev: () => void;
  className?: string;
  isAlumni: boolean;
}) => {
  const form = useForm<EveryoneStep4Data>({
    resolver: zodResolver(everyoneStep4Schema),
    defaultValues: initialData,
  });

  const [technologies, setTechnolgoies] = useState(
    convertToTechnology(initialData.technologies ?? ""),
  );

  useEffect(() => {
    form.setValue("technologies", convertTechnologiesToText(technologies));
  }, [technologies, form]);

  useEffect(() => {
    setTechnolgoies(convertToTechnology(initialData.technologies ?? ""));
  }, [initialData]);

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form]);

  return (
    <section
      className={cn(
        "flex w-full max-w-xl flex-col items-center gap-2",
        className,
      )}
    >
      <h2 className="text-center text-2xl font-extrabold">
        Персонализирайте профила си!
      </h2>
      <Card className="block w-full p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
            <FormLabel>Кои технологии владеете?</FormLabel>
            <TechnologiesTab
              technologiesFromParent={technologies}
              setTechnolgoies={setTechnolgoies}
            ></TechnologiesTab>
            <FormDescription>Видими от всички потребители.</FormDescription>
            <FormField
              control={form.control}
              name="isLookingForTeam"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Търся си отбор</FormLabel>
                    <FormDescription>
                      Други участници ще могат да ви канят в своите отбори.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <StepButtons
              left={
                <Button variant="secondary" onClick={onPrev} type="button">
                  Назад
                </Button>
              }
              right={
                <NextStepButton
                  isLoading={form.formState.isSubmitting}
                  isLastStep={!isAlumni}
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
