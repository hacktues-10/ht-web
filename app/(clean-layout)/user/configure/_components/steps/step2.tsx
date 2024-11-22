"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogOutIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  STUDENT_GRADES,
  STUDENT_PARALLELS
} from "~/app/_elsys/grades-parallels";
import { parseElsysEmail } from "~/app/_elsys/service";
import { SignOutButton } from "~/app/components/buttons";
import { Button } from "~/app/components/ui/button";
import { Card } from "~/app/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/components/ui/select";
import { cn } from "~/app/utils";
import { studentsStep2Schema } from "../../schemas";
import { NextStepButton, PrevStepButton, StepButtons } from "../step-buttonts";

type StudentStep2Data = z.infer<typeof studentsStep2Schema>;


export const StudentStep2 = ({
  email,
  defaultValues,
  initialData,
  onNext,
  onPrev,
  className,
}: {
  email: string;
  defaultValues: StudentStep2Data;
  initialData: Partial<StudentStep2Data>;
  onNext: (data: StudentStep2Data) => void;
  onPrev: () => void;
  className?: string;
}) => {
  const form = useForm<StudentStep2Data>({
    resolver: zodResolver(studentsStep2Schema),
    defaultValues: initialData,
  });

  useEffect(() => {
    form.reset(initialData);
    const gradeStr = parseElsysEmail(email)?.grade.toString();
    const grade = z.enum(STUDENT_GRADES).parse(gradeStr);
    if (grade && STUDENT_GRADES.includes(grade)) {
      form.setValue("grade", grade);
    }
  }, [initialData, form, email]);

  const canSubmit =
    form.watch("grade") != defaultValues.grade &&
    form.watch("parallel") != defaultValues.parallel;

  return (
    <section
      className={cn(
        "flex w-full max-w-xl flex-col items-center gap-2",
        className,
      )}
    >
      <h2 className="text-center text-2xl font-extrabold">
        Информация за настоящ ученик
      </h2>
      <Card className="block w-full p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onNext)} className="space-y-3">
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Клас</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger value={field.value}>
                        <SelectValue placeholder="Изберете паралелка" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {STUDENT_GRADES.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Класът, в който сте.</FormDescription>
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
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Изберете паралелка" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {STUDENT_PARALLELS.map((parallel) => (
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
