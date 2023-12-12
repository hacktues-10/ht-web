"use server";

import { and, eq, ilike, isNotNull, isNull, ne, not, or } from "drizzle-orm";
import { zact } from "zact/server";
import { z } from "zod";

import { getServerSideGrowthBook } from "~/app/_integrations/growthbook";
import {
  deleteChannelsRolesCategories,
  deleteRoleFromMember,
} from "~/app/api/discord/service";
import { db } from "~/app/db";
import {
  discordUsers,
  invitations,
  joinRequests,
  notifications,
  particpants,
  projects,
  teams,
} from "~/app/db/schema";
import {
  formatParticipantDiscordNick,
  getParticipantById,
  getParticipantFromSession,
  getParticipantsWithNoTeam,
  isParticipantStudent,
} from "~/app/participants/service";
import { getTeamById, isParticipantEligableToJoin } from "./service";

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

    await db
      .delete(invitations)
      .where(eq(invitations.teamId, participant.team.id));
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
      message:
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

  const team = await getTeamById(member.team.id);

  if (
    (participant.team.isCaptain || participant.team.id == member.team.id) &&
    participant.team.id &&
    team?.discordRoleId
  ) {
    await deleteRoleFromMember(team.discordRoleId, discordMember[0].discordId);
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

export async function makeCaptain(
  captainId: number | undefined,
  memberId: number,
) {
  try {
    if (captainId == memberId || !captainId) {
      return { success: false };
    }
    await db
      .update(particpants)
      .set({
        isCaptain: false,
      })
      .where(eq(particpants.id, captainId));

    await db
      .update(particpants)
      .set({
        isCaptain: true,
      })
      .where(eq(particpants.id, memberId));

    return { success: true };
  } catch (err) {
    return { success: false };
  }
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

export async function getProjectById(projectId: number | null) {
  if (projectId) {
    return (
      await db.select().from(projects).where(eq(projects.id, projectId))
    ).at(0);
  }
  return null;
}

export async function prepareParticipants(
  team: Exclude<Awaited<ReturnType<typeof getTeamById>>, null>,
  captainId: number | null,
) {
  if (!captainId) {
    return null;
  }

  const res: any[] = [];

  const dbResponse = await getParticipantsWithNoTeam();

  const inv = await db
    .select()
    .from(invitations)
    .where(eq(invitations.senderParticipantId, captainId));

  dbResponse.forEach((user) => {
    const isInvited = inv.some(
      (invite) => invite.invitedParticipantId === user.id,
    );
    const fullName = formatNick(user);

    if (isParticipantEligableToJoin(user, team) && !isInvited) {
      res.push({ ...user, label: fullName, value: `${user.id}` });
    }
  });

  return res;
}

const formatNick = (user: any) => {
  if (isParticipantStudent(user)) {
    return `${user.firstName} ${user.lastName} (${user.grade}${user.parallel})`;
  } else {
    return `${user.firstName} ${user.lastName} (ТУЕС'${user.grade})`;
  }
};

export async function testInsertProject() {
  await db.insert(projects).values({
    name: "test name",
    description: "test description",
    technologies: "testtechnologies",
    websiteURL: "http://localhost:8080",
  });

  await db
    .update(teams)
    .set({ projectId: 1 })
    .where(eq(teams.id, "what-the-fuck"));
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

export async function getConfirmedTeamsNumber(isAlumni: boolean) {
  const teamsNumber = await db
    .select()
    .from(teams)
    .where(eq(teams.isAlumni, isAlumni));

  const minMembers = isAlumni ? 2 : 3;
  const maxMembers = isAlumni ? 3 : 5;

  const teamsNumberFinal = teamsNumber.filter((team) => {
    return team.memberCount >= minMembers && team.memberCount <= maxMembers;
  });

  return teamsNumberFinal.length;
}
