import { cache } from "react";
import { unstable_cache } from "next/cache";
import { GrowthBook } from "@growthbook/growthbook";

import { HTFeatures } from "~/app/_context/growthbook/features";
import { env } from "../env.mjs";

// FIXME: do we need to use user id:
// https://github.com/esauri/growthbook-next-app-router/blob/main/src/utils/growthbook.ts
// XXX: should we move this to _integrations/growthbook.ts? (or some subdirectory of _integrations)
export const getServerSideGrowthBook = unstable_cache(
  cache(async (id?: string) => {
    const growthbook = new GrowthBook<HTFeatures>({
      apiHost: env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
      clientKey: env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
      enableDevMode: env.VERCEL_ENV === "development",
      attributes: {
        id,
      },
    });
    await growthbook.loadFeatures({ timeout: 1000 });
    return growthbook;
  }),
  ["server-side-growthbook"],
  {
    revalidate: 60, // 1 minute
  },
);
