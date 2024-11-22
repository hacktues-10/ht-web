import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { IfHTFeatureOn } from "~/app/_integrations/components";
import { getHTSession } from "~/app/api/auth/session";
import { HTLogo, HTXLogoDuotone } from "~/app/components/logos";
import { Card } from "~/app/components/ui/card";
import { Separator } from "~/app/components/ui/separator";
import { RegistrationCountdownOverlay } from "../_components/countdown-overlay";
import { SignInForm } from "../_components/signin-form";

export const metadata: Metadata = {
  title: "Регистрация",
  description: "Регистирайте се за участие в Hack TUES X",
  openGraph: {
    title: "Регистрация",
    description: "Регистирайте се за участие в Hack TUES X",
  },
};

export default async function SignUpPage() {
  const session = await getHTSession();
  if (session) {
    redirect("/signout");
  }
  return (
    <section className="flex w-full max-w-sm flex-col gap-5">
      <h1 className="text-center text-3xl font-extrabold">Регистрация</h1>
      <Card className="relative w-full p-6">
        <RegistrationCountdownOverlay />
        <SignInForm isRegister={true} />
      </Card>
      <Separator />
      <IfHTFeatureOn feature="signin-students">
        <p className="text-center">
          Вече имате акаунт?{" "}
          <Link
            className="font-medium underline underline-offset-4"
            href="/login"
          >
            Влезте!
          </Link>
        </p>
      </IfHTFeatureOn>
      <p className="text-center text-xl">
        <Link href="/">
          <HTXLogoDuotone />
        </Link>
      </p>
    </section>
  );
}
