"use server";

import { eq } from "drizzle-orm";

import { db } from "~/app/db";
import { particpants } from "~/app/db/schema";

export const updateAllergiesTechnologiesAndIsLookingForTeam = async (
  allergies: string,
  technologies: string,
  isLookingForTeam: boolean,
  participantId: number,
) => {
  const res = await db
    .update(particpants)
    .set({
      technologies: technologies,
      allergies: allergies,
      isLookingForTeam: isLookingForTeam,
    })
    .where(eq(particpants.id, participantId))
    .returning();

  if (res) {
    return {
      success: true,
      message: {
        title: "Успешно променихте данните за своя профил.",
        description: "",
      },
    };
  } else {
    return {
      success: false,
      message: {
        title: "Не успяхте да промените данните за своя профил",
        description:
          "Моля опитайте отново след малко. Ако грешката продължава, свържете се с админ.",
      },
    };
  }
};
