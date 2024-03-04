import { and, desc, eq, not } from "drizzle-orm";

import { db } from "~/app/db";
import { githubRepos } from "~/app/db/schema";
import { env } from "~/app/env.mjs";

type UpdateRepo = typeof githubRepos.$inferInsert;
type SelectRepo = typeof githubRepos.$inferSelect;

export async function importRepo(
  data: Exclude<UpdateRepo, "id" | "updatedAt" | "createdAt">,
) {
  try {
    const res = await db
      .insert(githubRepos)
      .values(data)
      .onConflictDoNothing({
        target: githubRepos.githubId,
        // error: syntax error at or near "WHERE"
        // where: eq(githubRepos.projectId, data.projectId),
      })
      .returning();
    if (res.length === 0) {
      const existingRepo = await getRepoByGithubId(data.githubId);
      if (existingRepo?.projectId !== data.projectId) {
        return null;
      }
      return existingRepo;
    }
    return res[0];
  } catch (error) {
    if (env.VERCEL_ENV !== "production") {
      throw error;
    }
    console.error("importRepo error", error);
    return null;
  }
}

export async function unimportRepo(id: number) {
  const res = await db
    .delete(githubRepos)
    .where(eq(githubRepos.id, id))
    .returning();
  return res.at(0) ?? null;
}

export async function batchRemoveRepos(installationRecordId: number) {
  const repos = await db
    .delete(githubRepos)
    .where(eq(githubRepos.installationId, installationRecordId))
    .returning();
  return repos;
}

export async function getReposForProject(projectId: number, showAll?: boolean) {
  const idMatches = eq(githubRepos.projectId, projectId);
  const res = await db
    .select()
    .from(githubRepos)
    .where(showAll ? idMatches : and(idMatches, not(githubRepos.isSuspended)))
    .orderBy(desc(githubRepos.createdAt));
  return res;
}

export async function getRepoByGithubId(githubId: number) {
  const res = await db
    .select()
    .from(githubRepos)
    .where(eq(githubRepos.githubId, githubId));
  return res.at(0) ?? null;
}

export async function getRepoById(id: number) {
  const res = await db.select().from(githubRepos).where(eq(githubRepos.id, id));
  return res.at(0) ?? null;
}

export async function batchMarkReposAsSuspended(
  installationId: number,
  isSuspended: boolean,
) {
  const res = await db
    .update(githubRepos)
    .set({ isSuspended })
    .where(eq(githubRepos.installationId, installationId))
    .returning();
  return res;
}

type UnNull<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};

export async function acceptRepoCommit({
  id,
  ...data
}: Pick<
  UnNull<SelectRepo>,
  | "id"
  | "lastAcceptedCommit"
  | "lastAcceptedCommitDate"
  | "lastAcceptedCommitReceivedAt"
>) {
  const res = await db
    .update(githubRepos)
    .set(data)
    .where(eq(githubRepos.id, id))
    .returning();
  return res.at(0) ?? null;
}
