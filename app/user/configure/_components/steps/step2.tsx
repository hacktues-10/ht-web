"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, LogOutIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ALUMNI_GRADES, PARALLELS } from "~/app/_elsys/grades-parallels";
import { SignOutButton } from "~/app/components/buttons";
import { Button, buttonVariants } from "~/app/components/ui/button";
import { Card, CardContent } from "~/app/components/ui/card";
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
import { cn } from "~/app/utils";
import { alumniStep2Schema } from "../../schemas";
import { StepButtons } from "../step-buttonts";

type AlumniStep2Data = z.infer<typeof alumniStep2Schema>;

// TODO: add more info about whats in the form in its name
export const AlumniStep2 = ({
  email,
  initialData,
  onNext,
  onPrev,
  className,
}: {
  email: string;
  initialData: Partial<AlumniStep2Data>;
  onNext: (data: AlumniStep2Data) => void;
  onPrev: () => void;
  className?: string;
}) => {
  const form = useForm<AlumniStep2Data>({
    resolver: zodResolver(alumniStep2Schema),
    defaultValues: initialData,
  });

  const canSubmit =
    form.formState.dirtyFields.grade && form.formState.dirtyFields.parallel;

  return (
    <section
      className={cn(
        "flex w-full max-w-xl flex-col items-center gap-2",
        className,
      )}
    >
      <h2 className="text-center text-2xl font-extrabold">
        Информация за завършил ученик
      </h2>
      <Card className="block w-full p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onNext)} className="space-y-3">
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Випуск</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value || "Избери випуск"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Търси випуск..." />
                        <CommandEmpty>Випускът не е намерен.</CommandEmpty>
                        <CommandGroup>
                          {ALUMNI_GRADES.toReversed().map((grade) => (
                            <CommandItem
                              value={grade}
                              key={grade}
                              onSelect={() => {
                                form.setValue("grade", grade, {
                                  shouldDirty: true,
                                });
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
              name="parallel"
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
                      {PARALLELS.map((parallel) => (
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
              left={
                <Button variant="secondary" onClick={onPrev} type="button">
                  Назад
                </Button>
              }
              right={
                <Button type="submit" disabled={!canSubmit}>
                  Продължи
                </Button>
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
