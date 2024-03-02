import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import {
  ALUMNI_REGISTRATION_START,
  STUDENTS_REGISTRATION_START,
} from "~/app/_configs/hackathon";
import { IfHTFeatureOff, IfHTFeatureOn } from "~/app/_integrations/components";
import { IfDateInFuture, IfDateInPast } from "~/app/components/countdowns";
import { DateDisplay } from "~/app/components/date-display";
import { HTXLogoDuotone } from "~/app/components/logos";
import { Button } from "~/app/components/ui/button";
import { Card } from "~/app/components/ui/card";
import { Separator } from "~/app/components/ui/separator";

export default function GitHubMessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full max-w-lg flex-col gap-5">
      <Card className="flex w-full flex-col gap-5 p-6 text-center">
        {children}
      </Card>
      <Separator />
      <p className="cursor-default text-center text-xl">
        <HTXLogoDuotone />
      </p>
    </section>
  );
}
