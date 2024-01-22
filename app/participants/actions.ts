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
} from "../db/schema";
import { env } from "../env.mjs";

interface ParticipantAdmin {
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

interface Participant {
  label: string;
  value: string;
  id: number;
  firstName: string;
  lastName: string;
  grade: string;
  parallel: string;
  technologies: string;
}

export function getParticipantIdByValue(
  value: string,
  participants: Participant[] | null,
) {
  return (
    participants?.find((participant) => participant.value == value)?.id ?? 0
  );
}

export async function disqualifyParticipantById(id: number) {
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

export function perpareParticipantAdmin(particpants: ParticipantAdmin[]) {
  const convertTshirt = (tshirtId: number | null) => {
    switch (tshirtId) {
      case 1:
        return "S";
      case 2:
        return "M";
      case 3:
        return "L";
      case 4:
        return "XL";
      case 5:
        return "XXL";
      default:
        return "No t-shirt";
    }
  };

  return particpants.map((participant) => {
    return {
      ...participant,
      tshirt: convertTshirt(participant.tshirt),
      isCaptain: participant.isCaptain ? "Yes" : "No",
      isLookingForTeam: participant.isLookingForTeam ? "Yes" : "No",
      isDisqualified: participant.isDisqualified ? "Yes" : "No",
      createdAt: participant.createdAt.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
  });
}

export type PrepareParticipants = Awaited<
  ReturnType<typeof perpareParticipantAdmin>
>;

export const formatNick = (user: any): string => {
  if (user.grade.length <= 2) {
    return `${user.firstName} ${user.lastName} (${user.grade}${user.parallel})`;
  } else {
    return `${user.firstName} ${user.lastName} (ТУЕС'${user.grade})`;
  }
};
