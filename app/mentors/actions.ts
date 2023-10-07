"use server";

import { eq } from "drizzle-orm";
import { zact } from "zact/server";
import { z } from "zod";

import { getHTSession } from "~/app/api/auth/session";
import { mentors, teams } from "~/app/db/schema";
import { db } from "../db";

const formData = z.object({
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

export const insertMentor = zact(formData)(async (formData) => {
  const exists = await checkifMentorExists(formData.email);
  if (!exists) {
    const res = await db.insert(mentors).values(formData).returning();
    if (res.length > 0) {
      return true;
    }
    return false;
  } else {
    const res = await updateMentor(formData);
    if (res.length > 0) {
      return true;
    }
    return false;
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

export const updateMentor = zact(formData)(async (formData) => {
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
  return res;
});

export const getMentor = zact(
  z.object({
    email: z.string(),
  }),
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
