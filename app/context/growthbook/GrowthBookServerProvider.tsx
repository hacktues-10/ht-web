import { PropsWithChildren } from "react";

import { getServerSideGrowthBook } from "~/app/growthbook";
import { GrowthBookClientProvider } from "./GrowthBookClientProvider";

export async function GrowthBookServerProvider({
  children,
}: PropsWithChildren<{}>) {
  const growthbook = await getServerSideGrowthBook();
  const attributes = growthbook.getAttributes();
  const features = growthbook.getFeatures();

  return (
    <GrowthBookClientProvider attributes={attributes} features={features}>
      {children}
    </GrowthBookClientProvider>
  );
}
