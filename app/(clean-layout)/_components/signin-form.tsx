"use client";

import { useForm } from "react-hook-form";

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

type SignInSchema = {
  email: string;
};

export const SignInForm = (props: {
  isRegister: boolean;
  csrfToken: string;
}) => {
  const form = useForm<SignInSchema>();

  return (
    <Form {...form}>
      <form className="space-y-3">
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
        <input type="hidden" name="csrfToken" value={props.csrfToken} />
        <div className="flex flex-row-reverse">
          <Button type="submit">
            {props.isRegister ? "Регистрация" : "Вход"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
