import { useEffect, useState } from "react";

export type Countdown = ReturnType<typeof calculateCountdown>;

export function useCountdown(to: Date, options?: { ssr: boolean }) {
  const [countdown, setCountdown] = useState(() =>
    options?.ssr
      ? calculateCountdown(to)
      : {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          diff: 0,
        },
  );
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
