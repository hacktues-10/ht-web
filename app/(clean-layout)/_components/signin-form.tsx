"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useHTFeatureIsOn } from "~/app/_context/growthbook/utils";
import { parseElsysEmail } from "~/app/_elsys/service";
import { ErrorMessage } from "~/app/components/error-message";
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
  const canSignInStudents = useHTFeatureIsOn("signin-students");
  const canRegisterStudents = useHTFeatureIsOn("register-students");

  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const shouldBeInactive =
    props.isRegister && !canSignInStudents;

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
      if (!elsysEmail || elsysEmail.isAlumni) {
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
      callbackUrl: searchParams.get("callbackUrl") ?? "/",
    });
  });

  return (
    <Form {...form}>
      <form method="post" onSubmit={handleSubmit} className="space-y-4">
        {!!form.formState.errors.root && (
          <ErrorMessage>{form.formState.errors.root.message}</ErrorMessage>
        )}
        <FormField
          control={form.control}
          name="email"
          disabled={shouldBeInactive}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {props.isRegister ??
                  "Ученически имейл"
                  }
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    canSignInStudents
                      ? "tuesar.t.tuesarov.2024@elsys-bg.org" : ""
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
              {props.isRegister &&
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
