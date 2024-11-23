"use client";

import { useEffect } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogOutIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { HT_EDITION_NAME } from "~/app/_configs/hackathon";
import { SignOutButton } from "~/app/components/buttons";
import { Button } from "~/app/components/ui/button";
import { Card } from "~/app/components/ui/card";
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
import { Input } from "~/app/components/ui/input";
import { cn } from "~/app/utils";
import { studentsStep1Schema } from "../../schemas";
import { NextStepButton, StepButtons } from "../step-buttonts";

type StudentStep1Data = z.infer<typeof studentsStep1Schema>;

export const StudentStep1 = ({
  email,
  defaultValues,
  initialData,
  onNext,
  className,
}: {
  email: string;
  initialData: Partial<StudentStep1Data>;
  defaultValues: StudentStep1Data;
  onNext: (data: StudentStep1Data) => void;
  onPrev: () => void;
  className?: string;
}) => {
  const form = useForm<StudentStep1Data>({
    resolver: zodResolver(studentsStep1Schema),
    defaultValues: initialData,
  });

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form]);

  const canSubmit =
    form.watch("firstName") != defaultValues.firstName &&
    form.watch("lastName") != defaultValues.lastName &&
    form.watch("phoneNumber") != defaultValues.phoneNumber &&
    form.watch("regulationAgreement") != defaultValues.regulationAgreement &&
    form.watch("personalDataConsent") != defaultValues.personalDataConsent &&
    form.watch("publicDataConsent") != defaultValues.publicDataConsent;

  return (
    <section
      className={cn(
        "flex w-full max-w-xl flex-col items-center gap-2",
        className,
      )}
    >
      <h1 className="text-center text-3xl font-extrabold">
        Регистрация на настоящ ученик
      </h1>
      <LoggedInAsChip email={email} />
      <Card className="block w-full p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onNext)} className="space-y-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Име</FormLabel>
                  <FormControl>
                    <Input placeholder="Туесар" {...field} />
                  </FormControl>
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

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Мобилен телефонен номер</FormLabel>
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
            <FormField
              control={form.control}
              name="regulationAgreement"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Съгласен/а съм с{" "}
                      <Link
                        href="/regulation"
                        className="font-medium underline underline-offset-4"
                        target="_blank"
                      >
                        регламента на ${HT_EDITION_NAME}
                      </Link>
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <div className="space-y-3 rounded-md border p-4">
              <FormField
                control={form.control}
                name="personalDataConsent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Съгласен/а съм името ми, телефонът ми и логистичната ми
                        информация да се съхранява и обработва само и единствено
                        от организационния екип на ${HT_EDITION_NAME}
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="publicDataConsent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Съгласен/а съм името и фамилията ми да бъдат публикувани
                        на сайта и социалните мрежи на ${HT_EDITION_NAME}
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <StepButtons
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

// FIXME: maybe move this to a separate file? (it's used in 2 places)
export function LoggedInAsChip({ email }: { email: string }) {
  return (
    <div className="p-6 text-center">
      <p className="text-muted-foreground">
        Влезли сте с<br />
        <span className="font-semibold">{email}</span>.
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
