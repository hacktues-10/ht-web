import { useFeatureIsOn } from "@growthbook/growthbook-react";

import { HTFeatures } from "./features";

type UseHTFeatureIsOn = typeof useFeatureIsOn<HTFeatures>;
export const useHTFeatureIsOn: UseHTFeatureIsOn = useFeatureIsOn;
