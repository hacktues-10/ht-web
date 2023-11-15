"use server";

import { and, eq } from "drizzle-orm";
import { zact } from "zact/server";
import { string, z } from "zod";

import { getServerSideGrowthBook } from "~/app/_integrations/growthbook";
import { addDiscordRole, removeDiscordRole } from "~/app/api/discord/service";
import { db } from "~/app/db";
import {
  discordUsers,
  invitations,
  joinRequests,
  notifications,
  particpants,
} from "~/app/db/schema";
import { getParticipantFromSession } from "~/app/participants/service";

interface JoinRequest {
  id: number;
  userId: number;
  teamId: string;
}

const roleId = "1166396007718867054";

// FIXME: should we move this to the teams actions.ts?

// FIXME: use zact
export const acceptJoinRequest = async (
  joinRequest: JoinRequest | undefined,
) => {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("update-team-members")) {
    return {
      success: false,
      error:
        "Промяната на участниците в отборите не е позволена по това време.",
    };
  }

  if (joinRequest?.userId && joinRequest.teamId) {
    try {
      const discord = await db
        .select()
        .from(discordUsers)
        .where(eq(discordUsers.participantId, joinRequest.userId));
      if (!discord[0].discordId || !discord[0].accessToken) {
        return { success: false };
      }
      const res = await addDiscordRole(discord[0].discordId, roleId);

      if (!res.success) {
        return { success: false };
      }

      await db
        .update(particpants)
        .set({ teamId: joinRequest?.teamId, isCaptain: false })
        .where(eq(particpants.id, joinRequest?.userId));

      await db
        .delete(notifications)
        .where(eq(notifications.referenceId, joinRequest?.id));

      await db.delete(joinRequests).where(eq(joinRequests.id, joinRequest.id));

      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }
  return { success: false };
};

// FIXME: use zact
export const declineJoinRequest = async (joinRequest: JoinRequest) => {
  console.log(joinRequest);
  if (joinRequest?.userId && joinRequest.teamId) {
    try {
      await db
        .delete(notifications)
        .where(eq(notifications.referenceId, joinRequest?.id));

      await db.delete(joinRequests).where(eq(joinRequests.id, joinRequest.id));
      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }
  return { success: false };
};

function getInvitation(id: number) {
  return db
    .select()
    .from(invitations)
    .where(eq(invitations.id, id))
    .then((rows) => rows.at(0) ?? null);
}

export const acceptInvitation = zact(
  z.object({
    invitationId: z.number().int(),
  }),
)(async ({ invitationId }) => {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("update-team-members")) {
    return {
      success: false,
      error:
        "Промяната на участниците в отборите не е позволена по това време.",
    };
  }

  const particpant = await getParticipantFromSession();
  if (!particpant) {
    return { success: false };
  }
  if (particpant.team.id) {
    return { success: false };
  }

  const invitation = await getInvitation(invitationId);
  if (!invitation) {
    return { success: false };
  }

  try {
    const discord = await db
      .select()
      .from(discordUsers)
      .where(eq(discordUsers.participantId, invitation.invitedParticipantId));
    if (!discord[0].discordId || !discord[0].accessToken) {
      return { success: false };
    }

    const res = await addDiscordRole(discord[0].discordId, roleId);

    if (!res.success) {
      return { success: false };
    }

    await db
      .update(particpants)
      .set({ teamId: invitation.teamId, isCaptain: false })
      .where(eq(particpants.id, particpant.id));

    await db
      .delete(notifications)
      .where(eq(notifications.referenceId, invitationId));

    await db.delete(invitations).where(eq(invitations.id, invitationId));
    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
});

export const declineInvitation = zact(
  z.object({
    invitationId: z.number().int(),
  }),
)(async ({ invitationId }) => {
  const particpant = await getParticipantFromSession();
  if (!particpant) {
    return { success: false };
  }
  if (particpant.team.id) {
    return { success: false };
  }

  const invitation = await getInvitation(invitationId);
  if (!invitation) {
    return { success: false };
  }

  try {
    await db
      .delete(notifications)
      .where(eq(notifications.referenceId, invitationId));

    await db.delete(invitations).where(eq(invitations.id, invitationId));
    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
});
