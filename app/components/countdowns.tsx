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
  console.log({ diff, to, now });

  return {
    months: Math.floor(diff / (1000 * 60 * 60 * 24 * 30)),
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    diff,
  };
}

export function CountdownTimer({
  to,
  className,
}: {
  to: Date;
  className?: string;
}) {
  const countdown = useCountdown(to);

  return (
    <Card className={className}>
      <div className="flex items-center justify-center gap-2 p-3">
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold">{countdown.days}</div>
          <div className="text-sm font-medium">дена</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold">{countdown.hours}</div>
          <div className="text-sm font-medium">часа</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold">{countdown.minutes}</div>
          <div className="text-sm font-medium">минути</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold">{countdown.seconds}</div>
          <div className="text-sm font-medium">секунди</div>
        </div>
      </div>
    </Card>
  );
}
