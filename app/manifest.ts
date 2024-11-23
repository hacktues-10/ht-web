import { MetadataRoute } from "next";

import { HT_EDITION_NAME } from "./_configs/hackathon";
import {
  HT_EDITION_BACKGROUND_COLOR,
  HT_EDITION_PRIMARY_COLOR,
  HT_EVENT_HEADLINE,
} from "./_configs/pr";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: HT_EDITION_NAME,
    short_name: HT_EDITION_NAME,
    description: HT_EVENT_HEADLINE,
    start_url: "/",
    display: "standalone",
    background_color: HT_EDITION_BACKGROUND_COLOR,
    theme_color: HT_EDITION_PRIMARY_COLOR,
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
