import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export function GET(req: NextRequest) {
  const url =
    "https://discord.com/api/oauth2/authorize?client_id=1163022808192917514&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fdiscord%2Fcallback&response_type=code&scope=identify%20guilds%20guilds.join";
  redirect(url);
}
