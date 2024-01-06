"use client";

import { useEffect } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, LogOutIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  ALUMNI_GRADES,
  ALUMNI_PARALLELS,
  EXTENDED_ALUMNI_GRADES,
  EXTENDED_ALUMNI_PARALLELS,
  REGULAR_ALUMNI_PARALLELS,
} from "~/app/_elsys/grades-parallels";
import { SignOutButton } from "~/app/components/buttons";
import { HTLogo } from "~/app/components/logos";
import { Button, buttonVariants } from "~/app/components/ui/button";
import { Card, CardDescription } from "~/app/components/ui/card";
import { Checkbox } from "~/app/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/app/components/ui/command";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/app/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/components/ui/select";
import { Textarea } from "~/app/components/ui/textarea";
import { cn } from "~/app/utils";
import { alumniStep5Schema } from "../../schemas";
import { NextStepButton, PrevStepButton, StepButtons } from "../step-buttonts";

type AlumniStep5Data = z.infer<typeof alumniStep5Schema>;

// TODO: add more info about whats in the form in its name
export const AlumniStep5 = ({
  email,
  initialData,
  defaultValues,
  onNext,
  onPrev,
  className,
  isAlumni,
}: {
  email: string;
  initialData: Partial<AlumniStep5Data>;
  defaultValues: AlumniStep5Data;
  onNext: (data: AlumniStep5Data) => void;
  onPrev: () => void;
  className?: string;
  isAlumni: boolean;
}) => {
  const form = useForm<AlumniStep5Data>({
    resolver: zodResolver(alumniStep5Schema),
    defaultValues: initialData,
  });

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
        <CardDescription className="mb-5 text-center">
          За да направим Hack TUES X едно незабравимо преживяване за всички,
          имаме нужда да разберем малко повече за теб.
        </CardDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
            <FormField
              control={form.control}
              name="question1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Какви са вашите хобита и интереси извън ИТ сферата?
                  </FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="question2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Коя е любимата ви тема или подтема от всички изминали
                    издания на{" "}
                    <HTLogo className="text-inherit">Hack&nbsp;TUES</HTLogo>?
                  </FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <StepButtons
              left={<PrevStepButton onClick={onPrev} />}
              right={
                // TODO: maybe add a loading state and extract the button to a component
                <NextStepButton
                  isLoading={form.formState.isSubmitting}
                  disabled={!form.formState.isValid}
                  isLastStep={true}
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
