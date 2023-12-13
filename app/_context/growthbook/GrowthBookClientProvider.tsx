"use client";

import { PropsWithChildren, useEffect, useMemo } from "react";
import {
  Attributes,
  FeatureDefinitions,
  GrowthBook,
} from "@growthbook/growthbook";
import { GrowthBookProvider } from "@growthbook/growthbook-react";

import { env } from "~/app/env.mjs";
import { HTFeatures } from "./features";

type GrowthBookClientProviderProps = PropsWithChildren<{
  attributes: Attributes;
  features: FeatureDefinitions;
  enableDevMode?: boolean;
}>;

export function GrowthBookClientProvider({
  attributes,
  children,
  features,
  enableDevMode = false,
}: GrowthBookClientProviderProps) {
  const growthbook = useMemo(
    () =>
      new GrowthBook<HTFeatures>({
        apiHost: env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
        clientKey: env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
        attributes,
        features,
        enableDevMode,
        subscribeToChanges: true,
      }),
    [attributes, features, enableDevMode],
  );

  useEffect(() => {
    growthbook.loadFeatures();
  }, [growthbook]);

  return (
    <GrowthBookProvider growthbook={growthbook}>{children}</GrowthBookProvider>
  );
}
