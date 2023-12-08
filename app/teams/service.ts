import { eq } from "drizzle-orm";
import invariant from "tiny-invariant";
import { slugify } from "transliteration";

import { addDiscordRole, createDiscordTeam } from "~/app/api/discord/service";
import { db } from "../db";
import { discordUsers, particpants, teams } from "../db/schema";
import { getParticipantById } from "../participants/service";

export async function getConfirmedTeams() {
  return db.query.teams.findMany({
    with: {
      members: true,
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
  const teamsNumber = await db
    .select()
    .from(teams)
    .where(eq(teams.isAlumni, team.isAlumni));
  // const teamsNumberFinal = teamsNumber.map(team => team.memberCount > 1 && team.memberCount < 4)
  // if (team.isAlumni && teamsNumberFinal.length >= 30) {
  //   invariant(false, "Отборите са запълнени.");
  // }

  const captain = await getParticipantById(team.captainId);
  const roleId = await createDiscordTeam(slugify(team.name));
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
  const discordMember = await db
    .select()
    .from(discordUsers)
    .where(eq(discordUsers.participantId, team.captainId));
  invariant(
    !(discordMember.length < 1 || !discordMember[0].discordId),
    "Failed to get discord member",
  );
  await addDiscordRole(discordMember[0].discordId, roleId);
  await db
    .update(particpants)
    .set({
      isCaptain: true,
      teamId: insertedTeam.id,
    })
    .where(eq(particpants.userId, team.captainId));
  return insertedTeam;
}
