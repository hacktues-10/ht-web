"use client";

import { IfFeatureEnabled, useGrowthBook } from "@growthbook/growthbook-react";

import { HTFeature } from "~/app/_context/growthbook/features";

export function IfHTFeatureOn(props: {
  feature: HTFeature;
  children: React.ReactNode;
}) {
  return (
    <IfFeatureEnabled feature={props.feature}>
      {props.children}
    </IfFeatureEnabled>
  );
}

export function IfHTFeatureOff(props: {
  feature: HTFeature;
  children: React.ReactNode;
}) {
  const gb = useGrowthBook();
  return gb?.isOff(props.feature) && <>{props.children}</>;
}

export function IfAnyHTFeatureOn(props: {
  outOf: HTFeature[];
  children: React.ReactNode;
}) {
  const gb = useGrowthBook();
  const enabled = props.outOf.some((f) => gb?.evalFeature(f)?.on);
  return enabled && <>{props.children}</>;
}

export function IfAllHTFeaturesOff(props: {
  outOf: HTFeature[];
  children: React.ReactNode;
}) {
  const gb = useGrowthBook();
  const enabled = props.outOf.every((f) => gb?.evalFeature(f)?.off);
  return enabled && <>{props.children}</>;
}
