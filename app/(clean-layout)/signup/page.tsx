import Link from "next/link";

import { IfAnyHTFeatureOn } from "~/app/_integrations/components";
import { HTXLogoDuotone } from "~/app/components/logos";
import { Card } from "~/app/components/ui/card";
import { Separator } from "~/app/components/ui/separator";
import { SignInForm } from "../_components/signin-form";

export default async function SignUpPage() {
  return (
    <section className="flex w-full max-w-sm flex-col gap-5">
      <h1 className="text-center text-3xl font-extrabold">Регистрация</h1>
      <Card className="w-full p-6">
        <SignInForm isRegister={true} />
      </Card>
      <Separator />
      <IfAnyHTFeatureOn outOf={["signin-alumni", "signin-students"]}>
        <p className="text-center">
          Вече имате акаунт?{" "}
          <Link
            className="font-medium underline underline-offset-4"
            href="/login"
          >
            Влезте!
          </Link>
        </p>
      </IfAnyHTFeatureOn>
      <p className="text-center text-xl">
        <Link href="/">
          <HTXLogoDuotone />
        </Link>
      </p>
    </section>
  );
}
