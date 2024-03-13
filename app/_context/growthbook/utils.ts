import {
  FeatureResult,
  useFeature,
  useFeatureIsOn,
} from "@growthbook/growthbook-react";

import { HTFeatures } from "./features";

type UseHTFeatureIsOn = typeof useFeatureIsOn<HTFeatures>;
export const useHTFeatureIsOn: UseHTFeatureIsOn = useFeatureIsOn;

export const useHTFeature = <Feature extends keyof HTFeatures>(
  feature: Feature,
) => useFeature<HTFeatures[Feature]>(feature);
