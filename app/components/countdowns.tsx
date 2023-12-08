"use client";

import { useEffect, useState } from "react";
import { animated, useSpring, useSpringRef } from "@react-spring/web";

import { Card, CardContent } from "./ui/card";

export function useCountdown(to: Date) {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    diff: 0,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(to));
    }, 1000);

    return () => clearInterval(interval);
  }, [to]);

  return countdown;
}

function calculateCountdown(to: Date) {
  const now = new Date();
  const diff = Math.max(to.getTime() - now.getTime(), 0);

  let diffSeconds = diff / 1000;
  const days = Math.floor(diffSeconds / (60 * 60 * 24));
  diffSeconds -= days * 60 * 60 * 24;

  const hours = Math.floor(diffSeconds / (60 * 60)) % 24;
  diffSeconds -= hours * 60 * 60;

  const minutes = Math.floor(diffSeconds / 60) % 60;
  diffSeconds -= minutes * 60;
  console.log({ minutes });

  // shouldnt need % 60 but just in case
  const seconds = Math.floor(diffSeconds) % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    diff,
  };
}

function useCountdownSpring(to: Date) {
  const countdown = useCountdown(to);
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
  const countdown = useCountdownSpring(to);

  const numberFormat = new Intl.NumberFormat("en", { minimumIntegerDigits: 2 });
  const formatted = {
    days: countdown.days.to((days) => numberFormat.format(Math.ceil(days))),
    hours: countdown.hours.to((hours) => numberFormat.format(Math.ceil(hours))),
    minutes: countdown.minutes.to((minutes) =>
      numberFormat.format(Math.ceil(minutes)),
    ),
    seconds: countdown.seconds.to((seconds) =>
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
          <div className="text-xs font-medium">дена</div>
        </div>
        <div className="flex flex-col items-center">
          <animated.div className="text-4xl font-bold">
            {formatted.hours}
          </animated.div>
          <div className="text-xs font-medium">часа</div>
        </div>
        <div className="flex flex-col items-center">
          <animated.div className="text-4xl font-bold">
            {formatted.minutes}
          </animated.div>
          <div className="text-xs font-medium">минути</div>
        </div>
        <div className="flex flex-col items-center">
          <animated.div className="text-4xl font-bold">
            {formatted.seconds}
          </animated.div>
          <div className="text-xs font-medium">секунди</div>
        </div>
      </div>
    </Card>
  );
}
