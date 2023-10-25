import { eq } from "drizzle-orm";
import invariant from "tiny-invariant";
import { slugify } from "transliteration";

import { addDiscordRole, CreateDiscordTeam } from "~/app/api/discord/actions";
import { db } from "../db";
import { discord_table, particpants, teams } from "../db/schema";

export async function getConfirmedTeams() {
  return db.select().from(teams);
}

export async function getTeamById(id: string) {
  const results = await db.select().from(teams).where(eq(teams.id, id));
  return results.at(0) ?? null;
}

export async function createTeam(team: {
  name: string;
  description: string;
  captainId: number;
}) {
  const roleId = await CreateDiscordTeam(slugify(team.name));

  // TODO: verify if name is ok
  const results = await db
    .insert(teams)
    .values({
      id: slugify(team.name),
      roleId: roleId,
      ...team,
    })
    .returning({ id: teams.id });
  const insertedTeam = results.at(0);
  invariant(insertedTeam, "Failed to create team");
  const discordMember = await db
    .select()
    .from(discord_table)
    .where(eq(discord_table.participant_id, team.captainId));
  invariant(
    !(discordMember.length < 1 || !discordMember[0].discord_id),
    "Failed to get discord member",
  );
  await addDiscordRole(discordMember[0].discord_id, roleId);
  await db
    .update(particpants)
    .set({
      isCaptain: true,
      teamId: insertedTeam.id,
    })
    .where(eq(particpants.userId, team.captainId));
  return insertedTeam;
}
