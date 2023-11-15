import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    POSTGRES_URL: z.string().url(),
    EMAIL_SERVER: z.string().url(),
    EMAIL_FROM: z.string().email(),

    DISCORD_BOT_ID: z.string(),
    DISCORD_CLIENT_ID: z.string(),
    DISCORD_CLIENT_SECRET: z.string(),
    DISCORD_GUILD_ID: z.string(),
    NEXTAUTH_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string(),
    R2_ACCOUNT_ID: z.string(),
    R2_ACCESS_URL: z.string(),
    S3_UPLOAD_KEY: z.string(),
    S3_UPLOAD_SECRET: z.string(),
    S3_UPLOAD_BUCKET: z.string(),
    MEMBER_ROLE: z.string(),
    MENTOR_ROLE: z.string(),

    // TODO: rename
    HOSTNAME: z.string(),
  },
  client: {},
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  //   runtimeEnv: {
  //     ...
  //   },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {},
});
