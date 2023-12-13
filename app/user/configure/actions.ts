"use server";

import { eq } from "drizzle-orm";
import { zact } from "zact/server";

import { getServerSideGrowthBook } from "~/app/_integrations/growthbook";
import { getHTSession } from "~/app/api/auth/session";
import { particpants, users } from "~/app/db/schema";
import { db } from "../../db/index";
import { alunmiRegistrationSchema } from "./schemas";

export const registerAlumni = zact(alunmiRegistrationSchema)(async (data) => {
  try {
    const gb = await getServerSideGrowthBook();
    console.log({
      isOff: gb.isOff("register-alumni"),
      isOn: gb.isOn("register-alumni"),
      feature1: gb.getFeatureValue("register-alumni", false),
      feature2: gb.getFeatureValue("register-alumni", true),
      features: gb.getFeatures(),
    });
    if (gb.isOff("register-alumni")) {
      return {
        success: false,
        error: "Регистрацията на завършили не е позволена по това време.",
      };
    }

    const session = await getHTSession();
    if (!session || !session.user?.email) {
      return { success: false, error: "Не си влязъл с имейл" };
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
          // FIXME: rename secondName to middleName or vise-versa
          middleName: data.secondName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          grade: data.class.grade,
          parallel: data.class.parallel,
          allergies: data.allergies,
          tShirtId: data.tShirtId,
          technologies: data.technologies,
          isLookingForTeam: data.isLookingForTeam,
          question1Answer: data.question1,
          question2Answer: data.question2,
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
