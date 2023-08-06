import { Adapter } from "@auth/core/adapters";
import { and, eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

import {
  account,
  particpants,
  session,
  verificationToken,
  type DrizzleClient,
} from "./schema";

function generateUniqueID() {
  return uuidv4();
}

export function DrizzleAdapter(client: DrizzleClient): Adapter {
  return {
    async createUser(user) {
      const res = (
        await client.insert(particpants).values(user).returning()
      )[0];
      return {
        ...res,
        id: res.id.toString(),
      };
    },

    async getUser(id) {
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
      const res = (
        await client
          .delete(particpants)
          .where(eq(particpants.id, parseInt(userId)))
          .returning()
      )[0];
      return { ...res, id: res.id.toString() };
    },

    async linkAccount(rawAccount) {
      const updatedAccount = await client
        .insert(account)
        .values({ ...rawAccount, id: generateUniqueID() })
        .returning();

      const firstUpdatedAccount = updatedAccount[0];

      return {
        ...firstUpdatedAccount,
        id: firstUpdatedAccount.id ?? undefined,
        userId: firstUpdatedAccount.userId ?? undefined,
        provider: firstUpdatedAccount.provider ?? undefined,
        providerAccountId: firstUpdatedAccount.providerAccountId ?? undefined,
        refresh_token: firstUpdatedAccount.refresh_token ?? undefined,
        access_token: firstUpdatedAccount.access_token ?? undefined,
        creaeted_at: firstUpdatedAccount.created_at ?? undefined,
        expires_at: firstUpdatedAccount.expires_at ?? undefined,
        token_type: firstUpdatedAccount.token_type ?? undefined,
        scope: firstUpdatedAccount.scope ?? undefined,
        id_token: firstUpdatedAccount.id_token ?? undefined,
        session_state: firstUpdatedAccount.session_state ?? undefined,
      };
    },

    async unlinkAccount({ providerAccountId, provider }) {
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
