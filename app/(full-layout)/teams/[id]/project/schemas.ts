import { z } from "zod";

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
