"use client";

import dynamic from "next/dynamic";

export const DateDisplay = dynamic(
  () => import("./wrong-timezone/date-display"),
  {
    ssr: false,
  },
);

export const DateRangeDisplay = dynamic(
  () => import("./wrong-timezone/date-range-display"),
  { ssr: false },
);
