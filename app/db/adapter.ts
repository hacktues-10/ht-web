import { and, eq } from "drizzle-orm";
import { AuthOptions } from "next-auth";
import { v4 as uuidv4 } from "uuid";

import {
  account,
  particpants,
  session,
  verificationToken,
  type DrizzleClient,
} from "./schema";

type Adapter = AuthOptions["adapter"];

function generateUniqueID() {
  return uuidv4();
}

export function DrizzleAdapter(client: DrizzleClient): Adapter {
  console.log("SAJDASID");

  return {
    async createUser(user) {
      console.log("test");

      const res = (
        await client.insert(particpants).values(user).returning()
      )[0];
      return {
        ...res,
        id: res.id.toString(),
      };
    },

    async getUser(id) {
      console.log("test");

      const res =
        (
          await client
            .select()
            .from(particpants)
            .where(eq(particpants.id, parseInt(id)))
        )[0] ?? null;
      return res !== null
        ? {
            ...res,
            id: res.id.toString(),
          }
        : null;
    },

    async getUserByEmail(email) {
      console.log("test");

      const res = (
        await client
          .select()
          .from(particpants)
          .where(eq(particpants.email, email))
      )[0];
      return {
        ...res,
        id: res.id.toString(),
      };
    },

    async getUserByAccount({ providerAccountId, provider }) {
      console.log("test");

      const res = (
        await client
          .select()
          .from(particpants)
          .where(
            and(
              eq(account.providerAccountId, String(providerAccountId)),
              eq(account.provider, provider),
            ),
          )
      )[0];
      return {
        ...res,
        id: res.id.toString(),
      };
    },

    async updateUser(user) {
      console.log("test");

      const res = (
        await client
          .update(particpants)
          .set({ ...user, id: parseInt(user.id) })
          .where(eq(particpants.id, parseInt(user.id)))
          .returning()
      )[0];
      return {
        ...res,
        id: res.id.toString(),
      };
    },

    async deleteUser(userId) {
      console.log("test");

      const res = (
        await client
          .delete(particpants)
          .where(eq(particpants.id, parseInt(userId)))
          .returning()
      )[0];
      return { ...res, id: res.id.toString() };
    },

    async linkAccount(rawAccount) {
      console.log("test");

      await client
        .insert(account)
        .values({ ...rawAccount, id: generateUniqueID() })
        .returning();
    },

    async unlinkAccount({ providerAccountId, provider }) {
      console.log("test");

      await client
        .delete(account)
        .where(
          and(
            eq(account.provider, provider),
            eq(account.providerAccountId, providerAccountId),
          ),
        );
    },

    async createSession({ sessionToken, userId, expires }) {
      console.log("test");

      await client.insert(session).values({
        id: generateUniqueID(),
        sessionToken,
        userId,
        expires,
      });

      return {
        sessionToken,
        userId,
        expires,
      };
    },

    async getSessionAndUser(sessionToken) {
      console.log("test");

      return (
        await client
          .select({ session: session, user: particpants })
          .from(session)
          .where(
            and(
              eq(session.sessionToken, sessionToken),
              eq(particpants.id, session.userId),
            ),
          )
      )[0];
    },

    async updateSession({ sessionToken }) {
      console.log("test");

      return (
        (
          await client
            .update(session)
            .set({ sessionToken: sessionToken })
            .where(eq(session.sessionToken, sessionToken))
            .returning()
        )[0] ?? null
      );
    },

    async deleteSession(sessionToken) {
      console.log("test");

      return (
        (
          await client
            .delete(session)
            .where(eq(session.sessionToken, sessionToken))
            .returning()
        )[0] ?? null
      );
    },

    async createVerificationToken(newVerificationToken) {
      console.log("createVerificationToken", newVerificationToken);
      return (
        (
          await client
            .insert(verificationToken)
            .values({ ...newVerificationToken })
            .returning()
        )[0] ?? null
      );
    },

    async useVerificationToken({ identifier, token }) {
      console.log("test");

      return (
        (
          await client
            .delete(verificationToken)
            .where(
              and(
                eq(verificationToken.identifier, identifier),
                eq(verificationToken.token, token),
              ),
            )
            .returning()
        )[0] ?? null
      );
    },
  };
}
