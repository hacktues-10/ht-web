import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { db } from ".";

export const classEnum = pgEnum("class", ["А", "Б", "В", "Г"]);
export const gradeEnum = pgEnum("grade", ["8", "9", "10", "11", "12"]);
export const tShirtSizeEnum = pgEnum("tshirtsize", ["XS", "S", "M", "L", "XL"]);

export const particpants = pgTable("participants", {
  id: serial("id").primaryKey(),
  email: varchar("email").notNull(),
  firstName: varchar("firstName"),
  lastName: varchar("lastName"),
  phoneNumber: varchar("phoneNumber"),
  grade: gradeEnum("grade"),
  parallel: classEnum("class"),
  tShirtId: serial("tShirtId").references(() => tShirt.id),
  allergiesId: serial("allergiesId").references(() => allergies.id),
  emailVerified: date("emailVerified", { mode: "date" }),
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

export const mentors = pgTable("mentors", {
  id: serial("id").primaryKey(),
  email: varchar("email"),
  firstName: varchar("firstName"),
  lastName: varchar("lastName"),
  phoneNumber: varchar("phoneNumber"),
  // TODO: availability
  description: varchar("description"),
  youtubeURL: varchar("youtubeURL"),
  position: varchar("position"),
  // XXX: company??
  // TODO: technologies
  tShirtId: serial("tShirtId")
    .references(() => tShirt.id)
    .notNull(),
  allergiesId: serial("allergiesId")
    .references(() => allergies.id)
    .notNull(),
});

export const mentorsRelations = relations(mentors, ({ one }) => ({
  tShirt: one(tShirt, {
    fields: [mentors.tShirtId],
    references: [tShirt.id],
  }),
  allergies: one(allergies, {
    fields: [mentors.allergiesId],
    references: [allergies.id],
  }),
}));

export const teams = pgTable("teams", {
  // TODO: members
  id: varchar("id").primaryKey(),
  name: varchar("name").notNull(),
  description: varchar("description").notNull(),
  mentorId: serial("mentorId").references(() => mentors.id),
  // TODO: technologies
  projectId: serial("projectId").references(() => projects.id),
});

export const teamsRelations = relations(teams, ({ one }) => ({
  mentor: one(mentors, {
    fields: [teams.mentorId],
    references: [mentors.id],
  }),
  project: one(projects, {
    fields: [teams.projectId],
    references: [projects.id],
  }),
}));

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  description: varchar("description").notNull(),
  technologies: varchar("technologies").notNull(),
  websiteURL: varchar("websiteURL").notNull(),
  // TODO: technologies
});

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

export const account = pgTable("account", {
  id: varchar("id").primaryKey().notNull(),
  userId: varchar("userId").notNull(),
  type: varchar("type").notNull(),
  provider: varchar("provider").notNull(),
  providerAccountId: varchar("providerAccountId").notNull(),
  refresh_token: varchar("refresh_token"),
  access_token: varchar("access_token"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  expires_at: integer("expires_at"),
  token_type: varchar("token_type"),
  scope: varchar("scope"),
  id_token: varchar("id_token"),
  session_state: varchar("session_state"),
});

export const accountRelations = relations(account, ({ one }) => ({
  user: one(particpants, {
    fields: [account.userId],
    references: [particpants.id],
  }),
}));

export const session = pgTable("session", {
  id: varchar("id").primaryKey().notNull(),
  userId: varchar("userId").notNull(),
  expires: date("expires", { mode: "date" }).notNull(),
  sessionToken: varchar("sessionToken").notNull(),
});

export const verificationToken = pgTable("verificationToken", {
  identifier: varchar("identifier").primaryKey().notNull(),
  token: varchar("token").notNull(),
  expires: date("expires", { mode: "date" }).notNull(),
});

export type DrizzleClient = typeof db;
