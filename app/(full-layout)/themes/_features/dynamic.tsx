"use client";

import { MainThemeDisplay, SubthemeDisplay } from "../display";
import { useTheme } from "./hooks";
import { ThemeFeature } from "./lib";

export function FeatureMainTheme({ feature }: { feature: ThemeFeature }) {
  const theme = useTheme(feature);
  if (!theme) return null;
  return <MainThemeDisplay theme={theme} />;
}

export function FeatureSubtheme({ feature }: { feature: ThemeFeature }) {
  const theme = useTheme(feature);
  if (!theme) return null;
  return <SubthemeDisplay theme={theme} />;
}
