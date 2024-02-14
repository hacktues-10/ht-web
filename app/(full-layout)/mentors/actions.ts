"use server";

import { revalidateTag } from "next/cache";
import { DevBundlerService } from "next/dist/server/lib/dev-bundler-service";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { getServerSideGrowthBook } from "~/app/_integrations/growthbook";
import { zact } from "~/app/_zact/server";
import { addDiscordRole } from "~/app/api/discord/service";
import { db } from "~/app/db";
import { discordUsers, mentors, teams } from "~/app/db/schema";

const formDataSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  companyName: z.string(),
  phoneNumber: z.string(),
  description: z.string(),
  tShirtId: z.number().int().min(1).max(5),
  allergies: z.string(),
  technologies: z.string(),
  youtubeURL: z.string(),
  fileName: z.string(),
});

export const checkifMentorExists = async (id: number) => {
  const mentor = await db.select().from(mentors).where(eq(mentors.id, id));
  if (mentor && mentor.length > 0) {
    return true;
  }
  return false;
};

export async function chooseTeamMentor(mentorId: number, teamId: string) {
  try {
    const team = await db.select().from(teams).where(eq(teams.id, teamId));

    if (team.length === 0) return { success: false };
    if (!team[0].discordRoleId) return { success: false };
    if (team[0].mentorId !== null) {
      return { success: false };
    }

    await db
      .update(teams)
      .set({ mentorId: mentorId })
      .where(eq(teams.id, teamId));

    revalidateTag("mentors");
    revalidateTag("teams");

    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}
