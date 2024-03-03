import { eq } from "drizzle-orm";

import { db } from "~/app/db";
import {
  githubInstallations,
  githubInstallationsToParticipants,
} from "~/app/db/schema";

export async function upsertInstallation(appInstallationId: number) {
  const installation = await db
    .insert(githubInstallations)
    .values({
      appInstallationId,
    })
    .onConflictDoUpdate({
      target: githubInstallations.appInstallationId,
      set: {
        updatedAt: new Date(),
      },
    })
    .returning({ id: githubInstallations.id });
  return installation.at(0) ?? null;
}

export async function linkInstallationToParticipant(
  installationRecordId: number,
  participantId: number,
) {
  await db
    .insert(githubInstallationsToParticipants)
    .values({
      installationId: installationRecordId,
      participantId,
    })
    .onConflictDoNothing({
      target: [
        githubInstallationsToParticipants.installationId,
        githubInstallationsToParticipants.participantId,
      ],
    });
}

export async function getInstallationsForParticipant(participantId: number) {
  return db
    .select({
      id: githubInstallations.id,
      appInstallationId: githubInstallations.appInstallationId,
      createdAt: githubInstallations.createdAt,
      updatedAt: githubInstallations.updatedAt,
      linkedAt: githubInstallationsToParticipants.linkedAt,
    })
    .from(githubInstallations)
    .innerJoin(
      githubInstallationsToParticipants,
      eq(
        githubInstallations.id,
        githubInstallationsToParticipants.installationId,
      ),
    )
    .where(eq(githubInstallationsToParticipants.participantId, participantId));
}

export type Installation = Awaited<
  ReturnType<typeof getInstallationsForParticipant>
>[number];

export async function getInstallationRecordByAppInstallationId(
  appInstallationId: number,
) {
  const results = await db
    .select({
      id: githubInstallations.id,
      appInstallationId: githubInstallations.appInstallationId,
      createdAt: githubInstallations.createdAt,
      updatedAt: githubInstallations.updatedAt,
    })
    .from(githubInstallations)
    .where(eq(githubInstallations.appInstallationId, appInstallationId))
    .limit(1);
  return results.at(0) ?? null;
}

export async function deleteInstallationRecord(installationRecordId: number) {
  await db
    .delete(githubInstallationsToParticipants)
    .where(
      eq(
        githubInstallationsToParticipants.installationId,
        installationRecordId,
      ),
    );
  await db
    .delete(githubInstallations)
    .where(eq(githubInstallations.id, installationRecordId));
}
