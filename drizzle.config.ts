import "dotenv/config";

import type { Config } from "drizzle-kit";

import { env } from "./app/env.mjs";

export default {
  schema: "./app/db/schema.ts",
  driver: "pglite",
  dialect: "postgresql",
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
} satisfies Config;
