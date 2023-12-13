"use client";

import { IfFeatureEnabled } from "@growthbook/growthbook-react";

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
