"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { XOctagon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/app/components/ui/button";
import {
  Form,
  FormControl,
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

  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      form.setError("root", {
        message: signinErrors[error] ?? signinErrors.default,
      });
    }
  }, [searchParams, form]);

  return (
    <Form {...form}>
      <form
        method="post"
        onSubmit={form.handleSubmit((credentials) =>
          // TODO: use redirect: false
          signIn("email", {
            ...credentials,
            callbackUrl: searchParams.get("callbackUrl") ?? undefined,
          }),
        )}
        className="space-y-4"
      >
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имейл aдрес</FormLabel>
              <FormControl>
                <Input placeholder="tuesar@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row-reverse">
          <Button
            type="submit"
            disabled={
              form.formState.isSubmitting ||
              (form.formState.isSubmitted &&
                !form.formState.isSubmitSuccessful &&
                !form.formState.isValid)
            }
          >
            {props.isRegister ? "Напред" : "Вход"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

const signinErrors: Record<string, string> = {
  default: "Възникна неочаквана грешка при влизането. Моля, опитайте отново.",
  Signin: "Моля влезте с различен акаунт.",
  OAuthSignin: "Моля влезте с различен акаунт.",
  OAuthCallbackError: "Моля влезте с различен акаунт.",
  OAuthCreateAccount: "Моля влезте с различен акаунт.",
  EmailCreateAccount: "Моля влезте с различен акаунт.",
  Callback: "Моля влезте с различен акаунт.",
  OAuthAccountNotLinked:
    "За да потвърдите идентичността си, влезте със същия акаунт, който сте използвали първоначално.",
  EmailSignin:
    "Грешка при изпращането на имейл за вход. Моля, опитайте отново по-късно.",
  CredentialsSignin: "Грешни данни за вход.",
  SessionRequired: "Моля, влезте за да продължите.",
};
