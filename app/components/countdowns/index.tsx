"use client";

import { PropsWithChildren, useState } from "react";
import { animated, useSpring } from "@react-spring/web";

import { Card } from "../ui/card";
import { Countdown, useCountdown } from "./hooks";

function useCountdownSpring(countdown: Countdown) {
  const [immediate, setImmediate] = useState(false);
  return useSpring({
    to: countdown,
    immediate,
    onRest: (result, spring) => {
      spring.stop();
      if (!immediate) {
        setImmediate(true);
      }
    },
    config: {
      clamp: true,
    },
  });
}

export function CountdownTimer({ to }: { to: Date }) {
  const countdown = useCountdown(to);
  return <CountdownTimerDisplay countdown={countdown} />;
}

const numberFormat = new Intl.NumberFormat("en", { minimumIntegerDigits: 2 });

export function CountdownTimerDisplay({ countdown }: { countdown: Countdown }) {
  const countdownSpring = useCountdownSpring(countdown);

  const formatted = {
    days: countdownSpring.days.to((days) =>
      numberFormat.format(Math.ceil(days)),
    ),
    hours: countdownSpring.hours.to((hours) =>
      numberFormat.format(Math.ceil(hours)),
    ),
    minutes: countdownSpring.minutes.to((minutes) =>
      numberFormat.format(Math.ceil(minutes)),
    ),
    seconds: countdownSpring.seconds.to((seconds) =>
      numberFormat.format(Math.ceil(seconds)),
    ),
  };

  return (
    <Card>
      <div className="flex items-center justify-center gap-2 px-5 py-3">
        <div className="flex flex-col items-center">
          <animated.div className="text-4xl font-bold">
            {formatted.days}
          </animated.div>
          <div className="text-xs font-medium">
            {countdown.days === 1 ? "ден" : "дена"}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <animated.div className="text-4xl font-bold">
            {formatted.hours}
          </animated.div>
          <div className="text-xs font-medium">
            {countdown.hours === 1 ? "час" : "часа"}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <animated.div className="text-4xl font-bold">
            {formatted.minutes}
          </animated.div>
          <div className="text-xs font-medium">
            {countdown.minutes === 1 ? "минута" : "минути"}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <animated.div className="text-4xl font-bold">
            {formatted.seconds}
          </animated.div>
          <div className="text-xs font-medium">
            {countdown.seconds === 1 ? "секунда" : "секунди"}
          </div>
        </div>
      </div>
    </Card>
  );
}

export const IfDateInFuture = ({
  date,
  children,
}: PropsWithChildren<{ date: Date }>) => {
  const countdown = useCountdown(date, { ssr: true });
  return countdown.diff > 0 ? <>{children}</> : null;
};

export const IfDateInPast = ({
  date,
  children,
}: PropsWithChildren<{ date: Date }>) => {
  const countdown = useCountdown(date, { ssr: true });
  return countdown.diff <= 0 ? <>{children}</> : null;
};
