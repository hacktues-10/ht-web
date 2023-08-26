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

export const classEnum = pgEnum("class", ["А", "Б", "В", "Г", ""]);
export const gradeEnum = pgEnum("grade", ["8", "9", "10", "11", "12", ""]);
export const tShirtSizeEnum = pgEnum("tshirt_size", [
  "XS",
  "S",
  "M",
  "L",
  "XL",
]);

// FIXME: typo in word "participants" :/
export const particpants = pgTable("participants", {
  id: integer("id").primaryKey(),
  // email: varchar("email").notNull(),
  userId: integer("user_id").references(() => users.id),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  phoneNumber: varchar("phone_number"),
  grade: gradeEnum("grade"),
  parallel: classEnum("class"),
  tShirtId: serial("tshirt_id").references(() => tShirts.id), // FIXME: shouldnt use serial
  allergies: varchar("allergies").default(""),
  // emailVerified: date("emailVerified", { mode: "date" }),
});

export const participantsRelations = relations(particpants, ({ one }) => ({
  users: one(users, {
    fields: [particpants.userId],
    references: [users.id],
  }),
  tShirt: one(tShirts, {
    fields: [particpants.tShirtId],
    references: [tShirts.id],
  }),
}));

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email").notNull(),
  emailVerified: date("email_verified", { mode: "date" }),
  participantId: serial("participant_id"),
});

// export const usersRelations = relations(users, ({ one }) => ({
//   participants: one(particpants, {
//     fields: [users.participantId],
//     references: [particpants.id],
//   }),
// }));

export const mentors = pgTable("mentors", {
  id: serial("id").primaryKey(),
  email: varchar("email"),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  phoneNumber: varchar("phone_number"),
  // TODO: availability
  description: varchar("description"),
  youtubeURL: varchar("youtube_url"),
  position: varchar("position"),
  // XXX: company??
  // TODO: technologies
  tShirtId: serial("tshirt_id") // FIXME: shouldnt use serial
    .references(() => tShirts.id)
    .notNull(),
  allergies: varchar("allergies").default(""),
});

export const mentorsRelations = relations(mentors, ({ one }) => ({
  tShirt: one(tShirts, {
    fields: [mentors.tShirtId],
    references: [tShirts.id],
  }),
}));

export const teams = pgTable("teams", {
  id: varchar("id").primaryKey(),
  name: varchar("name").notNull(),
  description: varchar("description").notNull(),
  captainId: integer("captain_id")
    .notNull()
    .references(() => particpants.id),
  // TODO: members
  mentorId: integer("mentor_id").references(() => mentors.id),
  // TODO: technologies
  projectId: integer("project_id").references(() => projects.id),
});

export const teamsRelations = relations(teams, ({ one }) => ({
  mentor: one(mentors, {
    fields: [teams.mentorId],
    references: [mentors.id],
  }),
  captain: one(particpants, {
    fields: [teams.captainId],
    references: [particpants.id],
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
  websiteURL: varchar("website_url").notNull(),
  // TODO: technologies
});

export const tShirts = pgTable("tshirts", {
  id: serial("id").primaryKey(),
  tShirtSize: tShirtSizeEnum("tshirt_size"),
});

export const accounts = pgTable("accounts", {
  id: varchar("id").primaryKey().notNull(),
  userId: varchar("user_id").notNull(),
  type: varchar("type").notNull(),
  provider: varchar("provider").notNull(),
  providerAccountId: varchar("provider_account_id").notNull(),
  refresh_token: varchar("refresh_token"),
  access_token: varchar("access_token"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  expires_at: integer("expires_at"),
  token_type: varchar("token_type"),
  scope: varchar("scope"),
  id_token: varchar("id_token"),
  session_state: varchar("session_state"),
});

export const accountRelations = relations(accounts, ({ one }) => ({
  user: one(particpants, {
    fields: [accounts.userId],
    references: [particpants.id],
  }),
}));

export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey().notNull(),
  userId: integer("user_id").notNull(),
  expires: date("expires", { mode: "date" }).notNull(),
  sessionToken: varchar("session_token").notNull(),
});

export const verificationTokens = pgTable("verification_tokens", {
  identifier: varchar("identifier").primaryKey().notNull(),
  token: varchar("token").notNull(),
  expires: date("expires", { mode: "date" }).notNull(),
});

// TODO: maybe move to index.ts???
export type DrizzleClient = typeof db;
