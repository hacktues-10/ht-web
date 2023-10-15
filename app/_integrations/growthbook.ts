import { cache } from "react";
import { GrowthBook } from "@growthbook/growthbook";

import { env } from "../env.mjs";

// FIXME: do we need to use user id:
// https://github.com/esauri/growthbook-next-app-router/blob/main/src/utils/growthbook.ts
export const getServerSideGrowthBook = cache(async (id?: string) => {
  const growthbook = new GrowthBook({
    apiHost: env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
    clientKey: env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
    enableDevMode: true, // FIXME: remove this in production
    attributes: {
      id,
    },
  });
  await growthbook.loadFeatures({ timeout: 1000 });
  return growthbook;
});
