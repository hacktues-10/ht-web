import { MetadataRoute } from "next";

import { NAVIGATION_CATEGORIES } from "./_configs/navigation-categories";

export default function sitemap() {
  return NAVIGATION_CATEGORIES.flatMap((category) =>
    category.links
      .filter((link) => link.isVisible)
      .map((link): MetadataRoute.Sitemap[number] => {
        return {
          url: link.url,
          lastModified: new Date(),
          changeFrequency: "daily",
          priority: link.isNew ? 1 : 0.5,
        };
      }),
  );
}
