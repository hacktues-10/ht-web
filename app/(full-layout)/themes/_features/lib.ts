import { z } from "zod";

import { getServerSideGrowthBook } from "~/app/_integrations/growthbook";

export const themeSchema = z.object({
  theme: z.string(),
  description: z.string(),
  image: z.object({
    alt: z.string(),
    url: z.string(),
    width: z.number(),
    height: z.number(),
  }),
});

export function getTheme(maybeThemeIdk: unknown) {
  const res = themeSchema.safeParse(maybeThemeIdk);
  if (!res.success) {
    return null;
  }
  return res.data;
}

const themeFeatures = [
  "main-theme",
  "subtheme1",
  "subtheme2",
  "subtheme3",
  "subtheme-alumni",
] as const;

export type ThemeFeature = (typeof themeFeatures)[number];

export async function getThemeFeature(feature: ThemeFeature) {
  const gb = await getServerSideGrowthBook();
  return getTheme(gb.evalFeature(feature).value);
}

export async function getDynamicThemeFeature(feature: string) {
  if (!themeFeatures.includes(feature as ThemeFeature)) {
    return null;
  }
  return getThemeFeature(feature as ThemeFeature);
}

export type Theme = z.infer<typeof themeSchema>;
