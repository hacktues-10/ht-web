import Link from "next/link";

import { getHTCsrfToken } from "~/app/api/auth/session";
import { Card } from "~/app/components/ui/card";
import { Separator } from "~/app/components/ui/separator";
import { SignInForm } from "../_components/signin-form";

export default async function LoginPage() {
  const csrfToken = (await getHTCsrfToken()) ?? "";
  return (
    <section className="flex flex-col gap-5">
      <h1 className="text-center text-3xl font-extrabold">Здравейте отново!</h1>
      <Card className="block w-full p-6">
        <SignInForm isRegister={false} csrfToken={csrfToken} />
      </Card>
      <Separator />
      <p className="text-center">
        Нямате акаунт?{" "}
        <Link
          className="font-medium underline underline-offset-4"
          href="/register"
        >
          Регистрирайте се
        </Link>
      </p>
    </section>
  );
}
