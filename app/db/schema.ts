import { relations } from "drizzle-orm";
import { boolean, pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";

const classEnum = pgEnum("class", ["А", "Б", "В", "Г"]);
const gradeEnum = pgEnum("grade", ["8", "9", "10", "11", "12"]);
const tShirtSizeEnum = pgEnum("tShirtSize", ["XS", "S", "M", "L", "XL"]);

export const particpants = pgTable("participants", {
  id: serial("id").primaryKey(),
  email: varchar("email"),
  firstName: varchar("firstName"),
  lastName: varchar("lastName"),
  phoneNumber: varchar("phoneNumber"),
  grade: gradeEnum("grade"),
  parallel: classEnum("class"),
  tShirtId: serial("tShirtId").references(() => tShirt.id),
  allergiesId: serial("allergiesId").references(() => allergies.id),
});

export const participantsRelations = relations(particpants, ({ one }) => ({
  tShirt: one(tShirt, {
    fields: [particpants.tShirtId],
    references: [tShirt.id],
  }),
  allergies: one(allergies, {
    fields: [particpants.allergiesId],
    references: [allergies.id],
  }),
}));

export const tShirt = pgTable("tShirt", {
  id: serial("id").primaryKey(),
  tShirtSize: tShirtSizeEnum("tShirtSize"),
});

export const allergies = pgTable("allergies", {
  id: serial("id").primaryKey(),
  eggs: boolean("eggs").default(false),
  milk: boolean("milk").default(false),
  extra: varchar("extra").default(""),
});
