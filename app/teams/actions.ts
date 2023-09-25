"use server";

import { and, eq } from "drizzle-orm";

import {
  joinRequests,
  notifications,
  particpants,
  teams,
} from "~/app/db/schema";
import { db } from "../db";
import { getParticipantFromSession } from "../participants/service";

export async function deleteMyTeam() {
  const participant = await getParticipantFromSession();

  try {
    if (participant?.team.id) {
      await db
        .delete(joinRequests)
        .where(eq(joinRequests.teamId, participant.team.id));
      // await db.delete(notifications).where(eq(notifications.));
      await db
        .update(particpants)
        .set({ teamId: null, isCaptain: false })
        .where(eq(particpants.teamId, participant.team.id));

      await db
        .delete(teams)
        .where(eq(teams.id, participant?.team.id))
        .returning();
      return { success: true };
    }
  } catch (e) {
    console.log(e);
    return { success: false, message: e };
  }
}

export async function askToJoinHandler(teamIdToJoin: string) {
  const participant = await getParticipantFromSession();
  if (!participant) {
    return { success: false };
  }

  try {
    if (participant.id) {
      const res = await db
        .insert(joinRequests)
        .values({
          userId: participant.id,
          teamId: teamIdToJoin,
        })
        .returning();

      console.log(res[0]);

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
    }
  } catch (e) {
    console.log(e);
    return { success: false };
  }
}

export async function checkStateJoinRequests(targetTeamId: string) {
  const participant = await getParticipantFromSession();
  console.log(participant?.id);
  try {
    if (participant?.id != null) {
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
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
}
