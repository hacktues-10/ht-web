"use server";

import { eq } from "drizzle-orm";
import { zact } from "zact/server";
import { z } from "zod";

import { discordUsers, mentors, teams } from "~/app/db/schema";
import { getServerSideGrowthBook } from "../_integrations/growthbook";
import { addDiscordRole } from "../api/discord/service";
import { db } from "../db";

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

export const insertMentor = zact(formDataSchema)(async (formData) => {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("register-mentors")) {
    return {
      success: false,
      error: "Регистрацията на ментори не е позволена по това време.",
    };
  }

  const exists = await checkifMentorExists(formData.email);
  if (!exists) {
    const res = await db.insert(mentors).values(formData).returning();
    if (res.length > 0) {
      return true;
    }
    return false;
  } else {
    try {
      const res = await updateMentor(formData);
      return res !== null;
    } catch (err) {
      if (err instanceof Error) {
        return {
          success: false,
          error: err.message,
        };
      }
      throw err;
    }
  }
});

export const checkifMentorExists = async (email: string) => {
  const mentor = await db
    .select()
    .from(mentors)
    .where(eq(mentors.email, email));
  if (mentor && mentor.length > 0) {
    return true;
  }
  return false;
};

export async function chooseTeamMentor(mentorId: number, teamId: string) {
  try {
    const res = await db
      .select()
      .from(discordUsers)
      .where(eq(discordUsers.mentorId, mentorId));

    const team = await db.select().from(teams).where(eq(teams.id, teamId));
    if (!team[0].discordRoleId) return { success: false };
    if (!res[0].discordId) return { success: false };
    await addDiscordRole(res[0].discordId, team[0].discordRoleId);
    await db
      .update(teams)
      .set({ mentorId: mentorId })
      .where(eq(teams.id, teamId));
    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}

const updateMentor = async (formData: z.infer<typeof formDataSchema>) => {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("register-mentors")) {
    throw new Error("Редактирането на ментори не е позволена по това време.");
  }

  const res = await db
    .update(mentors)
    .set({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      companyName: formData.companyName,
      phoneNumber: formData.phoneNumber,
      description: formData.description,
      tShirtId: formData.tShirtId,
      allergies: formData.allergies,
      technologies: formData.technologies,
      youtubeURL: formData.youtubeURL,
      fileName: formData.fileName,
    })
    .where(eq(mentors.email, formData.email))
    .returning();
  return res.at(0) ?? null;
};

export const getMentor = zact(
  z.object({
    email: z.string(),
  })
)(async ({ email }) => {
  const mentor = await db
    .select()
    .from(mentors)
    .where(eq(mentors.email, email));
  return mentor.at(0) ?? null;
});

// export const checkifFileExists = async (fileName: string) => {
//   const file = await db
//     .select()
//     .from(mentors)
//     .where(eq(mentors.fileName, fileName));
//   if (file.length > 0) {
//     return true;
//   }
//   return false;
// };
