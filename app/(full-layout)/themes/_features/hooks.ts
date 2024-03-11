import { useHTFeature } from "~/app/_context/growthbook/utils";
import { getTheme, ThemeFeature } from "./lib";

export function useTheme(themeFeature: ThemeFeature) {
  const feature = useHTFeature(themeFeature);
  return getTheme(feature);
}
