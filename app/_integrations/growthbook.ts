import { cache } from "react";
import { unstable_noStore } from "next/cache";
import { GrowthBook } from "@growthbook/growthbook";

import { HTFeatures } from "~/app/_context/growthbook/features";
import { env } from "../env.mjs";

// FIXME: do we need to use user id:
// https://github.com/esauri/growthbook-next-app-router/blob/main/src/utils/growthbook.ts
// XXX: should we move this to _integrations/growthbook.ts? (or some subdirectory of _integrations)
export const getServerSideGrowthBook = async (id?: string) => {
  const growthbook = new GrowthBook<HTFeatures>({
    apiHost: env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
    clientKey: env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
    enableDevMode: env.VERCEL_ENV === "development",
    attributes: {
      id,
    },
  });
  const { features } = await fetch(
    `${env.NEXT_PUBLIC_GROWTHBOOK_API_HOST}/api/features/${env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY}`,
    {
      cache: "no-store",
    },
  ).then((res) => res.json());
  growthbook.setFeatures(features);
  return growthbook;
};
