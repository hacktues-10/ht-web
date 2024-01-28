"use server";

import { revalidateTag } from "next/cache";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";

import { getServerSideGrowthBook } from "~/app/_integrations/growthbook";
import { zact } from "~/app/_zact/server";
import {
  removeTeamMember,
  updateTechnologies,
} from "~/app/(full-layout)/teams/actions";
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
import {
  getParticipantById,
  getParticipantFromSession,
} from "~/app/participants/service";
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

  if (
    joinRequest &&
    joinRequest.id &&
    joinRequest.userId &&
    joinRequest.teamId
  ) {
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

      const partic = await getParticipantById(joinRequest.userId);

      if (partic?.isDisqualified) {
        return {
          success: false,
          message:
            "Не можете да се присъедините към отбор, защото сте дисквалифициран/а",
        };
      }

      if (partic?.team.id) {
        return {
          success: false,
          message: "Вече си в отбор, този не ти ли харесва",
        };
      }

      if (partic?.id) {
        cleanAllNotifications(partic?.id);
      } else {
        return {
          success: false,
          message: "Нещо се обърка, моля опитайте отново!",
        };
      }

      await cleanJoinRequests(joinRequest.id);

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
        .update(teams)
        .set({ memberCount: team.memberCount + 1 })
        .where(eq(teams.id, team.id));

      await updateTechnologies(joinRequest?.teamId);
      revalidateTag("teams");
      return { success: true };
    } catch (err) {
      await cleanJoinRequests(joinRequest.id);
      console.log(err);
      return { success: false };
    }
  }

  return { success: false };
};

const cleanJoinRequests = async (id: number) => {
  await db.delete(notifications).where(eq(notifications.referenceId, id));
  await db.delete(joinRequests).where(eq(joinRequests.id, id));
};

const cleanAllNotifications = async (id: number) => {
  await db.delete(notifications).where(eq(notifications.targetUserId, id));
  await db.delete(joinRequests).where(eq(joinRequests.userId, id));
  await db.delete(invitations).where(eq(invitations.invitedParticipantId, id));
};

// FIXME: use zact
export const declineJoinRequest = async (joinRequest: JoinRequest) => {
  if (joinRequest?.userId && joinRequest.teamId) {
    try {
      cleanJoinRequests(joinRequest.id);
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

const cleanInvitation = async (id: number) => {
  await db.delete(notifications).where(eq(notifications.referenceId, id));
  await db.delete(invitations).where(eq(invitations.id, id));
};

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

  const participant = await getParticipantFromSession();
  if (!participant) {
    return { success: false };
  }

  if (participant.isDisqualified) {
    return {
      success: false,
      message:
        "Не можете да се присъедините към отбор, защото сте дисквалифициран/а",
    };
  }

  if (participant.team.id) {
    return {
      success: false,
      message: "Вече си в отбор, този не ти ли харесва",
    };
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

    await cleanInvitation(invitationId);

    const res = await addDiscordRole(discord[0].discordId, team.discordRoleId);

    if (!res.success) {
      return { success: false };
    }

    cleanAllNotifications(participant.id);

    await db
      .update(particpants)
      .set({ teamId: invitation.teamId, isCaptain: false })
      .where(eq(particpants.id, participant.id));

    await db
      .update(teams)
      .set({ memberCount: team.memberCount + 1 })
      .where(eq(teams.id, team.id));

    await updateTechnologies(invitation.teamId);
    revalidateTag("teams");

    return { success: true };
  } catch (err) {
    console.log(err);
    await cleanInvitation(invitationId);
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
    await cleanInvitation(invitationId);
    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
});
