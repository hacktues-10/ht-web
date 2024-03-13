import { MetadataRoute } from "next";

import { NAVIGATION_CATEGORIES } from "./_configs/navigation-categories";
import { getAllTeams } from "./(full-layout)/teams/service";

export default async function sitemap() {
  const teams = await getAllTeams();
  return [
    ...NAVIGATION_CATEGORIES.flatMap((category) =>
      category.links
        .filter((link) => link.isVisible)
        .map((link): MetadataRoute.Sitemap[number] => ({
          url: link.url,
          lastModified: new Date(),
          changeFrequency: "daily",
          priority: link.isNew ? 1 : 0.5,
        })),
    ),
    ...teams.map((team) => ({
      url: `/teams/${team.id}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.5,
    })),
  ];
}
