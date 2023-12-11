"use server";

import { eq } from "drizzle-orm";
import { zact } from "zact/server";
import { z } from "zod";

import { getHTSession } from "~/app/api/auth/session";
import { particpants, users } from "~/app/db/schema";
import { updateTechnologies } from "~/app/teams/actions";
import { db } from "../../db/index";

const formData = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  grade: z.enum([
    "8",
    "9",
    "10",
    "11",
    "12",
    "1993",
    "1994",
    "1995",
    "1996",
    "1997",
    "1998",
    "1999",
    "2000",
    "2001",
    "2002",
    "2003",
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "",
  ]),
  parallel: z.enum(["А", "Б", "В", "Г", ""]),
  tShirtId: z.number().int().min(1).max(5),
  allergies: z.string(),
  technologies: z.string(),
});

export const insertParticipant = zact(formData)(async (formData) => {
  const session = await getHTSession();
  const email = session?.user?.email;
  if (email) {
    try {
      const user = await db.select().from(users).where(eq(users.email, email));
      if (user && user[0]?.participantId) {
        const participantData = {
          id: user[0]?.participantId,
          userId: user[0]?.participantId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          grade: formData.grade,
          parallel: formData.parallel,
          tShirtId: formData.tShirtId,
          allergies: formData.allergies,
          technologies: formData.technologies,
        };
        const participant = await getParticipant();
        if (
          (await checkPhoneNumber(participantData.phoneNumber)) < 1 &&
          (!participant || participant.length < 1)
        ) {
          const res = await db
            .insert(particpants)
            .values(participantData)
            .returning();
          return {
            success: true,
          };
        } else {
          const result = await updateParticipant(formData);
          if (!result) {
            console.error("Phone number already exists.");
            return {
              success: false,
              message: "Phone number already exists.",
            };
          }
          return {
            success: true,
          };
        }
      } else {
        console.error("User not found or participantId missing.");
        return {
          success: false,
          message: "User not found or participantId missing.",
        };
      }
    } catch (error) {
      console.error("Error inserting participant:", error);
      return {
        success: false,
        message: "Error inserting participant.",
      };
    }
  } else {
    console.error("Session user email is missing.");
    return {
      success: false,
      message: "Session user email is missing.",
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
