import { env } from "~/app/env.mjs";

export const addDiscordRole = async (userId: string, roleId: string) => {
  const headers = {
    Authorization: "Bot " + env.DISCORD_BOT_ID,
  };
  await fetch(
    "https://discord.com/api/guilds/" +
      env.DISCORD_GUILD_ID +
      "/members/" +
      userId +
      "/roles/" +
      roleId,
    {
      method: "PUT",
      headers: headers,
    },
  );

  return { success: true };
};

export const removeDiscordRole = async (userId: string, roleId: string) => {
  const headers = {
    Authorization: "Bot " + env.DISCORD_BOT_ID,
  };
  await fetch(
    "https://discord.com/api/guilds/" +
      env.DISCORD_GUILD_ID +
      "/members/" +
      userId +
      "/roles/" +
      roleId,
    {
      method: "DELETE",
      headers: headers,
    },
  );

  return { success: true };
};
