"use client";

import { useEffect, useRef, useState } from "react";
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
import { Button } from "~/app/components/ui/button";
import { Card } from "~/app/components/ui/card";
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
import { cn } from "~/app/utils";
import { alumniStep2Schema } from "../../schemas";
import { NextStepButton, PrevStepButton, StepButtons } from "../step-buttonts";

type AlumniStep2Data = z.infer<typeof alumniStep2Schema>;

// TODO: add more info about whats in the form in its name
export const AlumniStep2 = ({
  email,
  initialData,
  currentStep,
  onNext,
  onPrev,
  className,
}: {
  email: string;
  initialData: Partial<AlumniStep2Data>;
  onNext: (data: AlumniStep2Data) => void;
  currentStep: number;
  onPrev: () => void;
  className?: string;
}) => {
  const form = useForm<AlumniStep2Data>({
    resolver: zodResolver(alumniStep2Schema),
    defaultValues: initialData,
  });

  const canSubmit =
    form.formState.dirtyFields.class?.grade &&
    form.formState.dirtyFields.class?.parallel;
  const [popoverWidth, setPopoverWidth] = useState(96);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updatePopoverWidth = () => {
      if (buttonRef.current) {
        const buttonWidth = buttonRef.current.getBoundingClientRect().width;
        setPopoverWidth(buttonWidth);
      }
    };
    const handleResize = () => {
      updatePopoverWidth();
    };
    window.addEventListener("resize", handleResize);
    updatePopoverWidth();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentStep]);

  return (
    <section
      className={cn(
        "flex w-full max-w-xl flex-col items-center gap-2",
        className,
      )}
    >
      <h2 className="text-center text-2xl font-extrabold">
        Информация за завършил ТУЕС-ар
      </h2>
      <Card className="block w-full p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onNext)} className="space-y-3">
            <FormField
              control={form.control}
              name="class.grade"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Випуск</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn("w-full justify-between")}
                          ref={buttonRef} // Set a ref to the Button component
                        >
                          {field.value || "Избери випуск"}
                          <ChevronsUpDown className="ml-2 h-4 w-2 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      style={{ width: popoverWidth }}
                      className={"p-0"}
                    >
                      <Command>
                        <CommandInput placeholder="Търси випуск..." />
                        <CommandEmpty>Випускът не е намерен.</CommandEmpty>
                        <CommandGroup className="max-h-[160px] overflow-y-auto">
                          {ALUMNI_GRADES.toReversed().map((grade) => (
                            <CommandItem
                              className="hover:bg-secondary/10"
                              value={grade}
                              key={grade}
                              onSelect={() => {
                                form.setValue("class.grade", grade, {
                                  shouldDirty: true,
                                });
                                const escapeEvent = new KeyboardEvent(
                                  "keydown",
                                  {
                                    key: "Escape",
                                    bubbles: true,
                                    cancelable: true,
                                  },
                                );
                                document.dispatchEvent(escapeEvent);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  grade === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {grade}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Випускът, в който сте завършили.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="class.parallel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Паралелка</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Изберете паралелка" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {(EXTENDED_ALUMNI_GRADES.includes(
                        form.watch("class.grade") as any,
                      )
                        ? ALUMNI_PARALLELS
                        : REGULAR_ALUMNI_PARALLELS
                      ).map((parallel) => (
                        <SelectItem key={parallel} value={parallel}>
                          {parallel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

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
