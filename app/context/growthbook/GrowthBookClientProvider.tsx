"use client";

import { PropsWithChildren, useEffect, useMemo } from "react";
import {
  Attributes,
  FeatureDefinitions,
  GrowthBook,
} from "@growthbook/growthbook";
import { GrowthBookProvider } from "@growthbook/growthbook-react";

// import { env } from "~/app/env.mjs"; // FIXME: use env.mjs

type GrowthBookClientProviderProps = PropsWithChildren<{
  attributes: Attributes;
  features: FeatureDefinitions;
}>;

export function GrowthBookClientProvider({
  attributes,
  children,
  features,
}: GrowthBookClientProviderProps) {
  const growthbook = useMemo(
    () =>
      new GrowthBook({
        apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
        clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
        attributes,
        features,
        enableDevMode: true, // TODO: remove this in production
      }),
    [attributes, features],
  );

  useEffect(() => {
    // FIXME: autoRefresh is deprecated
    growthbook.loadFeatures({ autoRefresh: true });
  }, [growthbook]);

  return (
    <GrowthBookProvider growthbook={growthbook}>{children}</GrowthBookProvider>
  );
}
