import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

import { env } from "~/app/env.mjs";

export function GET(req: NextRequest) {
  redirect(env.DISCORD_REDIRECT_URL);
}
