import { env } from "~/app/env.mjs";

export const addDiscordRole = async (
  userid: string,
  roleId: string,
  access_token: string,
) => {
  const headers = {
    Authorization: "Bot " + env.DISCORD_BOT_ID,
  };
  const res = await fetch(
    "https://discord.com/api/guilds/" +
      env.DISCORD_GUILD_ID +
      "/members/" +
      userid +
      "/roles/" +
      roleId,
    {
      method: "PUT",
      headers: headers,
    },
  );

  console.log("HEADERS: " + headers);

  console.log(await res.json());

  return { success: false };
};
