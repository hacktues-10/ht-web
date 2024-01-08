import { MetadataRoute } from "next";

import { env } from "./env.mjs";

export default function robots(): MetadataRoute.Robots {
  return {
    rules:
      env.VERCEL_ENV === "production"
        ? {
            userAgent: "*",
            allow: "/",
            disallow: "/private/",
          }
        : {
            userAgent: "*",
            disallow: "/",
          },
    sitemap: "https://hacktues.bg/sitemap.xml",
  };
}
