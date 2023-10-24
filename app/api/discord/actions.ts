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

export const CreateDiscordTeam = async (teamId: string) => {
  try {
    // Create the role with specified permissions
    const roleData = await createRole(teamId);
    console.log(`Role created successfully ${roleData}`);
    // Create the section and channels with permission overwrites
    await createSectionAndChannels(teamId, roleData.id);

    console.log(`Role created: ${roleData.name}`);
    return roleData.id;
  } catch (error) {
    console.error("An error occurred:", error);
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

  if (roleResponse.ok) {
    return await roleResponse.json();
  }
  return false;
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

  if (sectionResponse.ok) {
    const sectionData = await sectionResponse.json();

    console.log(sectionData.id);

    // Create text channels in the section
    for (const textChannelName of section.textChannels) {
      await createChannel(sectionData.id, textChannelName, 0, roleId);
    }

    // Create voice channels in the section
    for (const voiceChannelName of section.voiceChannels) {
      await createChannel(sectionData.id, voiceChannelName, 2, roleId);
    }
  } else {
    console.error("Error creating section:", sectionResponse.statusText);
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

  if (!channelResponse.ok) {
    console.error(
      `Error creating channel (${channelType}):`,
      channelResponse.statusText,
    );
  }
};
