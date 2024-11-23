"use client";

import { useMemo } from "react";

import { STUDENTS_REGISTRATION_START } from "~/app/_configs/hackathon";
import { IfHTFeatureOff } from "~/app/_integrations/components";
import { CountdownTimerDisplay } from "~/app/components/countdowns";
import { useCountdown } from "~/app/components/countdowns/hooks";
import { cn } from "~/app/utils";

export const RegistrationCountdownOverlay = () => {
  const studentsCountdown = useCountdown(STUDENTS_REGISTRATION_START);

  const firstFutureCountdown = useMemo(
    () => (studentsCountdown.diff > 0 ? studentsCountdown : null),
    [studentsCountdown],
  );

  return firstFutureCountdown !== null ? (
    <IfHTFeatureOff feature="signin-students">
      <OverlayContainer className="bg-background/90">
        <div className="flex flex-col gap-3 text-center text-white">
          <p className="text-xl font-bold">Регистрацията отваря след</p>
          <CountdownTimerDisplay countdown={firstFutureCountdown} />
        </div>
      </OverlayContainer>
    </IfHTFeatureOff>
  ) : null;
};

export const OverlayContainer = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => (
  <div
    className={cn(
      "absolute inset-0 z-50 flex items-center justify-center bg-background/5 text-card-foreground backdrop-blur-lg",
      className,
    )}
  >
    {children}
  </div>
);
