import { z } from "zod";

export const updateProjectSchema = z.object({
  teamId: z.string().trim().min(1),
  name: z.string().trim().min(1, { message: "Моля, въведете име" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Моля, въведете описание" })
    .max(1000, {
      message: "Описанието трябва да бъде по-малко от 1000 символа",
    }),
});

export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;

export const updateWebsiteUrlSchema = z.object({
  teamId: z.string().trim().min(1),
  websiteUrl: z.union([
    z
      .string()
      .trim()
      .url({ message: "Моля, въведете валиден URL адрес" })
      .startsWith("http", {
        message: "Позволени са само HTTP и HTTPS хиперлинкове",
      })
      .optional(),
    z.literal("").transform(() => undefined),
  ]),
});

export type UpdateWebsiteUrlInput = z.infer<typeof updateWebsiteUrlSchema>;
