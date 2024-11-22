import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  integer,
  numeric,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

import { db } from ".";
import { STUDENT_GRADES, STUDENT_PARALLELS } from "../_elsys/grades-parallels";

export const classEnum = pgEnum("class", [...STUDENT_PARALLELS]);
export const gradeEnum = pgEnum("grade", [...STUDENT_GRADES]);
export const tShirtSizeEnum = pgEnum("tshirt_size", [
  "XS", // XXX: should be impossible to select
  "S",
  "M",
  "L",
  "XL",
  "XXL",
]);

export const notificationsTypes = pgEnum("notifications_types", [
  "invitation",
  "ask_join",
]);

// FIXME: typo in word "participants" :/
export const particpants = pgTable("participants", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),

  firstName: varchar("first_name").notNull(),
  middleName: varchar("middle_name"),
  lastName: varchar("last_name").notNull(),
  phoneNumber: varchar("phone_number").notNull().unique(),
  grade: gradeEnum("grade").notNull(),
  parallel: classEnum("class").notNull(),
  allergies: varchar("allergies").default(""),
  tShirtId: serial("tshirt_id")
    .references(() => tShirts.id)
    .notNull(), // FIXME: shouldnt use serial
  isDisqualified: boolean("is_disqualified").notNull().default(false),
  technologies: varchar("technologies").default("").notNull(),
  isLookingForTeam: boolean("is_looking_for_team").notNull().default(true),
  isCaptain: boolean("is_captain").notNull().default(false),
  teamId: varchar("team_id").references(() => teams.id),
  question1Answer: varchar("question1_answer"),
  question2Answer: varchar("question2_answer"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  // TODO: add updatedAt?
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
    discordUser: one(discordUsers),
    githubInstallationsToParticipants: many(githubInstallationsToParticipants),
  }),
);

export const discordUsers = pgTable("discord", {
  id: serial("id").primaryKey(),
  // FIXME: this should be a foreign key, but it should be on the participants table...
  participantId: integer("participant_id"),
  // FIXME: this should be a foreign key, but it should be on the mentors table...
  mentorId: integer("mentor_id"),
  discordId: varchar("discord_id").notNull().unique(),
  discordUsername: varchar("discord_username").notNull(),
  accessToken: varchar("access_token").notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

export const discordUsersRelations = relations(discordUsers, ({ one }) => ({
  particpants: one(particpants, {
    fields: [discordUsers.participantId],
    references: [particpants.id],
  }),
  mentors: one(mentors, {
    fields: [discordUsers.mentorId],
    references: [mentors.id],
  }),
}));

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email").notNull(),
  emailVerified: date("email_verified", { mode: "date" }),
  participantId: serial("participant_id"),
});

// FIXME: why is this commented out?
// export const usersRelations = relations(users, ({ one }) => ({
//   participants: one(particpants, {
//     fields: [users.participantId],
//     references: [particpants.id],
//   }),
// }));

export const mentors = pgTable("mentors", {
  id: serial("id").primaryKey(),
  companyName: varchar("company_name"),
  name: varchar("name").notNull(),
  fileName: varchar("file_name").default("").notNull(),
  description: varchar("description").notNull(),
  technologies: varchar("technologies").notNull(),
  jobPosition: varchar("job_position").notNull(),
  tuesVispusk: varchar("tues_vispusk"),
  schedule: varchar("schedule"),
  where: varchar("where"),
  discordUserSnowflake: varchar("discord_user_snowflake"),
  hasTeamRole: boolean("has_team_role").notNull().default(false),
});

export const teams = pgTable("teams", {
  id: varchar("id").primaryKey(),
  name: varchar("name").notNull(),
  description: varchar("description").notNull(),
  mentorId: integer("mentor_id")
    .references(() => mentors.id)
    .unique(),
  technologies: varchar("technologies").default("").notNull(),
  discordRoleId: varchar("role_id"),
  discordTextChannelId: varchar("discord_text_channel_id").notNull().unique(),
  discordVoiceChannelId: varchar("discord_voice_channel_id").notNull().unique(),
  discordCategoryId: varchar("discord_category_id").notNull().unique(),
  isAlumni: boolean("is_alumni").notNull().default(false),
  memberCount: integer("member_count").default(1).notNull(),
  semiFinal: integer("semi_final").default(0),
  semiFinalResult: numeric("semi_final_result", { precision: 3, scale: 2 })
    .notNull()
    .default("0.00"),
  isFinalist: boolean("is_finalist").notNull().default(false),
  finalResult: numeric("final_result", { precision: 3, scale: 2 })
    .notNull()
    .default("0.00"),
  tableNumber: integer("table_number"),
});

export const teamsRelations = relations(teams, ({ one, many }) => ({
  mentor: one(mentors, {
    fields: [teams.mentorId],
    references: [mentors.id],
  }),
  project: one(projects, {
    fields: [teams.id],
    references: [projects.teamId],
  }),
  invitations: many(invitations),
  joinRequests: many(joinRequests),
  members: many(particpants),
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
  }),
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
  websiteUrl: varchar("website_url"),
  fallbackRepoUrls: varchar("fallback_repo_urls").notNull().default(""),
  teamId: varchar("team_id")
    .notNull()
    .references(() => teams.id)
    .unique(),
});

export const projectsRelations = relations(projects, ({ one, many }) => ({
  team: one(teams, {
    fields: [projects.teamId],
    references: [teams.id],
  }),
  githubRepos: many(githubRepos),
}));

export const githubRepos = pgTable("github_repos", {
  id: serial("id").primaryKey(),
  githubId: integer("github_id").notNull().unique(),
  name: varchar("name").notNull(),
  url: varchar("url").notNull(),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.id),
  participantId: integer("participant_id")
    .notNull()
    .references(() => particpants.id),
  installationId: integer("installation_id")
    .notNull()
    .references(() => githubInstallations.id),
  lastAcceptedCommit: varchar("last_accepted_commit"),
  lastAcceptedCommitDate: timestamp("last_accepted_commit_date"),
  lastAcceptedCommitReceivedAt: timestamp("last_accepted_commit_received_at"),
  lastAcceptedPushAt: timestamp("last_accepted_push_at"),
  isSuspended: boolean("is_suspended").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const githubReposRelations = relations(githubRepos, ({ one }) => ({
  project: one(projects, {
    fields: [githubRepos.projectId],
    references: [projects.id],
  }),
  participant: one(particpants, {
    fields: [githubRepos.participantId],
    references: [particpants.id],
  }),
  installation: one(githubInstallations, {
    fields: [githubRepos.installationId],
    references: [githubInstallations.id],
  }),
}));

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
  identifier: varchar("identifier").notNull(),
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

export const admins = pgTable("admins", {
  userId: integer("user_id")
    .notNull()
    .references(() => users.id)
    .primaryKey(),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
});

export const adminsRelations = relations(admins, ({ one }) => ({
  user: one(users, {
    fields: [admins.userId],
    references: [users.id],
  }),
}));

export const githubInstallations = pgTable(
  "github_installations",
  {
    id: serial("id").primaryKey(),
    appInstallationId: integer("app_installation_id").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    isSuspended: boolean("is_suspended").notNull().default(false),
  },
  (t) => ({
    installationIdIndex: index().on(t.appInstallationId),
  }),
);

export const githubInstallationsRelations = relations(
  githubInstallations,
  ({ many }) => ({
    githubInstallationsToParticipants: many(githubInstallationsToParticipants),
  }),
);

export const githubInstallationsToParticipants = pgTable(
  "github_installations_to_participants",
  {
    id: serial("id").primaryKey(),
    installationId: integer("installation_id")
      .notNull()
      .references(() => githubInstallations.id),
    participantId: integer("participant_id")
      .notNull()
      .references(() => particpants.id),
    linkedAt: timestamp("linked_at").defaultNow().notNull(),
  },
  (t) => ({
    unique: unique().on(t.installationId, t.participantId),
  }),
);

// TODO: maybe move to index.ts???
export type DrizzleClient = typeof db;
