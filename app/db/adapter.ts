import { and, eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

import { db } from "./index";
import {
  account,
  particpants,
  session,
  verificationToken,
  type DrizzleClient,
} from "./schema";

interface Participants {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  tShirtId: number;
  allergiesId: number;
  firstName: string;
  lastName: string;
}

function generateUniqueID(): string {
  return uuidv4();
}

/** @return { import("next-auth/adapters").Adapter } */
export function DrizzleAdapter(client: DrizzleClient) {
  return {
    createUser(user: any) {
      return client
        .insert(particpants)
        .values({ ...user, id: user.id })
        .returning();
    },

    async getUser(id: number) {
      const res =
        (await db.select().from(particpants).where(eq(particpants.id, id))) ??
        null;
      return res;
    },

    async getUserByEmail(email: string) {
      const res =
        (await db
          .select()
          .from(particpants)
          .where(eq(particpants.email, email))) ?? null;
      return res;
    },

    async getUserByAccount({
      providerAccountId,
      provider,
    }: {
      providerAccountId: number;
      provider: string;
    }) {
      const res = await db
        .select()
        .from(particpants)
        .where(
          and(
            eq(account.providerAccountId, String(providerAccountId)),
            eq(account.provider, provider),
          ),
        )
        .limit(1);
      return res;
    },

    async updateUser(id: any, user: Participants) {
      return await db.update(particpants).set(user).where(eq(id, user.id));
    },

    async deleteUser(userId: number) {
      const res = await db
        .delete(particpants)
        .where(eq(particpants.id, userId));
      return res;
    },

    async linkAccount(rawAccount: any) {
      const updatedAccount = await client
        .insert(account)
        .values(rawAccount)
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

    async unlinkAccount(providerAccountId: string, provider: string) {
      client
        .delete(account)
        .where(
          and(
            eq(account.provider, provider),
            eq(account.providerAccountId, providerAccountId),
          ),
        )
        .returning();
    },

    async createSession({
      sessionToken,
      userId,
      expires,
    }: {
      sessionToken: any;
      userId: any;
      expires: any;
    }) {
      const insertedSessions = await client
        .insert(session)
        .values({
          id: generateUniqueID(),
          sessionToken,
          userId,
          expires,
        })
        .returning();

      if (insertedSessions.length > 0) {
        return insertedSessions[0];
      } else {
        return null;
      }
    },

    async getSessionAndUser(sessionToken: string) {
      return client
        .select({ session: session, user: particpants })
        .from(session)
        .where(eq(session.sessionToken, sessionToken))
        .innerJoin(particpants, eq(particpants.id, session.userId));
    },

    async updateSession({ sessionToken }: { sessionToken: any }) {
      return client
        .update(session)
        .set({ sessionToken: sessionToken })
        .where(eq(sessionToken, session.sessionToken))
        .returning();
    },

    async deleteSession(sessionToken: string) {
      return client
        .delete(session)
        .where(eq(session.sessionToken, sessionToken))
        .returning();
    },

    async createVerificationToken({
      identifier,
      expires,
      token,
    }: {
      identifier: string;
      expires: number;
      token: string;
    }) {
      return client
        .insert(verificationToken)
        .values({ identifier, expires, token })
        .returning();
    },

    async useVerificationToken({
      identifier,
      token,
    }: {
      identifier: string;
      token: string;
    }) {
      try {
        return client
          .delete(verificationToken)
          .where(
            and(
              eq(verificationToken.identifier, identifier),
              eq(verificationToken.token, token),
            ),
          );
      } catch (error) {
        console.log(error);
      }
    },
  };
}
