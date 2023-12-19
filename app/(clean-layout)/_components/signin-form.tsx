"use client";

import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
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
  email: z
    .string({ required_error: "Празен имейл адрес" })
    .email({ message: "Невалиден имейл адрес" }),
});

export const SignInForm = (props: { isRegister: boolean }) => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  const searchParams = useSearchParams();

  return (
    <Form {...form}>
      <form
        method="post"
        onSubmit={form.handleSubmit((credentials) =>
          signIn("email", {
            ...credentials,
            callbackUrl: searchParams.get("callbackUrl") ?? undefined,
          }),
        )}
        className="space-y-4"
      >
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
          <Button type="submit">{props.isRegister ? "Напред" : "Вход"}</Button>
        </div>
      </form>
    </Form>
  );
};
