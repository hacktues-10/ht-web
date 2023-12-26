"use client";

import { useMemo } from "react";

import {
  ALUMNI_REGISTRATION_START,
  STUDENTS_REGISTRATION_START,
} from "~/app/_configs/hackathon";
import { IfAllHTFeaturesOff } from "~/app/_integrations/components";
import { CountdownTimerDisplay } from "~/app/components/countdowns";
import { useCountdown } from "~/app/components/countdowns/hooks";

export const RegistrationCountdownOverlay = () => {
  const studentsCountdown = useCountdown(STUDENTS_REGISTRATION_START);
  const alumniCountdown = useCountdown(ALUMNI_REGISTRATION_START);

  const firstFutureCountdown = useMemo(
    () =>
      [studentsCountdown, alumniCountdown]
        .sort((a, b) => a.diff - b.diff)
        .find((c) => c.diff > 0) ?? null,
    [studentsCountdown, alumniCountdown],
  );

  return firstFutureCountdown !== null ? (
    <IfAllHTFeaturesOff outOf={["signin-alumni", "signin-students"]}>
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/5 text-card-foreground backdrop-blur-lg">
        <div className="flex flex-col gap-3 text-center text-white">
          <p className="text-xl font-bold">Регистрацията отваря след</p>
          <CountdownTimerDisplay countdown={firstFutureCountdown} />
        </div>
      </div>
    </IfAllHTFeaturesOff>
  ) : null;
};
