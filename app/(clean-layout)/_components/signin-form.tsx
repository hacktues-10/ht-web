"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { XOctagon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useHTFeatureIsOn } from "~/app/_context/growthbook/utils";
import { parseElsysEmail } from "~/app/_elsys/service";
import { Button } from "~/app/components/ui/button";
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

const signInSchema = z.object({
  email: z.string({ required_error: "Празен имейл адрес" }).email({
    message: "Невалиден имейл адрес",
  }),
});

export const SignInForm = (props: { isRegister: boolean }) => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });
  const canSignInAlumni = useHTFeatureIsOn("signin-alumni");
  const canSignInStudents = useHTFeatureIsOn("signin-students");
  const canRegisterAlumni = useHTFeatureIsOn("register-alumni");
  const canRegisterStudents = useHTFeatureIsOn("register-students");

  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const shouldBeInactive =
    props.isRegister && !canSignInAlumni && !canSignInStudents;

  useEffect(() => {
    if (error) {
      form.setError("root", {
        message: signinErrors[error] ?? signinErrors.Default,
      });
    }
  }, [error, form]);

  const handleSubmit = form.handleSubmit((credentials) => {
    if (props.isRegister) {
      const elsysEmail = parseElsysEmail(credentials.email);
      if (!canRegisterAlumni && (!elsysEmail || elsysEmail.isAlumni)) {
        return form.setError("email", {
          message: "Този имейл адрес не е на настоящ ученик",
        });
      }
      // if (!canRegisterStudents && elsysEmail && !elsysEmail.isAlumni) {
      //   return form.setError("email", {
      //     message: "Невалиден имейл адрес на завършил ученик",
      //   });
      // }
    }

    // TODO: use redirect: false
    return signIn("email", {
      ...credentials,
      callbackUrl: searchParams.get("callbackUrl") ?? undefined,
    });
  });

  return (
    <Form {...form}>
      <form method="post" onSubmit={handleSubmit} className="space-y-4">
        {!!form.formState.errors.root && (
          <div className="flex items-center justify-center gap-2 rounded-sm border border-destructive bg-destructive/10 p-3 text-destructive">
            <XOctagon className="h-4 w-4 shrink-0" />
            <p className="max-w-full text-center text-sm font-semibold">
              {form.formState.errors.root.message}
            </p>
          </div>
        )}
        <FormField
          control={form.control}
          name="email"
          disabled={shouldBeInactive}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {props.isRegister && !canRegisterAlumni
                  ? "Ученически имейл"
                  : "Имейл aдрес"}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    canSignInStudents
                      ? "tuesar.t.tuesarov.2024@elsys-bg.org"
                      : "tuesar@gmail.com"
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
              {props.isRegister &&
                !canRegisterAlumni &&
                canRegisterStudents && (
                  <FormDescription>
                    Вашият служебен имейл адрес, който използвате за достъп до
                    Google Classroom.
                  </FormDescription>
                )}
            </FormItem>
          )}
        />
        <div className="flex flex-row-reverse">
          <Button
            type="submit"
            className="flex-1 sm:flex-initial"
            variant={!shouldBeInactive ? "default" : "secondary"}
            disabled={
              form.formState.isSubmitting ||
              (form.formState.isSubmitted &&
                !form.formState.isSubmitSuccessful &&
                !form.formState.isValid) ||
              shouldBeInactive
            }
          >
            {props.isRegister || error ? "Напред" : "Вход"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

const signinErrors: Record<string, string> = {
  Default: "Възникна грешка при влизането. Моля, опитайте по-късно.",
  Signin: "Моля, влезте с различен акаунт.",
  OAuthSignin: "Моля, влезте с различен акаунт.",
  OAuthCallbackError: "Моля, влезте с различен акаунт.",
  OAuthCreateAccount: "Моля, влезте с различен акаунт.",
  EmailCreateAccount: "Моля, влезте с различен акаунт.",
  Callback: "Моля, влезте с различен акаунт.",
  OAuthAccountNotLinked:
    "За да потвърдите идентичността си, влезте със същия акаунт, който сте използвали първоначално.",
  EmailSignin:
    "Грешка при изпращането на имейл за вход. Моля, опитайте по-късно.",
  CredentialsSignin: "Грешни данни за вход.",
  SessionRequired: "Моля, влезте за да продължите.",
};
