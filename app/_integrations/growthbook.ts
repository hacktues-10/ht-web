import { cache } from "react";
import { unstable_noStore } from "next/cache";
import { GrowthBook } from "@growthbook/growthbook";

import { HTFeatures } from "~/app/_context/growthbook/features";
import { env } from "../env.mjs";

// FIXME: do we need to use user id:
// https://github.com/esauri/growthbook-next-app-router/blob/main/src/utils/growthbook.ts
// XXX: should we move this to _integrations/growthbook.ts? (or some subdirectory of _integrations)
export const getServerSideGrowthBook = async (id?: string) => {
  unstable_noStore(); // XXX: Това може да чупи всичко, но пък може и да не чупи
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
};
