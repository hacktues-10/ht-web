import "dotenv/config";

import type { Config } from "drizzle-kit";

import { env } from "~/app/env.mjs";

export default {
  schema: "./app/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: env.POSTGRES_URL as string,
  },
} satisfies Config;
