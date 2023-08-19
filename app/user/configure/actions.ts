"use server";

import { eq } from "drizzle-orm";

import { particpants, users } from "~/app/db/schema";
import { db } from "../../db/index";

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  grade: "8" | "9" | "10" | "11" | "12" | "";
  parallel: "А" | "Б" | "В" | "Г" | "";
  tShirtId: string;
  allergies: string;
}

export const InsertParticipant = async (email: string, formData: FormData) => {
  if (email) {
    console.log("Session user email:", email);
    try {
      const user = await db.select().from(users).where(eq(users.email, email));
      console.log("User:", user);
      if (user && user[0]?.participantId) {
        const participantData = {
          id: user[0]?.participantId,
          userId: user[0]?.participantId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          grade: formData.grade,
          parallel: formData.parallel,
          tShirtId: parseInt(formData.tShirtId),
          allergies: formData.allergies,
        };
        console.log("Participant data:", participantData);
        if ((await checkPhoneNumber(participantData.phoneNumber)) < 1) {
          const res = await db
            .insert(particpants)
            .values(participantData)
            .returning();
          console.log(res);
          return true;
        } else {
          console.error("Phone number already exists.");
          return undefined;
        }
      } else {
        console.error("User not found or participantId missing.");
        return false;
      }
    } catch (error) {
      console.error("Error inserting participant:", error);
      return false;
    }
  } else {
    console.error("Session user email is missing.");
    return false;
  }
};

export async function getParticipant(email: string) {
  if (email) {
    try {
      const user = await db.select().from(users).where(eq(users.email, email));
      if (user && user[0]?.participantId) {
        const participant = await db
          .select()
          .from(particpants)
          .where(eq(particpants.id, user[0]?.participantId));
        return participant;
      } else {
        console.error("User not found or participantId missing.");
      }
    } catch (error) {
      console.error("Error inserting participant:", error);
    }
  } else {
    console.error("Session user email is missing.");
  }
}

export const updateParticipant = async (email: string, formData: FormData) => {
  if (email) {
    console.log("Session user email:", email);
    try {
      const user = await db.select().from(users).where(eq(users.email, email));
      console.log("User:", user);
      if (user && user[0]?.participantId) {
        const participantId = user[0]?.participantId;
        const participantData = {
          userId: user[0].id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          grade: formData.grade,
          parallel: formData.parallel,
          tShirtId: parseInt(formData.tShirtId),
          allergies: formData.allergies,
        };

        if ((await checkPhoneNumber(participantData.phoneNumber)) <= 1) {
          console.log("Participant data:", participantData);

          const res = await db
            .update(particpants)
            .set(participantData)
            .where(eq(particpants.id, participantId));
          console.log(res);
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
};

//check if phone number exists
const checkPhoneNumber = async (phoneNumber: string) => {
  if (phoneNumber) {
    try {
      const participant = await db
        .select()
        .from(particpants)
        .where(eq(particpants.phoneNumber, phoneNumber));
      console.log("Participant length", participant.length);
      return participant.length;
    } catch (error) {
      console.error("Error checking phone number:", error);
      console.log(error);
      return 2;
    }
  } else {
    console.error("Phone number is missing.");
    console.log("Phone number is missing");
    return 2;
  }
};
