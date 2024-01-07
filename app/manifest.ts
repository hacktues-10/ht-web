import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hack TUES X",
    short_name: "Hack TUES X",
    description:
      "Единственият хакатон в България, организиран от ученици за ученици. ⌛",
    start_url: "/",
    display: "standalone",
    background_color: "#030712",
    theme_color: "#ffdfa8",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
