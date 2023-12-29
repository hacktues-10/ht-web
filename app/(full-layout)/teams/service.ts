import { eq } from "drizzle-orm";
import invariant from "tiny-invariant";
import { slugify } from "transliteration";

import { addDiscordRole, createDiscordTeam } from "~/app/api/discord/service";
import { db } from "~/app/db";
import { discordUsers, particpants, teams } from "~/app/db/schema";
import {
  getParticipantById,
  getParticipantFromSession,
} from "~/app/participants/service";

export type Team = Awaited<ReturnType<typeof getConfirmedTeams>>[number];
export type TeamMember = Team["members"][number];

export async function getConfirmedTeams() {
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
  // .select({
  //   id: teams.id,
  //   name: teams.name,
  //   description: teams.description,
  //   mentorId: teams.mentorId,
  //   projectId: teams.projectId,
  //   isAlumni: teams.isAlumni,
  //   members: {
  //     particiapntId: particpants.id,
  //     firstName: particpants.firstName,
  //     lastName: particpants.lastName,
  //     grade: particpants.grade,
  //     parallel: particpants.parallel,
  //     technologies: particpants.technologies,
  //   },
  //   project: {
  //     id: projects.id,
  //     name: projects.name,
  //     technologies: projects.technologies,
  //   },
  // })
  // .from(teams)
  // .leftJoin(particpants, eq(particpants.teamId, teams.id))
  // .leftJoin(projects, eq(teams.projectId, projects.id));
}

export async function getTeamById(id: string) {
  const results = await db.select().from(teams).where(eq(teams.id, id));
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
  const roleId = await createDiscordTeam(slugify(team.name));
  const discordMember = await db
    .select()
    .from(discordUsers)
    .where(eq(discordUsers.participantId, team.captainId));
  invariant(
    !(discordMember.length < 1 || !discordMember[0].discordId),
    "Failed to get discord member",
  );
  // TODO: verify if name is ok
  const results = await db
    .insert(teams)
    .values({
      id: slugify(team.name),
      discordRoleId: roleId,
      technologies: captain?.technologies || "",
      memberCount: 1,
      ...team,
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
    (isAlumni && teamsNumberFinal.length >= 20) ||
    (teamsNumberFinal.length >= 70 && !isAlumni)
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
