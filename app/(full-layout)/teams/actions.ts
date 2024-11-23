"use server";

import { error } from "console";

import { revalidateTag } from "next/cache";
import { and, eq } from "drizzle-orm";
import invariant from "tiny-invariant";
import { slugify } from "transliteration";
import { z } from "zod";

import {
  MAX_TEAM_MEMBERS_STUDENTS,
  MIN_TEAM_MEMBERS_STUDENTS,
} from "~/app/_configs/hackathon";
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
import { env } from "~/app/env.mjs";
import {
  formatParticipantDiscordNick,
  getParticipantById,
  getParticipantFromSession,
  hasInvitationFromTeam,
  isParticipantStudent,
} from "~/app/participants/service";
import { getAdminFromSession } from "../api/%5F%D0%B0%D0%B4%D0%BC%D0%B8%D0%BD/service";
import {
  createProjectSchema,
  updateFallbackGitHubReposSchema,
  updateProjectSchema,
  updateWebsiteUrlSchema,
} from "./[id]/project/schemas";
import {
  checkIfTeamEligableToJoin,
  getPreparedParticipants,
  getProjectByTeamId,
  getTeamById,
  isParticipantEligableToJoin,
  Team,
  updateProject,
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

export async function deleteTeamAdmin(teamId: string) {
  const admin = await getAdminFromSession();

  if (!admin) {
    return { success: false, error: "Не си влязъл като админ" };
  }

  try {
    await deleteChannelsRolesCategories(teamId);

    await db.delete(joinRequests).where(eq(joinRequests.teamId, teamId));

    await db.delete(invitations).where(eq(invitations.teamId, teamId));
    await db
      .update(particpants)
      .set({ teamId: null, isCaptain: false })
      .where(eq(particpants.teamId, teamId));

    await db.delete(projects).where(eq(projects.teamId, teamId));

    const team = await db.delete(teams).where(eq(teams.id, teamId)).returning();

    revalidateTag("teams");

    return { success: true, message: "Успешно изтрихте отбор" };
  } catch (e) {
    console.log(e);
    return { success: false, message: e instanceof Error ? e.message : "" };
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

  const minMembers = MIN_TEAM_MEMBERS_STUDENTS;
  const maxMembers = MAX_TEAM_MEMBERS_STUDENTS;

  if (team.memberCount < minMembers || team.memberCount > maxMembers) {
    const res = await checkIfTeamEligableToJoin();
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
        "Не можете да се присъедините към отбор, защото сте дисквалифициран/а",
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

  const minMembers = MIN_TEAM_MEMBERS_STUDENTS;
  const maxMembers = MAX_TEAM_MEMBERS_STUDENTS;

  if (team.memberCount < minMembers || team.memberCount > maxMembers) {
    const res = await checkIfTeamEligableToJoin();
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

  if (invitedParticipant.grade && parseInt(invitedParticipant?.grade) > 12) {
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

async function deleteNotifications(teamId: string) {
  const [selectedJoinReq, selectedInvitations] = await Promise.all([
    db.select().from(joinRequests).where(eq(joinRequests.teamId, teamId)),
    db.select().from(invitations).where(eq(invitations.teamId, teamId)),
  ]);

  const joinReqIds = selectedJoinReq.map((req) => req.id);
  const invitationIds = selectedInvitations.map((invitation) => invitation.id);

  for (const id of joinReqIds) {
    await db
      .delete(notifications)
      .where(and(eq(notifications.id, id), eq(notifications.type, "ask_join")));
  }

  for (const id of invitationIds) {
    await db
      .delete(notifications)
      .where(
        and(eq(notifications.id, id), eq(notifications.type, "invitation")),
      );
  }

  await Promise.all([
    db.delete(joinRequests).where(eq(joinRequests.teamId, teamId)),
    db.delete(invitations).where(eq(invitations.teamId, teamId)),
  ]);
}

export async function renameTeam({
  teamId,
  name,
}: {
  teamId: string;
  name: string;
}) {
  const team = await getTeamById(teamId);
  if (!team) {
    return { success: false, message: "Няма такъв отбор" };
  }

  try {
    const participants = await db
      .update(particpants)
      .set({
        teamId: null,
      })
      .where(eq(particpants.teamId, teamId))
      .returning();

    await deleteNotifications(teamId);

    await db
      .update(teams)
      .set({ name: name, id: slugify(name) })
      .where(eq(teams.id, teamId))
      .returning();

    for (const participant of participants) {
      await db
        .update(particpants)
        .set({ teamId: slugify(name) })
        .where(eq(particpants.id, participant.id));
    }

    revalidateTag("teams");

    return { success: true, message: "Успешно преименувахте отбора" };
  } catch (e) {
    return { success: false, message: "Неуспешно преименуване на отбора" };
  }
}

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

export async function leaveTeam() {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("update-team-members")) {
    return {
      success: false,
      message: "Напускането на отбори не е позволено по това време.",
    };
  }

  const participant = await getParticipantFromSession();
  if (!participant) {
    return { success: false, message: "Unauthenticated" };
  }

  if (!participant.team.id) {
    return { success: false, message: "You are not in a team" };
  }

  try {
    const res = await db
      .update(particpants)
      .set({ teamId: null, isCaptain: false })
      .where(eq(particpants.id, participant.id));

    await updateTechnologies(participant.team.id);

    const team = await getTeamById(participant.team.id);
    if (!team) {
      return { success: false, message: "Team not found" };
    }
    await db
      .update(teams)
      .set({ memberCount: team?.memberCount - 1 })
      .where(eq(teams.id, participant.team.id));

    if (team?.memberCount - 1 == 0) {
      await deleteChannelsRolesCategories(participant.team.id);
      await db.delete(teams).where(eq(teams.id, participant.team.id));
    }
    revalidateTag("teams");

    if (res) {
      return { success: true };
    }
    return { success: false, message: "Failed to leave team" };
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
  const allTechnologies = members.flatMap((member) =>
    member.technologies?.split(", "),
  );
  const uniqueTechnologies = [...new Set(allTechnologies)];
  const technologiesString = uniqueTechnologies.join(", ");
  await db
    .update(teams)
    .set({ technologies: technologiesString })
    .where(eq(teams.id, teamId));
  revalidateTag("teams");
}

export const prepareParticipants = zact(
  z.object({
    teamId: z.string(),
    captainId: z.number().nullable(),
  }),
)(async ({ teamId, captainId }) => {
  const team = await getTeamById(teamId);
  if (!team) {
    return [];
  }
  return getPreparedParticipants(team, captainId);
});

export const createProject = zact(createProjectSchema)(async (project: {
  teamId: string;
  name: string;
  description: string;
}) => {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("create-project")) {
    return {
      success: false,
      message: "Създаването на проекти не е позволено по това време.",
    };
  }
  const participant = await getParticipantFromSession();
  if (!participant) {
    return { success: false, message: "Не сте влезли като участник" };
  }
  if (participant.team.id !== project.teamId) {
    return { success: false, message: "Не сте в този отбор" };
  }
  if (!participant.team.isCaptain) {
    return {
      success: false,
      message: "Само капитанът може да създаде проект",
    };
  }
  try {
    await db
      .insert(projects)
      .values({
        name: project.name,
        description: project.description,
        technologies: "",
        teamId: project.teamId,
      })
      .onConflictDoUpdate({
        target: [projects.teamId],
        set: {
          name: project.name,
          description: project.description,
        },
      });

    return { success: true, message: "Успешно създадохте проекта" };
  } catch (e) {
    return { success: false, message: "Възникна неочаквана грешка" };
  }
});

async function canUpdateProject(teamId: string) {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("update-project")) {
    return {
      success: false,
      message: "Промените по проектите не са позволена по това време.",
    } as const;
  }

  const participant = await getParticipantFromSession();
  if (!participant) {
    return {
      success: false,
      message: "Не сте влезли като участник",
    } as const;
  }
  if (participant.team.id !== teamId) {
    return { success: false, message: "Не сте в този отбор" } as const;
  }
  if (!participant.team.isCaptain) {
    return {
      success: false,
      message: "Само капитанът може да редактира проекта",
    } as const;
  }

  const project = await getProjectByTeamId(participant.team.id);
  if (!project) {
    return {
      success: false,
      message: "Моля, създайте проект, за да добавите линк към демо",
    } as const;
  }
  return {
    success: true,
    project,
  } as const;
}

export const updateProjectNameDesc = zact(updateProjectSchema)(async (
  input,
) => {
  try {
    const res = await canUpdateProject(input.teamId);
    if (!res.success) {
      return res;
    }
    await updateProject({
      id: res.project.id,
      name: input.name,
      description: input.description,
    });
    return { success: true } as const;
  } catch (e) {
    return {
      success: false,
      message:
        e instanceof Error && env.VERCEL_ENV !== "production"
          ? e.message
          : "Възникна неочаквана грешка. Моля, опитайте отново.",
    };
  }
});

export const updateProjectWebsiteUrl = zact(updateWebsiteUrlSchema)(async (
  input,
) => {
  try {
    const res = await canUpdateProject(input.teamId);
    if (!res.success) {
      return res;
    }
    await updateProject({
      id: res.project.id,
      websiteUrl: input.websiteUrl ?? null,
    });
    return { success: true } as const;
  } catch (e) {
    return {
      success: false,
      message:
        e instanceof Error && env.VERCEL_ENV !== "production"
          ? e.message
          : "Възникна неочаквана грешка. Моля, опитайте отново.",
    };
  }
});

export const updateProjectFallbackGitHubRepos = zact(
  updateFallbackGitHubReposSchema,
)(async (input) => {
  try {
    const gb = await getServerSideGrowthBook();
    if (gb.isOn("add-github-repos")) {
      return {
        success: false,
        message:
          "Техническият проблем вече е отстранен. Моля, редактирайте хранилищата, използвайки GitHub интеграцията.",
      } as const;
    }
    const res = await canUpdateProject(input.teamId);
    if (!res.success) {
      return res;
    }
    const existingRepos = new Set(
      res.project.githubRepos.map((repo) => repo.url),
    );
    // XXX: type cast shit is happening help
    const fallbackRepos = (input.fallbackGitHubRepos as any as string)
      .split("\n")
      .filter((repo) => !existingRepos.has(repo));
    await updateProject({
      id: res.project.id,
      fallbackRepoUrls: fallbackRepos.join("\n"),
    });
    return { success: true } as const;
  } catch (e) {
    return {
      success: false,
      message:
        e instanceof Error && env.VERCEL_ENV !== "production"
          ? e.message
          : "Възникна неочаквана грешка. Моля, опитайте отново.",
    };
  }
});

export async function isTeamFull(teamId: string) {
  const team = (await db.select().from(teams).where(eq(teams.id, teamId)))[0];
  if (team.memberCount == 5) {
    return true;
  }
  return false;
}

export async function addTeamResultSemiFinal(
  team: string,
  semiFinal: string,
  semiFinalResult: string,
) {
  const admin = await getAdminFromSession();
  if (!admin) {
    return { success: false, message: "Не си влязъл като админ" };
  }
  try {
    await db
      .update(teams)
      .set({ semiFinal: parseInt(semiFinal), semiFinalResult: semiFinalResult })
      .where(eq(teams.id, team));
    revalidateTag("teams");

    return { success: true, message: "Успешно добавихте резултатите" };
  } catch (e) {
    return { success: false, message: "Опа, нещо се обърка" };
  }
}

export async function addTeamResultFinal(team: string, finalResult: string) {
  const admin = await getAdminFromSession();
  if (!admin) {
    return { success: false, message: "Не си влязъл като админ" };
  }
  try {
    await db
      .update(teams)
      .set({ finalResult: finalResult, isFinalist: true })
      .where(eq(teams.id, team));

    revalidateTag("teams");
    return { success: true, message: "Успешно добавихте резултатите" };
  } catch (e) {
    return { success: false, message: "Опа, нещо се обърка" };
  }
}
