"use client";

import { useHTFeature } from "../_context/growthbook/utils";
import { cn } from "../utils";

export function LandingSubtitle() {
  const feature = useHTFeature("landing-subtitle");
  const subtitle = feature.value ? (
    <>{feature.value}</>
  ) : (
    <>Eмблематичният за ТУЕС хакатон се&nbsp;завръща!</>
  );

  const isShortText = feature.value && feature.value.length < 20;
  const isMediumText =
    feature.value && feature.value.length < 30 && !isShortText;

  return (
    <p
      className={cn(
        "text-center font-lazydog text-sm lg:text-lg",
        isMediumText && "text-base lg:text-lg",
        isShortText && "text-lg lg:text-3xl",
      )}
    >
      {subtitle}
    </p>
  );
}
