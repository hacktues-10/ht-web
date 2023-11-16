"use client"

import { HTFeatures } from "../context/growthbook/features";
import { IfFeatureEnabled } from "@growthbook/growthbook-react";

export function IfHTFeatureOn(props: {
  feature: keyof HTFeatures;
  children: React.ReactNode;
}) {
    return <IfFeatureEnabled feature={props.feature}>{props.children}</IfFeatureEnabled>
}