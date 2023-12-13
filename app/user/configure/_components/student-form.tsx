"use client";

import { Card } from "~/app/components/ui/card";
import { Step1Header } from "./steps/step1";

export const StudentForm = ({ email }: { email: string }) => {
  return (
    <div className="flex h-full flex-col gap-1">
      <Step1Header email={email} />
      <Card className="max-w-sm p-3 text-center">
        <p className="text-muted-foreground">
          Регистрацията на настоящи ученици още не е отворена.{" "}
          {/* TODO: add actual link here */}
          {/* Следете ни в социалните мрежи за повече информация. */}
        </p>
      </Card>
    </div>
  );
};
