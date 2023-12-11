"use server";

import { eq, sql } from "drizzle-orm";
import { zact } from "zact/server";
import { z } from "zod";

import { getServerSideGrowthBook } from "~/app/_integrations/growthbook";
import { updateTechnologies } from "~/app/(full-layout)/teams/actions";
import { addDiscordRole } from "~/app/api/discord/service";
import { db } from "~/app/db";
import {
  discordUsers,
  invitations,
  joinRequests,
  notifications,
  particpants,
  teams,
} from "~/app/db/schema";
import { getParticipantFromSession } from "~/app/participants/service";
import { getNotificationsOfParticipant } from "./service";

export const getNotifications = async () => {
  const participant = await getParticipantFromSession();
  if (!participant) return [];
  return getNotificationsOfParticipant(participant);
};

// FIXME: why is this here?
export const handleAcceptedJoinRequest = () => {};

interface JoinRequest {
  id: number;
  userId: number;
  teamId: string;
}

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
      const team = (
        await db.select().from(teams).where(eq(teams.id, joinRequest.teamId))
      ).at(0);
      if (!team?.discordRoleId) {
        return { success: false, message: "Team does not have a Discord role" };
      }
      const discord = await db
        .select()
        .from(discordUsers)
        .where(eq(discordUsers.participantId, joinRequest.userId));
      if (!discord[0].discordId || !discord[0].accessToken) {
        return { success: false };
      }
      const res = await addDiscordRole(
        discord[0].discordId,
        team?.discordRoleId,
      );

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
      await updateTechnologies(joinRequest?.teamId);

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
    const team = (
      await db.select().from(teams).where(eq(teams.id, invitation.teamId))
    ).at(0);
    if (!team?.discordRoleId) {
      return { success: false, message: "Team does not have a Discord role" };
    }
    const discord = await db
      .select()
      .from(discordUsers)
      .where(eq(discordUsers.participantId, invitation.invitedParticipantId));
    if (!discord[0].discordId || !discord[0].accessToken) {
      return { success: false };
    }

    const res = await addDiscordRole(discord[0].discordId, team.discordRoleId);

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

    await updateTechnologies(invitation.teamId);

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
