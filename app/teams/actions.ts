"use server";

import { and, eq } from "drizzle-orm";
import { zact } from "zact/server";
import { z } from "zod";

import {
  discordUsers,
  invitations,
  joinRequests,
  notifications,
  particpants,
  teams,
} from "~/app/db/schema";
import { getServerSideGrowthBook } from "../_integrations/growthbook";
import {
  deleteChannelsRolesCategories,
  deleteRoleFromMember,
} from "../api/discord/service";
import { db } from "../db";
import {
  getParticipantById,
  getParticipantFromSession,
} from "../participants/service";
import { getTeamById } from "./service";

export async function deleteMyTeam() {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("update-team-details")) {
    return {
      success: false,
      error: "Изтриването на отбори не е позволено по това време.",
    };
  }

  const participant = await getParticipantFromSession();

  if (!participant) {
    return { success: false, error: "Не си влязъл като участник" };
  }
  if (!participant.team.isCaptain || !participant.team.id) {
    return {
      success: false,
      error: "Само капитанът на този отбор може да го изтрие",
    };
  }

  try {
    await deleteChannelsRolesCategories(participant.team.id);

    await db
      .delete(joinRequests)
      .where(eq(joinRequests.teamId, participant.team.id));
    // await db.delete(notifications).where(eq(notifications.));
    await db
      .update(particpants)
      .set({ teamId: null, isCaptain: false })
      .where(eq(particpants.teamId, participant.team.id));

    await db
      .delete(teams)
      .where(eq(teams.id, participant?.team.id))
      .returning();
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, message: e };
  }
}

// FIXME: use zact
export async function askToJoinTeam(teamIdToJoin: string) {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("update-team-members")) {
    return {
      success: false,
      error: "Присъединяването към отбори не е позволено по това време.",
    };
  }

  const participant = await getParticipantFromSession();
  if (!participant) {
    return { success: false, error: "Не си влязъл като участник" };
  }
  if (participant.team.id) {
    return { success: false, error: "Вече си в отбор" };
  }

  try {
    const res = await db
      .insert(joinRequests)
      .values({
        userId: participant.id,
        teamId: teamIdToJoin,
      })
      .returning();

    console.log(res[0]);

    const captain = await db
      .select()
      .from(particpants)
      .where(
        and(
          eq(particpants.isCaptain, true),
          eq(particpants.teamId, teamIdToJoin),
        ),
      );

    await db.insert(notifications).values({
      targetUserId: captain[0].id,
      referenceId: res[0].id,
      type: "ask_join",
    });
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false };
  }
}

export const inviteToTeam = zact(
  z.object({
    invitedParticipantId: z.number(),
    teamId: z.string(),
  }),
)(async ({ invitedParticipantId, teamId }) => {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("update-team-members")) {
    return {
      success: false,
      error: "Поканването на участници в отбори не е позволено по това време.",
    };
  }

  const participant = await getParticipantFromSession();
  const team = await getTeamById(teamId);
  if (!participant) {
    return { success: false, error: "Не си влязъл като участник" };
  }
  if (!participant.team.isCaptain || participant.team.id != teamId) {
    return {
      success: false,
      error: "Само капитана на този отбор може да кани участници",
    };
  }

  const invitedParticipant = await getParticipantById(invitedParticipantId);
  if (
    !invitedParticipant ||
    invitedParticipant.team.id !== null ||
    !invitedParticipant.isLookingForTeam
  ) {
    return { success: false, error: "Този участник не може да бъде поканен" };
  }

  if (
    invitedParticipant.grade &&
    ((team?.isAlumni && parseInt(invitedParticipant?.grade) < 13) ||
      (team?.isAlumni == false && parseInt(invitedParticipant?.grade) > 12))
  ) {
    return { success: false, error: "Този участник не може да бъде поканен" };
  }
  try {
    const res = await db
      .insert(invitations)
      .values({
        invitedParticipantId: invitedParticipant.id,
        senderParticipantId: participant.id,
        teamId,
      })
      .returning();

    await db.insert(notifications).values({
      targetUserId: invitedParticipantId,
      referenceId: res[0].id,
      type: "invitation",
    });
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false };
  }
});

// XXX: do we need this? can we fetch in the server component?
/** @deprecated */
export const checkStateJoinRequests = zact(
  z.object({
    targetTeamId: z.string(),
  }),
)(async ({ targetTeamId }) => {
  const participant = await getParticipantFromSession();
  if (!participant) {
    return false;
  }

  try {
    const res = await db
      .select()
      .from(joinRequests)
      .where(
        and(
          eq(joinRequests.userId, participant?.id),
          eq(joinRequests.teamId, targetTeamId),
        ),
      );
    if (res.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
});

// FIXME: use zact
export async function removeTeamMember(memberId: number) {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("update-team-members")) {
    return {
      success: false,
      error:
        "Премахването на участници от отбори не е позволено по това време.",
    };
  }

  const participant = await getParticipantFromSession();
  if (!participant?.id) {
    return { success: false, message: "Unauthenticated" };
  }
  const member = await getParticipantById(memberId);
  if (!member?.team.id) {
    return { success: false, message: "The member is not part of this team" };
  }

  const discordMember = await db
    .select()
    .from(discordUsers)
    .where(eq(discordUsers.participantId, member.id));
  if (!discordMember[0].discordId)
    return {
      success: false,
      message: "The member does not have discord account",
    };

  if (participant.team.isCaptain && participant.team.id == member.team.id) {
    await deleteRoleFromMember(member.team.id, discordMember[0].discordId);
    const res = await db
      .update(particpants)
      .set({ teamId: null, isCaptain: false })
      .where(eq(particpants.id, memberId));
    await updateTechnologies(participant.team.id);
    if (res) {
      return { success: true };
    }
    return { success: false, message: "Failed to remove team member" };
  }
  return { success: false, message: "You are not a team captain" };
}

// FIXME: do we need this? can we fetch in the server component?
export async function getTeamMembers(teamId: string) {
  const res = await db
    .select()
    .from(particpants)
    .where(eq(particpants.teamId, teamId));
  return res;
}

export async function updateTechnologies(teamId: string) {
  const members = await getTeamMembers(teamId);
  const allTechnologies = members.flatMap(
    (member) => member.technologies?.split(", "),
  );
  const uniqueTechnologies = [...new Set(allTechnologies)];
  const technologiesString = uniqueTechnologies.join(", ");
  await db
    .update(teams)
    .set({ technologies: technologiesString })
    .where(eq(teams.id, teamId));
}

export async function isTeamFull(teamId: string) {
  const team = (await db.select().from(teams).where(eq(teams.id, teamId)))[0];
  if (
    (team.isAlumni && team.memberCount == 3) ||
    (!team.isAlumni && team.memberCount == 5)
  ) {
    return true;
  }
  return false;
}
