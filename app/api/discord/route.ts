import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

import { env } from "~/app/env.mjs";
import { discordRedirectUri } from "./service";

export function GET(req: NextRequest) {
  redirect(
    `https://discord.com/oauth2/authorize?${new URLSearchParams([
      ["response_type", "code"],
      ["client_id", env.DISCORD_CLIENT_ID],
      ["scope", "identify guilds.join"],
      ["redirect_uri", discordRedirectUri],
      ["prompt", "none"],
    ])}`,
  );
}
