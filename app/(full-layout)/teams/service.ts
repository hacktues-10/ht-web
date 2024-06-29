import fs from "fs";
import path from "path";

import { asc } from "drizzle-orm";

import { db } from "~/app/db";
import { githubRepos } from "~/app/db/schema";

export type Team = Awaited<ReturnType<typeof getAllTeams>>[number];
export type TeamMember = Team["members"][number];

export const getAllTeams = async () => {
  const filePath = path.join(process.cwd(), "public", "static", "teams.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  const teams = JSON.parse(jsonData);
  return teams;
};

export async function getTeamById(id: string) {
  const teams = await getAllTeams();
  return teams.find((team: any) => team.id === id) ?? null;
}

export async function getTeamMembers(teamId: string) {
  const team = await getTeamById(teamId);
  return team?.members ?? [];
}

export async function getProjectByTeamId(teamId: string) {
  const filePath = path.join(
    process.cwd(),
    "public",
    "static",
    "projects.json",
  );

  const jsonData = fs.readFileSync(filePath, "utf8");
  const projects = JSON.parse(jsonData);
  return projects.find((project: any) => project.teamId === teamId) ?? null;
}
