import { useEffect, useState } from "react";

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
