import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { HT_EDITION_NAME } from "~/app/_configs/hackathon";
import { IfHTFeatureOff } from "~/app/_integrations/components";
import { getHTSession } from "~/app/api/auth/session";
import { HTEditionLogo } from "~/app/components/logos";
import { IfQueryParamNotPresent } from "~/app/components/query-params";
import { Button } from "~/app/components/ui/button";
import { Card } from "~/app/components/ui/card";
import { Separator } from "~/app/components/ui/separator";
import { SignInForm } from "../_components/signin-form";

export const metadata: Metadata = {
  title: "Вход",
  description: `Вход във вашия профил в ${HT_EDITION_NAME}`,
  openGraph: {
    title: "Вход",
    description: `Вход във вашия профил в ${HT_EDITION_NAME}`,
  },
};

export default async function LoginPage() {
  const session = await getHTSession();
  if (session) {
    redirect("/signout");
  }

  return (
    <section className="flex w-full max-w-sm flex-col gap-5">
      <IfQueryParamNotPresent name="error">
        <h1 className="text-center text-3xl font-extrabold">
          Здравейте отново!
        </h1>
      </IfQueryParamNotPresent>
      <Card className="w-full p-6">
        <SignInForm isRegister={false} />
      </Card>
      <Button
        variant="ghost"
        asChild
        size="sm"
        className="hover:backdrop-blur-md"
      >
        <Link href="/">{"<-"} Обратно в началото</Link>
      </Button>
      <Separator />
      <IfHTFeatureOff feature="register-students">
        <p className="text-center">
          Нямате акаунт?{" "}
          <Link
            className="font-medium underline underline-offset-4"
            href="/signup"
          >
            Регистрирайте се!
          </Link>
        </p>
      </IfHTFeatureOff>
      <p className="text-center text-xl">
        <Link href="/">
          <HTEditionLogo />
        </Link>
      </p>
    </section>
  );
}
