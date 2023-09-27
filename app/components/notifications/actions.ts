"use server";

import { eq } from "drizzle-orm";
import { zact } from "zact/server";
import { z } from "zod";

import { db } from "~/app/db";
import {
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

// FIXME: use zact
export const acceptJoinRequest = async (
  joinRequest: JoinRequest | undefined
) => {
  console.log(joinRequest);

  if (joinRequest?.userId && joinRequest.teamId) {
    try {
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
  })
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
  })
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
