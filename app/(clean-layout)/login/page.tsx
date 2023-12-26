import Link from "next/link";

import { IfAnyHTFeatureOn } from "~/app/_integrations/components";
import { HTXLogoDuotone } from "~/app/components/logos";
import {
  IfQueryParamNotPresent,
  IfQueryParamPresent,
} from "~/app/components/query-params";
import { Card } from "~/app/components/ui/card";
import { Separator } from "~/app/components/ui/separator";
import { SignInForm } from "../_components/signin-form";

export default async function LoginPage() {
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
      <Separator />
      <IfAnyHTFeatureOn outOf={["register-alumni", "register-students"]}>
        <p className="text-center">
          Нямате акаунт?{" "}
          <Link
            className="font-medium underline underline-offset-4"
            href="/signup"
          >
            Регистрирайте се!
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
