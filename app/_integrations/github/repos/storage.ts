import { and, desc, eq, not } from "drizzle-orm";

import { db } from "~/app/db";
import { githubRepos } from "~/app/db/schema";

type UpdateRepo = typeof githubRepos.$inferInsert;
type SelectRepo = typeof githubRepos.$inferSelect;

export async function importRepo(
  data: Exclude<UpdateRepo, "id" | "updatedAt" | "createdAt">,
) {
  const res = await db.insert(githubRepos).values(data).returning();
  return res.at(0) ?? null;
}

export async function removeRepo(id: number) {
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

export async function batchMarkAsSuspended(
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
