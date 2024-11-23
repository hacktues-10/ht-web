import { z } from "zod";

import {
  STUDENT_GRADES,
  STUDENT_PARALLELS,
} from "~/app/_elsys/grades-parallels";

const cyrillicNameRegex = /^[А-Яа-я\-– ]+$/;

const names2Schema = z.object({
  firstName: z
    .string()
    .min(1, { message: "Името трябва да съдържа поне 1 буква" })
    .regex(/^[A-ZА-Я]/, {
      message: "Името трябва да започва с главна буква",
    })
    .regex(cyrillicNameRegex, { message: "Името трябва да е на кирилица" })
    .max(20, { message: "Името трябва да съдържа най-много 100 символа" }),
  lastName: z
    .string()
    .min(1, { message: "Фамилията трябва да съдържа поне 1 буква" })
    .regex(/^[A-ZА-Я]/, {
      message: "Фамилията трябва да започва с главна буква",
    })
    .regex(cyrillicNameRegex, { message: "Фамилията трябва да е на кирилица" })
    .max(20, { message: "Фамилията трябва да съдържа най-много 20 символа" }),
});

const names3Schema = z
  .object({
    secondName: z
      .string()
      .min(1, { message: "Презимето трябва да съдържа поне 1 буква" })
      .regex(/^[A-ZА-Я]/, {
        message: "Презимето трябва да започва с главна буква",
      })
      .regex(cyrillicNameRegex, {
        message: "Презимето трябва да е на кирилица",
      }),
  })
  .merge(names2Schema);

const consentsSchema = z.object({
  regulationAgreement: z.boolean().refine((v) => v, {
    message: "Трябва да се съгласите с регламента за да участвате",
  }),
  personalDataConsent: z.boolean().refine((v) => v, {
    message: "Трябва да се съгласите с обработката на личните данни",
  }),
  publicDataConsent: z.boolean().refine((v) => v, {
    message: "Трябва да се съгласите с публикуването на името и класа/випуска",
  }),
});

const phoneNumberSchema = z.object({
  phoneNumber: z.preprocess(
    (val) =>
      typeof val === "string"
        ? val.replace(/^\+359/, "0").replace(/\s/g, "")
        : val,
    z
      .string()
      .regex(/^\d+$/, {
        message: "Телефонният номер трябва да съдържа само цифри",
      })
      .regex(/^0/, { message: "Невалиден мобилен телефонен номер" })
      .length(10, {
        message: "Телефонният номер трябва да съдържа точно 10 цифри",
      }),
  ),
});

export const studentsStep1Schema = names2Schema
  .merge(consentsSchema)
  .merge(phoneNumberSchema);

export const studentsStep2Schema = z.object({
  grade: z.enum(STUDENT_GRADES),
  parallel: z.enum(STUDENT_PARALLELS),
});

export const everyoneStep3Schema = z.object({
  allergies: z
    .string()
    // XXX: cannot get this to work because of empty case in the form
    // .min(1, { message: "Прекалено късо описание" })
    .max(100, { message: "Прекалено дълго описание (100 символа максимум)" })
    .optional(),
  // tShirtId: z.number().int().min(1).max(5),
  tShirtId: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val) : val),
    z.number().int().min(1).max(5),
  ),
});

export const everyoneStep4Schema = z.object({
  technologies: z.string().optional(),
  isLookingForTeam: z.boolean().default(true),
});

export const studentRegistrationSchema = studentsStep1Schema
  .merge(studentsStep2Schema)
  .merge(everyoneStep3Schema)
  .merge(everyoneStep4Schema);

export type StudentRegistrationSchema = z.infer<
  typeof studentRegistrationSchema
>;
