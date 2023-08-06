import { relations } from "drizzle-orm";
import {
  boolean,
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
  firstName: varchar("firstName").notNull(),
  lastName: varchar("lastName").notNull(),
  phoneNumber: varchar("phoneNumber").notNull(),
  grade: gradeEnum("grade").notNull(),
  parallel: classEnum("class").notNull(),
  tShirtId: serial("tShirtId")
    .references(() => tShirt.id)
    .notNull(),
  allergiesId: serial("allergiesId")
    .references(() => allergies.id)
    .notNull(),
  emailVerified: integer("emailVerified"),
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
  id: varchar("id").primaryKey(),
  userId: varchar("userId").notNull(),
  type: varchar("type").notNull(),
  provider: varchar("provider").notNull(),
  providerAccountId: varchar("providerAccountId").notNull(),
  refresh_token: varchar("refresh_token").notNull(),
  access_token: varchar("access_token").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  expires_at: integer("expires_at").notNull(),
  token_type: varchar("token_type").notNull(),
  scope: varchar("scope").notNull(),
  id_token: varchar("id_token").notNull(),
  session_state: varchar("session_state").notNull(),
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
  expires: integer("expires").notNull(),
  sessionToken: varchar("sessionToken").notNull(),
});

export const verificationToken = pgTable("verificationToken", {
  identifier: varchar("identifier").primaryKey().notNull(),
  token: varchar("token").notNull(),
  expires: integer("expires").notNull(),
});

export type DrizzleClient = typeof db;
