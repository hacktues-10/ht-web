"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LogOutIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SignOutButton } from "~/app/components/buttons";
import { Button, buttonVariants } from "~/app/components/ui/button";
import { Card, CardContent } from "~/app/components/ui/card";
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
import { alumniStep1Schema } from "../../schemas";
import { StepButtons } from "../step-buttonts";

type AlumniStep1Data = z.infer<typeof alumniStep1Schema>;

export const AlumniStep1 = ({
  email,
  initialData,
  onNext,
}: {
  email: string;
  initialData: Partial<AlumniStep1Data>;
  onNext: (data: AlumniStep1Data) => void;
}) => {
  const form = useForm<AlumniStep1Data>({
    resolver: zodResolver(alumniStep1Schema),
    defaultValues: initialData,
  });

  const canSubmit =
    form.formState.dirtyFields.firstName &&
    form.formState.dirtyFields.secondName &&
    form.formState.dirtyFields.lastName &&
    form.formState.dirtyFields.phoneNumber &&
    form.formState.dirtyFields.isAlumni &&
    form.formState.dirtyFields.regulationAgreement;

  return (
    <section className="flex flex-col gap-2">
      <h1 className="text-center text-3xl font-extrabold">
        Регистрация на завършил
      </h1>
      <Step1Header email={email} />
      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onNext)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Име</FormLabel>
                  <FormControl>
                    <Input placeholder="Туесар" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secondName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Презиме</FormLabel>
                  <FormControl>
                    <Input placeholder="Туесаров" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Фамилия</FormLabel>
                  <FormControl>
                    <Input placeholder="Туесаров" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Телефонен номер</FormLabel>
                  <FormControl>
                    <Input placeholder="+359" {...field} />
                  </FormControl>
                  <FormDescription>
                    Ще се използва за връзка с вас.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <StepButtons
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
