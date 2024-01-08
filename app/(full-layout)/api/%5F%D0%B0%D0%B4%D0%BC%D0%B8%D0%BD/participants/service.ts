"use server";

import { eq } from "drizzle-orm";

import { removeTeamMember } from "~/app/(full-layout)/teams/actions";
import { db } from "~/app/db";
import {
  discordUsers,
  invitations,
  joinRequests,
  notifications,
  particpants,
} from "~/app/db/schema";
import { env } from "~/app/env.mjs";
import { getAdminFromSession } from "../service";

export async function getParticipantsAdmin() {
  const admin = await getAdminFromSession();
  if (!admin) {
    return [];
  }

  const participants = await db.select().from(particpants);

  return participants.map((participant) => ({
    ...participant,
    createdAt: participant.createdAt.toISOString(),
    isLookingForTeam: participant.isLookingForTeam ? "Yes" : "No",
    isDisqualified: participant.isDisqualified ? "Yes" : "No",
    isCaptain: participant.isCaptain ? "Yes" : "No",
  }));
}

export async function disqualifyParticipantById(id: number) {
  console.log("id", id);

  const admin = await getAdminFromSession();
  if (!admin) {
    return { success: false, message: "not admin" };
  }

  const participant = (
    await db.select().from(particpants).where(eq(particpants.id, id))
  ).at(0);

  if (!participant) {
    return { success: false, message: "no such participant" };
  }
  try {
    //deleting notifications, invitations, join requests
    await db.delete(notifications).where(eq(notifications.targetUserId, id));
    await db
      .delete(invitations)
      .where(eq(invitations.invitedParticipantId, id));
    await db.delete(joinRequests).where(eq(joinRequests.userId, id));

    // //removing the member from the team and setting isLookingForTeam to false
    removeTeamMember(participant.id);

    await db
      .update(particpants)
      .set({ isLookingForTeam: false, isDisqualified: true })
      .where(eq(particpants.id, id));

    //banning the member from discord
    const res = await banMember(id, admin);
    if (!res) {
      return { success: false, message: "error in discord ban" };
    }
    console.log("banned from discord");
    await db.delete(discordUsers).where(eq(discordUsers.participantId, id));
    console.log("deleted from discord users");
    return { success: true, message: "" };
  } catch (e) {
    console.error(JSON.stringify(e));
    return { success: false, message: "ERROR, CONTACT IT DEPARTMENT" };
  }
}

async function banMember(
  id: number,
  admin: Awaited<ReturnType<typeof getAdminFromSession>>,
) {
  const discordInfo = (
    await db
      .select()
      .from(discordUsers)
      .where(eq(discordUsers.participantId, id))
  ).at(0);

  if (!discordInfo) {
    return true;
  }

  try {
    const response = await fetch(
      `https://discord.com/api/v10/guilds/${env.DISCORD_GUILD_ID}/bans/${discordInfo?.discordId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bot ${env.DISCORD_BOT_ID}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          delete_message_days: 1,
        }),
      },
    );

    if (response.status === 204) {
      return true;
    }
    return false;
  } catch (e) {
    console.error(JSON.stringify(e));
    return false;
  }
}
