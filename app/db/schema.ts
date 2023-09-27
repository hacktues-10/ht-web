import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

import { db } from ".";

export const classEnum = pgEnum("class", ["А", "Б", "В", "Г", ""]);
export const gradeEnum = pgEnum("grade", [
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
]);
export const tShirtSizeEnum = pgEnum("tshirt_size", [
  "XS",
  "S",
  "M",
  "L",
  "XL",
]);

export const notificationsTypes = pgEnum("notifications_types", [
  "invitation",
  "ask_join",
]);

// FIXME: typo in word "participants" :/
export const particpants = pgTable("participants", {
  id: integer("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),

  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  phoneNumber: varchar("phone_number"),
  grade: gradeEnum("grade"),
  parallel: classEnum("class"),
  allergies: varchar("allergies").default(""),
  tShirtId: serial("tshirt_id").references(() => tShirts.id), // FIXME: shouldnt use serial  allergies: varchar("allergies").default(""),
  technologies: varchar("technologies").default(""),
  isLookingForTeam: boolean("is_looking_for_team").notNull().default(true),

  isCaptain: boolean("is_captain").notNull().default(false),
  teamId: varchar("team_id").references(() => teams.id),
});

export const participantsRelations = relations(
  particpants,
  ({ one, many }) => ({
    users: one(users, {
      fields: [particpants.userId],
      references: [users.id],
    }),
    tShirt: one(tShirts, {
      fields: [particpants.tShirtId],
      references: [tShirts.id],
    }),
    memberOfTeam: one(teams, {
      fields: [particpants.teamId],
      references: [teams.id],
    }),
    invitations: many(invitations),
    sentInvitations: many(invitations),
  })
);

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
  companyName: varchar("company_name"),
  technologies: varchar("technologies"),
  tShirtId: serial("tshirt_id") // FIXME: shouldnt use serial
    .references(() => tShirts.id)
    .notNull(),
  allergies: varchar("allergies").default(""),
  fileName: varchar("file_name").default("").notNull(),
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
  mentorId: integer("mentor_id").references(() => mentors.id),
  // TODO: technologies
  projectId: integer("project_id").references(() => projects.id),
});

export const teamsRelations = relations(teams, ({ one, many }) => ({
  mentor: one(mentors, {
    fields: [teams.mentorId],
    references: [mentors.id],
  }),
  project: one(projects, {
    fields: [teams.projectId],
    references: [projects.id],
  }),
  invitations: many(invitations),
  joinRequests: many(joinRequests),
}));

export const invitations = pgTable(
  "invitations",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(), // Q: needed?
    teamId: varchar("team_id")
      .notNull()
      .references(() => teams.id),
    // email: varchar("email").notNull(), // Q: maybe??
    invitedParticipantId: integer("invited_participant_id")
      .notNull()
      .references(() => particpants.id),
    senderParticipantId: integer("sender_participant_id")
      .notNull()
      .references(() => particpants.id),
    isAccepted: boolean("is_accepted").notNull().default(false),
  },
  (t) => ({
    unique: unique().on(t.invitedParticipantId, t.teamId),
  })
);

export const invitationsRelations = relations(invitations, ({ one }) => ({
  team: one(teams, {
    fields: [invitations.teamId],
    references: [teams.id],
  }),
  invitedParticipant: one(particpants, {
    fields: [invitations.invitedParticipantId],
    references: [particpants.id],
  }),
  senderParticipant: one(particpants, {
    fields: [invitations.senderParticipantId],
    references: [particpants.id],
  }),
}));

export const joinRequests = pgTable("join_requests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  teamId: varchar("team_id")
    .notNull()
    .references(() => teams.id),
});

export const joinRequestsRelations = relations(joinRequests, ({ one }) => ({
  team: one(teams, {
    fields: [joinRequests.teamId],
    references: [teams.id],
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

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  targetUserId: integer("target_user_id")
    .notNull()
    .references(() => particpants.id),
  referenceId: integer("reference_id").notNull(),
  type: notificationsTypes("type").notNull(),
});

export const notificationsRelations = relations(notifications, ({ one }) => ({
  targetUser: one(particpants, {
    fields: [notifications.targetUserId],
    references: [particpants.id],
  }),
}));

// TODO: maybe move to index.ts???
export type DrizzleClient = typeof db;
