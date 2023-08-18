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
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          grade: formData.grade,
          parallel: formData.parallel,
          tShirtId: parseInt(formData.tShirtId),
          allergies: formData.allergies,
        };
        console.log("Participant data:", participantData);
        const res = await db
          .insert(particpants)
          .values(participantData)
          .returning();
        console.log("Inserted participant:", res[0]);
      } else {
        console.error("User not found or participantId missing.");
      }
    } catch (error) {
      console.error("Error inserting participant:", error);
    }
  } else {
    console.error("Session user email is missing.");
  }
};
