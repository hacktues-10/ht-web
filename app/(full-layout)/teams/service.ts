import { revalidateTag, unstable_cache } from "next/cache";
import { eq } from "drizzle-orm";
import invariant from "tiny-invariant";
import { slugify } from "transliteration";

import {
  MAX_TEAM_MEMBERS_ALUMNI,
  MAX_TEAM_MEMBERS_STUDENTS,
  MAX_TEAMS_ALUMNI,
  MAX_TEAMS_STUDENTS,
  MIN_TEAM_MEMBERS_ALUMNI,
  MIN_TEAM_MEMBERS_STUDENTS,
} from "~/app/_configs/hackathon";
import { addDiscordRole, createDiscordTeam } from "~/app/api/discord/service";
import { db } from "~/app/db";
import {
  discordUsers,
  invitations,
  particpants,
  projects,
  teams,
} from "~/app/db/schema";
import { env } from "~/app/env.mjs";
import {
  formatParticipantDiscordNick,
  getParticipantById,
  getParticipantFromSession,
  getParticipantsWithNoTeam,
} from "~/app/participants/service";
import { MINUTE } from "~/app/utils";

export type Team = Awaited<ReturnType<typeof getAllTeams>>[number];
export type TeamMember = Team["members"][number];

export const getAllTeams = unstable_cache(
  async () => {
    return db.query.teams.findMany({
      with: {
        members: {
          with: {
            discordUser: {
              columns: {
                discordUsername: true,
              },
            },
          },
        },
        project: true,
      },
    });
  },
  ["all-teams", env.VERCEL_ENV],
  {
    revalidate: 5 * MINUTE,
    tags: ["teams"],
  },
);

export async function getTeamById(id: string) {
  const results = await db.select().from(teams).where(eq(teams.id, id));
  return results.at(0) ?? null;
}

export async function getProjectByTeamId(teamId: string) {
  const results = await db
    .select()
    .from(projects)
    .where(eq(projects.teamId, teamId));
  return results.at(0) ?? null;
}

export async function createTeam(team: {
  name: string;
  description: string;
  captainId: number;
  isAlumni: boolean;
}) {
  const res = await checkIfTeamEligableToJoin(team.isAlumni);
  invariant(res, "Отборите са запълнени.");

  const captain = await getParticipantById(team.captainId);
  invariant(!captain?.isDisqualified, "Участникът е дисквалифициран.");
  const discordMember = await db
    .select()
    .from(discordUsers)
    .where(eq(discordUsers.participantId, team.captainId));

  invariant(
    !(discordMember.length < 1 || !discordMember[0].discordId),
    "Failed to get discord member",
  );
  // TODO: verify if name is ok
  const roleId = await createDiscordTeam(team.name, slugify(team.name));

  const results = await db
    .insert(teams)
    .values({
      id: slugify(team.name),
      discordRoleId: roleId,
      technologies: captain?.technologies || "",
      memberCount: 1,
      ...team,
      discordCategoryId: "To be added",
      discordTextChannelId: "To be added",
      discordVoiceChannelId: "To be added",
    })
    .returning({ id: teams.id });
  const insertedTeam = results.at(0);
  invariant(insertedTeam, "Failed to create team");

  await addDiscordRole(discordMember[0].discordId, roleId);
  await db
    .update(particpants)
    .set({
      isCaptain: true,
      teamId: insertedTeam.id,
    })
    .where(eq(particpants.id, team.captainId));
  revalidateTag("teams");
  return insertedTeam;
}

export async function checkIfTeamEligableToJoin(isAlumni: boolean) {
  const teamsNumber = await db
    .select()
    .from(teams)
    .where(eq(teams.isAlumni, isAlumni));

  const minMembers = isAlumni ? 2 : 3;
  const maxMembers = isAlumni ? 3 : 5;

  const teamsNumberFinal = teamsNumber.filter((team) => {
    return team.memberCount >= minMembers && team.memberCount <= maxMembers;
  });

  if (
    (isAlumni && teamsNumberFinal.length >= MAX_TEAMS_ALUMNI) ||
    (teamsNumberFinal.length >= MAX_TEAMS_STUDENTS && !isAlumni)
  ) {
    return false;
  }

  return true;
}

export function isParticipantEligableToJoin(
  participant: Awaited<ReturnType<typeof getParticipantFromSession>>,
  team: Exclude<Awaited<ReturnType<typeof getTeamById>>, null>,
) {
  if (!participant || !participant.grade) {
    return false;
  }
  const grade = parseInt(participant.grade);
  return (grade > 12 && team.isAlumni) || (grade < 13 && !team.isAlumni);
}

export function isTeamConfirmed(team: Team) {
  const minMembers = team.isAlumni
    ? MIN_TEAM_MEMBERS_ALUMNI
    : MIN_TEAM_MEMBERS_STUDENTS;
  const maxMembers = team.isAlumni
    ? MAX_TEAM_MEMBERS_ALUMNI
    : MAX_TEAM_MEMBERS_STUDENTS;
  return team.memberCount >= minMembers && team.memberCount <= maxMembers;
}

type ReducedTeam = Omit<Team, "project" | "mentor" | "members">;

type X = keyof ReducedTeam;

export async function getPreparedParticipants(
  team: ReducedTeam,
  captainId: number | null,
) {
  // FIXME: captainId should not be passed manually
  if (!captainId) {
    return null;
  }

  // FIXME: wtf zashto tova e any, povrushta mi se ot tozi kod
  const res: any[] = [];

  const participants = await getParticipantsWithNoTeam(true);

  const inv = await db
    .select()
    .from(invitations)
    .where(eq(invitations.senderParticipantId, captainId));

  participants.forEach((participant) => {
    const isInvited = inv.some(
      (invite) => invite.invitedParticipantId === participant.id,
    );
    const fullName = formatParticipantDiscordNick(participant);

    if (isParticipantEligableToJoin(participant, team) && !isInvited) {
      res.push({
        ...participant,
        label: fullName,
        value: `${fullName.toLowerCase()}`,
      });
    }
  });
  const result = res.map((participant) => {
    return {
      label: participant.label,
      value: participant.value,
      id: participant.id,
      firstName: participant.firstName,
      lastName: participant.lastName,
      grade: participant.grade,
      parallel: participant.parallel,
      technologies: participant.technologies,
    };
  });
  return result;
}
