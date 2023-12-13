"use server";

import { DrizzleError, eq } from "drizzle-orm";
import { zact } from "zact/server";
import { z } from "zod";

import { updateTechnologies } from "~/app/(full-layout)/teams/actions";
import { getHTSession } from "~/app/api/auth/session";
import { particpants, users } from "~/app/db/schema";
import { db } from "../../db/index";

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

export async function getParticipant() {
  const session = await getHTSession();
  const email = session?.user?.email;
  if (email) {
    try {
      const user = await db.select().from(users).where(eq(users.email, email));
      if (user && user[0]?.participantId) {
        const participant = await db
          .select()
          .from(particpants)
          .where(eq(particpants.id, user[0]?.participantId));
        if (participant) {
          return participant;
        }
        return null;
      } else {
        console.error("User not found or participantId missing.");
        return null;
      }
    } catch (error) {
      console.error("Error while trying to participant:", error);
      return null;
    }
  } else {
    console.error("Session user email is missing.");
    return null;
  }
}

export async function getParticipantById(userId: number | undefined) {
  if (!userId) {
    return null;
  }
  try {
    const participant = await db
      .select()
      .from(particpants)
      .where(eq(particpants.id, userId));
    return participant[0];
  } catch (error) {
    console.error("Error while trying to get participant by id:", error);
  }
}

export const updateParticipant = zact(formData)(async (formData) => {
  const session = await getHTSession();
  const email = session?.user?.email;
  if (email) {
    try {
      const user = await db.select().from(users).where(eq(users.email, email));
      if (user && user[0]?.participantId) {
        const participantId = user[0]?.participantId;
        const participantData = {
          userId: user[0].id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          grade: formData.grade,
          parallel: formData.parallel,
          tShirtId: formData.tShirtId,
          allergies: formData.allergies,
          technologies: formData.technologies,
        };

        if ((await checkPhoneNumber(participantData.phoneNumber)) <= 1) {
          const res = await db
            .update(particpants)
            .set(participantData)
            .where(eq(particpants.id, participantId))
            .returning();
          if (res[0].teamId) {
            await updateTechnologies(res[0].teamId);
          }
          return true;
        }
      } else {
        console.error("User not found or participantId missing.");
        return false;
      }
    } catch (error) {
      console.error("Error updating participant:", error);
      return false;
    }
  } else {
    console.error("Session user email is missing.");
    return false;
  }
});

//check if phone number exists
const checkPhoneNumber = async (phoneNumber: string) => {
  if (phoneNumber) {
    try {
      const participant = await db
        .select()
        .from(particpants)
        .where(eq(particpants.phoneNumber, phoneNumber));
      return participant.length;
    } catch (error) {
      console.error("Error checking phone number:", error);
      console.log(error);
      return 2;
    }
  } else {
    console.error("Phone number is missing.");
    return 2;
  }
};

const whitelist = ["abv@trading.212"];

//check if email is in whitelist json format
export const mentorWhitelist = async (email: string | null | undefined) => {
  if (email) {
    try {
      if (whitelist.includes(email)) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error checking whitelist:", error);
      return false;
    }
  } else {
    console.error("Email is missing.");
    return false;
  }
};

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
