import { use } from "react";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import axios from "axios";

const clientId = "1163022808192917514";
const clientSecret = "-m73ILHECZQjpLaDChLWSUFs8FnH0jNz";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  if (!code) return;
  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: "http://localhost:3000/api/discord/callback",
  });

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept-Encoding": "application/x-www-form-urlencoded",
  };
  //post request to https://discord.com/api/oauth2/token	.
  const res = await axios.post("https://discord.com/api/oauth2/token", params, {
    headers,
  });
  console.log(res);

  const user = await axios.get("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${res.data.access_token}`,
    },
  });
  console.log(user);

  return new Response(JSON.stringify(user.data));
}
