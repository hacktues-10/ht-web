"use client";

import dynamic from "next/dynamic";

export const DateDisplay = dynamic(() => import("./internal/date-display"), {
  ssr: false,
});

export const DateRangeDisplay = dynamic(
  () => import("./internal/date-range-display"),
  { ssr: false },
);
