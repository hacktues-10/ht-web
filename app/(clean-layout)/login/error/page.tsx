import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import {
  HT_CONTACT_EMAIL,
  HT_EDITION_NAME,
  STUDENTS_REGISTRATION_START,
} from "~/app/_configs/hackathon";
import { IfHTFeatureOff, IfHTFeatureOn } from "~/app/_integrations/components";
import { IfDateInFuture, IfDateInPast } from "~/app/components/countdowns";
import { DateDisplay } from "~/app/components/date-display";
import { HTEditionLogo } from "~/app/components/logos";
import { Button } from "~/app/components/ui/button";
import { Card } from "~/app/components/ui/card";
import { Separator } from "~/app/components/ui/separator";

export const metadata: Metadata = {
  title: "Възникна грешка при влизането",
  description: `Възникна грешка при влизането ви в ${HT_EDITION_NAME}`,
  openGraph: {
    title: "Възникна грешка при влизането",
    description: `Възникна грешка при влизането ви в ${HT_EDITION_NAME}`,
  },
};

export default function LoginErrorPage({
  searchParams: { error },
}: {
  searchParams: { error?: string };
}) {
  const errorPage = errors[error ?? "default"] ?? errors.default;
  return (
    <section className="flex w-full max-w-lg flex-col gap-5">
      <Card className="flex w-full flex-col gap-5 p-6 text-center">
        <h1 className="text-3xl font-extrabold">{errorPage.heading}</h1>
        {errorPage.message}
      </Card>
      <Separator />
      <p className="cursor-default text-center text-xl">
        <HTEditionLogo />
      </p>
    </section>
  );
}

const errors: Record<
  string,
  {
    status: number;
    heading: React.ReactNode;
    message: React.ReactNode;
  }
> = {
  default: {
    // FIXME: statuses are not used. Next doesn't allow custom statuses on
    // pages. We could hack it with an API route (or middleware) that forwards
    // the request to a page and alters the status, but it's not worth it.
    status: 200,
    heading: "Възникна грешка при влизането.",
    message: (
      <p>
        Моля, опитайте отново по-късно. Ако проблемът продължава, моля, свържете
        се с нас на адрес{" "}
        <a
          className="font-medium underline underline-offset-4"
          href={`mailto:${HT_CONTACT_EMAIL}`}
        >
          {HT_CONTACT_EMAIL}
        </a>
        .
      </p>
    ),
  },
  // Configuration: {
  //   status: 500,
  //   heading: "Server error",
  //   message: (
  //     <div>
  //       <p>There is a problem with the server configuration.</p>
  //       <p>Check the server logs for more information.</p>
  //     </div>
  //   ),
  // },
  AccessDenied: {
    status: 403,
    heading: "Достъпът е отказан",
    message: (
      <>
        <h1>Не е позволено влизането с този имейл адрес.</h1>
        <div>
          <Button asChild>
            <Link href="/login">Вход с друг имейл</Link>
          </Button>
        </div>
      </>
    ),
  },
  Verification: {
    status: 403,
    heading: "Невалиден линк за потвърждение",
    message: (
      <>
        <div>
          <p>Tози линк вече не е валиден.</p>
          <p>Може вече да е бил използван, или да е изтекъл.</p>
        </div>
        <div>
          <Button asChild>
            <Link href="/login">Вход</Link>
          </Button>
        </div>
      </>
    ),
  },
  StudentsDisabled: {
    status: 403,
    heading: (
      <>
        <IfHTFeatureOff feature="register-students">
          <IfDateInFuture date={STUDENTS_REGISTRATION_START}>
            Регистрацията на ученици още не е отворена!
          </IfDateInFuture>
          <IfDateInPast date={STUDENTS_REGISTRATION_START}>
            Регистрацията на ученици вече е затворена.
          </IfDateInPast>
        </IfHTFeatureOff>
        <IfHTFeatureOn feature="register-students">
          Влизането с ученически имейл е забранено.
        </IfHTFeatureOn>
      </>
    ),
    message: (
      <>
        <p>Имейлът, който въведохте, е на настоящ ученик.</p>
        <IfHTFeatureOff feature="register-students">
          <IfDateInFuture date={STUDENTS_REGISTRATION_START}>
            <p>
              Регистрацията на ученици отваря на
              <br />
              <strong>
                <DateDisplay date={STUDENTS_REGISTRATION_START} showHour />
              </strong>
              <br />
              Oчакваме ви тогава!
            </p>
          </IfDateInFuture>
          <IfDateInPast date={STUDENTS_REGISTRATION_START}>
            <p>За съжаление, регистрацията на ученици вече е затворена.</p>
          </IfDateInPast>
        </IfHTFeatureOff>
        <IfHTFeatureOn feature="register-students">
          <p>
            Влизането на ученици е временно забранено. Моля, върнете се
            по-късно.
          </p>
        </IfHTFeatureOn>
        <div>
          <Button variant="secondary" asChild>
            <Link href="/">
              <ArrowLeft className="mr-1 h-4 w-4" /> Kъм началната страница
            </Link>
          </Button>
        </div>
      </>
    ),
  },
};
