"use server";

import { error } from "console";

import { revalidateTag } from "next/cache";
import { and, eq } from "drizzle-orm";
import invariant from "tiny-invariant";
import { z } from "zod";

import { getServerSideGrowthBook } from "~/app/_integrations/growthbook";
import { zact } from "~/app/_zact/server";
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
  hasInvitationFromTeam,
  isParticipantStudent,
} from "~/app/participants/service";
import { getAdminFromSession } from "../api/%5F%D0%B0%D0%B4%D0%BC%D0%B8%D0%BD/service";
import {
  checkIfTeamEligableToJoin,
  getTeamById,
  isParticipantEligableToJoin,
} from "./service";

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

    await db.delete(projects).where(eq(projects.teamId, participant.team.id));

    const team = await db
      .delete(teams)
      .where(eq(teams.id, participant?.team.id))
      .returning();

    revalidateTag("teams");

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

  const team = await getTeamById(teamIdToJoin);

  if (!team) {
    return { success: false, error: "Няма такъв отбор" };
  }

  const minMembers = team.isAlumni ? 2 : 3;
  const maxMembers = team.isAlumni ? 3 : 5;

  if (team.memberCount < minMembers || team.memberCount > maxMembers) {
    const res = await checkIfTeamEligableToJoin(team.isAlumni);
    if (!res) return { success: false, error: "Отборите са запълнени." };
  }

  const participant = await getParticipantFromSession();
  if (!participant) {
    return { success: false, error: "Не си влязъл като участник" };
  }

  if (participant.isDisqualified) {
    return {
      success: false,
      message:
        "Не можеш да се присъединиш към отбор, защото си дисквалифициран",
    };
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
  const hasInvitation = await hasInvitationFromTeam(
    invitedParticipantId,
    teamId,
  );
  if (hasInvitation) {
    return {
      success: false,
      error: "Този участник вече е поканен.",
    };
  }

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

  if (!team) {
    return { success: false, error: "Няма такъв отбор" };
  }

  if (!participant.team.isCaptain || participant.team.id != teamId) {
    return {
      success: false,
      error: "Само капитана на този отбор може да кани участници",
    };
  }

  const minMembers = team.isAlumni ? 2 : 3;
  const maxMembers = team.isAlumni ? 3 : 5;

  if (team.memberCount < minMembers || team.memberCount > maxMembers) {
    const res = await checkIfTeamEligableToJoin(team.isAlumni);
    if (!res) return { success: false, error: "Отборите са запълнени." };
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
  try {
    const gb = await getServerSideGrowthBook();
    if (gb.isOff("update-team-members")) {
      return {
        success: false,
        message:
          "Премахването на участници от отбори не е позволено по това време.",
      };
    }

    const participant = await getParticipantFromSession();
    const admin = await getAdminFromSession();
    if (!participant?.id && !admin) {
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
      ((participant?.team.isCaptain &&
        participant?.team.id == member.team.id &&
        participant.team.id) ||
        admin?.userId) &&
      team?.discordRoleId
    ) {
      await deleteRoleFromMember(
        team.discordRoleId,
        discordMember[0].discordId,
      );
      const res = await db
        .update(particpants)
        .set({ teamId: null, isCaptain: false })
        .where(eq(particpants.id, memberId));
      await updateTechnologies(member.team.id);
      await db
        .update(teams)
        .set({ memberCount: team.memberCount - 1 })
        .where(eq(teams.id, team.id));

      if (team.memberCount - 1 == 0) {
        await deleteChannelsRolesCategories(team.id);
        await db.delete(teams).where(eq(teams.id, team.id));
      }
      revalidateTag("teams");

      if (res) {
        return { success: true };
      }
      return { success: false, message: "Failed to remove team member" };
    }
    return { success: false, message: "You are not a team captain" };
  } catch (e) {
    return { success: false, message: e instanceof Error ? e.message : "" };
  }
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

    revalidateTag("teams");
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
  revalidateTag("teams");
}

export async function getProjectByTeamId(teamId: string) {
  if (teamId) {
    return (
      await db.select().from(projects).where(eq(projects.teamId, teamId))
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

  const dbResponse = await getParticipantsWithNoTeam(true);

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
      res.push({
        ...user,
        label: fullName,
        value: `${fullName.toLowerCase()}`,
      });
    }
  });
  const result = res.map((user) => {
    return {
      label: user.label,
      value: user.value,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      grade: user.grade,
      parallel: user.parallel,
      technologies: user.technologies,
    };
  });
  return result;
}

const formatNick = (user: any) => {
  if (isParticipantStudent(user)) {
    return `${user.firstName} ${user.lastName} (${user.grade}${user.parallel})`;
  } else {
    return `${user.firstName} ${user.lastName} (ТУЕС'${user.grade})`;
  }
};

export async function createProject(project: {
  teamId: string;
  name: string;
  description: string;
  websiteURL: string;
}) {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("create-project")) {
    return {
      success: false,
      message: "Създаването на проекти не е позволено по това време.",
    };
  }
  try {
    await db.insert(projects).values({
      name: project.name,
      description: project.description,
      technologies: "",
      websiteURL: project.websiteURL,
      teamId: project.teamId,
    });

    return { success: true, message: "Успешно създадохте проекта" };
  } catch (e) {
    return { success: false, message: "Опа, нещо се обърка" };
  }
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
