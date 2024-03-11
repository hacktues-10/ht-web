"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { z } from "zod";

import { useHTFeature } from "../_context/growthbook/utils";
import { ExternalIcon } from "../components/dynamic-icon";
import { Button } from "../components/ui/button";
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

function LandingCTAButton(props: React.ComponentProps<typeof Button>) {
  return <Button size="lg" {...props} />;
}

const landingCTASchema = z.object({
  text: z.string(),
  href: z.string(),
  color: z.enum(["sand", "brand"]).default("brand"),
  icon: z.string().nullish(),
});

type LandingCTA = z.infer<typeof landingCTASchema>;

const defaultCTA = {
  text: "Разгледайте отборите",
  href: "/teams",
  color: "sand",
  icon: undefined,
} as const satisfies LandingCTA;

export function LandingCTA() {
  const feature = useHTFeature("landing-cta");
  const cta = useMemo(() => {
    const result = landingCTASchema.safeParse(feature.value);
    return result.success ? result.data : defaultCTA;
  }, [feature.value]);

  return (
    <LandingCTAButton
      asChild
      variant={cta.color === "brand" ? "destructive" : "default"}
      className={cta.color === "brand" ? "bg-brand hover:bg-brand/90" : ""}
    >
      <Link
        href={cta.href}
        className="flex items-center"
        {...(isExternalUrl(cta.href) ? { target: "_blank" } : {})}
      >
        {cta.icon && <ExternalIcon name={cta.icon} className="mr-2 h-5 w-5" />}
        {cta.text}
      </Link>
    </LandingCTAButton>
  );
}

function isExternalUrl(url: string) {
  let baseUrl = "https://hacktues.bg";
  if (typeof window !== "undefined") {
    baseUrl = window.location.origin;
  }
  return new URL(url, baseUrl).origin !== baseUrl;
}
