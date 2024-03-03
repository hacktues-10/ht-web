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
  installationId: number,
  participantId: number,
) {
  await db
    .insert(githubInstallationsToParticipants)
    .values({
      installationId,
      participantId,
    })
    .onConflictDoNothing({
      target: [
        githubInstallationsToParticipants.installationId,
        githubInstallationsToParticipants.participantId,
      ],
    });
}
