"use client";

import { useEffect, useState } from "react";

import { Card, CardContent } from "./ui/card";

export function useCountdown(to: Date) {
  const [countdown, setCountdown] = useState(() => calculateCountdown(to));

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

export function CountdownTimer({ to }: { to: Date }) {
  const countdown = useCountdown(to);

  const numberFormat = new Intl.NumberFormat("en", { minimumIntegerDigits: 2 });
  const formatted = {
    days: numberFormat.format(countdown.days),
    hours: numberFormat.format(countdown.hours),
    minutes: numberFormat.format(countdown.minutes),
    seconds: numberFormat.format(countdown.seconds),
  };

  return (
    <Card>
      <div className="flex items-center justify-center gap-2 px-5 py-3">
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold">{formatted.days}</div>
          <div className="text-xs font-medium">дена</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold">{formatted.hours}</div>
          <div className="text-xs font-medium">часа</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold">{formatted.minutes}</div>
          <div className="text-xs font-medium">минути</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold">{formatted.seconds}</div>
          <div className="text-xs font-medium">секунди</div>
        </div>
      </div>
    </Card>
  );
}
