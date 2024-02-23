"use server";

import { eq } from "drizzle-orm";

import { getAdminFromSession } from "../(full-layout)/api/%5F%D0%B0%D0%B4%D0%BC%D0%B8%D0%BD/service";
import { removeTeamMember } from "../(full-layout)/teams/actions";
import { db } from "../db";
import {
  discordUsers,
  invitations,
  joinRequests,
  notifications,
  particpants,
  teams,
  users,
} from "../db/schema";
import { env } from "../env.mjs";
import { getParticipantByEmail } from "./service";

interface Participant {
  label: string;
  value: string;
  team: string | null;
  firstName: string;
  middleName: string | null;
  lastName: string;
  email: string | null;
  phoneNumber: string;
  grade: string;
  parallel: string;
  isLookingForTeam: boolean;
  tshirt: number | null;
  isCaptain: boolean;
  isDisqualified: boolean;
  createdAt: Date;
  discordUser: string | null;
}

export async function disqualifyParticipantByEmail(email: string) {
  const id = (await getParticipantByEmail(email))?.id;
  if (!id) {
    return { success: false, message: "no such participant" };
  }
  const admin = await getAdminFromSession();
  if (!admin) {
    return { success: false, message: "not admin" };
  }

  const participant = (
    await db.select().from(particpants).where(eq(particpants.id, id))
  ).at(0);

  if (!participant?.id) {
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
    await db.delete(discordUsers).where(eq(discordUsers.participantId, id));
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
  if (!admin) {
    return false;
  }

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
