import invariant from "tiny-invariant";

import { env } from "~/app/env.mjs";

export const discordRedirectUri = `${env.NEXTAUTH_URL}/api/discord/callback`;

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

export const createDiscordTeam = async (teamId: string) => {
  try {
    // Create the role with specified permissions
    const roleData = await createRole(teamId);
    // Create the section and channels with permission overwrites
    await createSectionAndChannels(teamId, roleData.id);

    return roleData.id;
  } catch (error) {
    invariant(false, `An error occurred: ${error}`);
  }
};

const createRole = async (teamId: string) => {
  const headers = {
    Authorization: "Bot " + env.DISCORD_BOT_ID,
    "Content-Type": "application/json",
  };

  const params = {
    name: teamId,
    permissions: 1048576,
    mentionable: true,
  };

  const roleResponse = await fetch(
    "https://discord.com/api/guilds/" + env.DISCORD_GUILD_ID + "/roles",
    {
      headers: headers,
      method: "POST",
      body: JSON.stringify(params),
    },
  );
  invariant(roleResponse.ok, "Bad role response");

  return await roleResponse.json();
};

const createSectionAndChannels = async (teamId: string, roleId: string) => {
  const section = {
    name: "Team " + teamId,
    textChannels: [teamId],
    voiceChannels: [teamId],
  };

  const sectionResponse = await fetch(
    `https://discord.com/api/v10/guilds/${env.DISCORD_GUILD_ID}/channels`,
    {
      method: "POST",
      headers: {
        Authorization: `Bot ${env.DISCORD_BOT_ID}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: section.name,
        type: 4,
        permission_overwrites: [
          {
            id: env.DISCORD_GUILD_ID, // @everyone
            type: 0,
            deny: 1024, // VIEW_CHANNEL (allow viewing for the role)
          },
          {
            id: roleId,
            type: 0,
            allow: 1024,
          },
        ],
      }),
    },
  );

  invariant(
    sectionResponse.ok,
    `Error creating section: ${sectionResponse.statusText}`,
  );

  const sectionData = await sectionResponse.json();

  // Create text channels in the section
  for (const textChannelName of section.textChannels) {
    await createChannel(sectionData.id, textChannelName, 0, roleId);
  }

  // Create voice channels in the section
  for (const voiceChannelName of section.voiceChannels) {
    await createChannel(sectionData.id, voiceChannelName, 2, roleId);
  }
};

const createChannel = async (
  parentId: string,
  channelName: string,
  channelType: number,
  roleId: string,
) => {
  const params = JSON.stringify({
    name: channelName,
    type: channelType,
    parent_id: parentId,
    permission_overwrites: [
      {
        id: env.DISCORD_GUILD_ID,
        type: 0,
        deny: 1024,
      },
      {
        id: roleId,
        type: 0,
        allow: 1024,
      },
    ],
  });

  const channelResponse = await fetch(
    `https://discord.com/api/v10/guilds/${env.DISCORD_GUILD_ID}/channels`,
    {
      method: "POST",
      headers: {
        Authorization: `Bot ${env.DISCORD_BOT_ID}`,
        "Content-Type": "application/json",
      },
      body: params,
    },
  );

  invariant(
    channelResponse.ok,
    `Error creating channel (${channelType}): ${channelResponse.statusText}`,
  );
};

export const deleteChannelsRolesCategories = async (teamId: string) => {
  const rolesResponse = await fetch(
    `https://discord.com/api/guilds/${env.DISCORD_GUILD_ID}/roles`,
    {
      method: "GET",
      headers: {
        Authorization: `Bot ${env.DISCORD_BOT_ID}`,
      },
    },
  );

  const channelsResponse = await fetch(
    `https://discord.com/api/guilds/${env.DISCORD_GUILD_ID}/channels`,
    {
      method: "GET",
      headers: {
        Authorization: `Bot ${env.DISCORD_BOT_ID}`,
      },
    },
  );

  invariant(
    rolesResponse.ok || channelsResponse.ok,
    "Channel or roles response error",
  );
  const rolesData = await rolesResponse.json();
  const channelsData = await channelsResponse.json();
  console.log(rolesData);

  for (const role of rolesData) {
    if (role.name === teamId) {
      await deleteRole(role.id);
    }
  }

  for (const channel of channelsData) {
    if (channel.name === teamId || channel.name === `Team ${teamId}`) {
      await deleteChannel(channel.id);
    }
  }
};

const deleteChannel = async (channelId: string) => {
  const channelResponse = await fetch(
    `https://discord.com/api/channels/${channelId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bot ${env.DISCORD_BOT_ID}`,
      },
    },
  );

  invariant(
    channelResponse.ok,
    `Error deleting channel ${channelId}: ${channelResponse.statusText}`,
  );
};

const deleteRole = async (roleId: string) => {
  const roleResponse = await fetch(
    `https://discord.com/api/guilds/${env.DISCORD_GUILD_ID}/roles/${roleId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bot ${env.DISCORD_BOT_ID}`,
      },
    },
  );

  invariant(
    roleResponse.ok,
    `Error deleting role ${roleId}: ${roleResponse.statusText}`,
  );
};

export const deleteRoleFromMember = async (roleId: string, userId: string) => {
  const deleteRoleResponse = await fetch(
    `https://discord.com/api/guilds/${env.DISCORD_GUILD_ID}/members/${userId}/roles/${roleId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bot ${env.DISCORD_BOT_ID}`,
      },
    },
  );

  invariant(
    deleteRoleResponse.ok,
    `Error deleting role ${roleId}: ${deleteRoleResponse.statusText}`,
  );
};
