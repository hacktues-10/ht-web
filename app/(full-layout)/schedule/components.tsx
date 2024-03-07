"use client";

import { PropsWithChildren } from "react";
import { atom, useAtom } from "jotai";

import { ScheduleEvent } from "~/app/_configs/hackathon";
import { useHTFeatureIsOn } from "~/app/_context/growthbook/utils";

export function ShowScheduleItem({
  children,
  type,
}: PropsWithChildren<{ type: ScheduleEvent["type"] }>) {
  const showFullSchedule = useHTFeatureIsOn("show-full-schedule");

  if (type === "workshop" || showFullSchedule) {
    return <>{children}</>;
  }
  return null;
}
