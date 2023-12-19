import Link from "next/link";

import { HTXLogoDuotone } from "~/app/components/logos";
import { Card } from "~/app/components/ui/card";
import { Separator } from "~/app/components/ui/separator";
import { SignInForm } from "../_components/signin-form";

export default async function LoginPage() {
  return (
    <section className="flex flex-col gap-5">
      <h1 className="text-center text-3xl font-extrabold">Здравейте отново!</h1>
      <Card className="block w-full p-6">
        <SignInForm isRegister={false} />
      </Card>
      <Separator />
      <p className="text-center">
        Нямате акаунт?{" "}
        <Link
          className="font-medium underline underline-offset-4"
          href="/signup"
        >
          Регистрирайте се!
        </Link>
      </p>
      <p className="text-center text-xl">
        <Link href="/">
          <HTXLogoDuotone />
        </Link>
      </p>
    </section>
  );
}
