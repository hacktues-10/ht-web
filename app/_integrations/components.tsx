"use client";

import { IfFeatureEnabled, useGrowthBook } from "@growthbook/growthbook-react";

import { HTFeatures } from "~/app/_context/growthbook/features";

export function IfHTFeatureOn(props: {
  feature: keyof HTFeatures;
  children: React.ReactNode;
}) {
  return (
    <IfFeatureEnabled feature={props.feature}>
      {props.children}
    </IfFeatureEnabled>
  );
}

export function IfAnyHTFeatureOn(props: {
  outOf: (keyof HTFeatures)[];
  children: React.ReactNode;
}) {
  const gb = useGrowthBook();
  const enabled = props.outOf.some((f) => gb?.evalFeature(f)?.on);
  return enabled && <>{props.children}</>;
}

export function IfAllHTFeaturesOff(props: {
  outOf: (keyof HTFeatures)[];
  children: React.ReactNode;
}) {
  const gb = useGrowthBook();
  const enabled = props.outOf.every((f) => gb?.evalFeature(f)?.off);
  return enabled && <>{props.children}</>;
}
