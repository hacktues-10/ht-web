import { z } from "zod";

export const updateProjectSchema = z.object({
  teamId: z.string().trim().min(1),
  name: z.string().trim().min(1, "Моля, въведете име"),
  description: z
    .string()
    .trim()
    .min(1, "Моля, въведете описание")
    .max(1000, "Описанието трябва да бъде по-малко от 1000 символа"),
});

export type UpdateProjectInput = z.input<typeof updateProjectSchema>;

export const updateWebsiteUrlSchema = z.object({
  teamId: z.string().trim().min(1),
  websiteUrl: z.union([
    z
      .string()
      .trim()
      .url("Моля, въведете валиден URL адрес")
      .startsWith("http", "Позволени са само HTTP и HTTPS хиперлинкове")
      .optional(),
    z.literal("").transform(() => undefined),
  ]),
});

export type UpdateWebsiteUrlInput = z.input<typeof updateWebsiteUrlSchema>;

export const updateFallbackGitHubReposSchema = z.object({
  teamId: z.string().trim().min(1),
  fallbackGitHubRepos: z
    .string()
    .trim()
    .transform((v) => v.split("\n"))
    .pipe(
      z
        .array(
          z
            .string()
            .trim()
            .url("Моля, въведете валиден URL адрес")
            .startsWith(
              "https://github.com/",
              "Позволени са само GitHub хранилища",
            )
            .transform((v) => v.replace(/(\?|#|;).*$/, ""))
            .transform((v) => v.replace(/\/$/, ""))
            .transform((v) => v.replace(/\.git$/, "")),
          {
            invalid_type_error: "Моля, въведете хранилища, разделени с нов ред",
          },
        )
        .min(1, "Моля, въведете поне едно хранилище"),
    ),
});

export type UpdateFallbackGitHubReposInput = z.input<
  typeof updateFallbackGitHubReposSchema
>;
