"use server";

import { eq } from "drizzle-orm";

import { getServerSideGrowthBook } from "~/app/_integrations/growthbook";
import { zact } from "~/app/_zact/server";
import { getHTSession } from "~/app/api/auth/session";
import { db } from "~/app/db";
import { particpants, users } from "~/app/db/schema";
import { getParticipantFromSession } from "~/app/participants/service";
import { studentRegistrationSchema } from "./schemas";

export const registerStudent = zact(studentRegistrationSchema)(async (data) => {
  try {
    const gb = await getServerSideGrowthBook();
    if (gb.isOff("register-students")) {
      return {
        success: false,
        error: "Регистрацията на ученици е затворена.",
      };
    }

    const session = await getHTSession();
    if (!session || !session.user?.email) {
      return { success: false, error: "Не сте влезли с имейл" };
    }
    const participant = await getParticipantFromSession();
    if (participant) {
      return {
        success: false,
        error: "Вече сте регистриран/а като участник.",
      };
    }

    const user = (
      await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, session.user.email))
    ).at(0);
    if (!user) {
      throw new Error("User not found");
    }

    const newParticipant = (
      await db
        .insert(particpants)
        .values({
          userId: user.id,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          grade: data.grade,
          parallel: data.parallel,
          allergies: data.allergies,
          tShirtId: data.tShirtId,
          technologies: data.technologies,
          isLookingForTeam: data.isLookingForTeam,
        })
        .returning({ id: particpants.id })
    ).at(0);
    if (!newParticipant) {
      throw new Error("Participant not found");
    }
    return { success: true, participantId: newParticipant.id };
  } catch (e) {
    // HACK: this is a hack to get the error message from the drizzle-orm error,
    // so we can show it to the user. Shouldnt happen to sane users, but we
    // should still handle it. Still a bad UX, but better than nothing.
    if (
      e instanceof Error &&
      e.message.includes("participants_phone_number_unique")
    ) {
      return {
        success: false,
        error: "Този телефонен номер вече е регистриран.",
      };
    }
    return {
      success: false,
      error:
        "Възникна неочаквана грешка при регистрацията. Моля опитайте отново по-късно. Ако проблемът продължава, моля свържете се с нас.",
    };
  }
});

export const updateAllergiesAndTechnologies = async (
  allergies: string,
  technologies: string,
  participantId: number,
) => {
  const res = await db
    .update(particpants)
    .set({ technologies: technologies, allergies: allergies })
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
