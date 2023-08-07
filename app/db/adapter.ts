import { and, eq } from "drizzle-orm";
import { AuthOptions } from "next-auth";
import { v4 as uuidv4 } from "uuid";

import {
  account,
  session,
  users,
  verificationToken,
  type DrizzleClient,
} from "./schema";

type Adapter = AuthOptions["adapter"];

function generateUniqueID() {
  return uuidv4();
}

async function getSessionFromDB({
  client,
  sessionToken,
}: {
  client: DrizzleClient;
  sessionToken: string;
}) {
  console.log("getSessionFromDB");

  const res = (
    await client
      .select()
      .from(session)
      .where(eq(session.sessionToken, sessionToken))
  )[0];

  if (res) {
    return {
      sessionToken: res.sessionToken,
      userId: res.userId.toString(),
      expires: res.expires,
    };
  }
  return null;
}

export function DrizzleAdapter(client: DrizzleClient): Adapter {
  return {
    async createUser(user) {
      console.log("Create User");
      console.log("USER: ", JSON.stringify(user));

      const res = (await client.insert(users).values(user).returning())[0];

      console.log(JSON.stringify(res));
      return {
        ...res,
        id: res.id.toString(),
      };
    },

    async getUser(id) {
      console.log("getUser", id);

      const res =
        (
          await client
            .select()
            .from(users)
            .where(eq(users.id, parseInt(id)))
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
        await client.select().from(users).where(eq(users.email, email))
      )[0];
      console.log("get user by email res", res);
      if (res) {
        return {
          ...res,
          id: res.id.toString(),
        };
      } else {
        return null;
      }
    },

    async getUserByAccount({ providerAccountId, provider }) {
      console.log("test");

      const res = (
        await client
          .select()
          .from(users)
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
      console.log("update user");

      const res = (
        await client
          .update(users)
          .set({ ...user, id: parseInt(user.id) })
          .where(eq(users.id, parseInt(user.id)))
          .returning()
      )[0];
      return {
        ...res,
        id: res.id.toString(),
      };
    },

    async deleteUser(userId) {
      console.log("delete user");

      const res = (
        await client
          .delete(users)
          .where(eq(users.id, parseInt(userId)))
          .returning()
      )[0];
      return { ...res, id: res.id.toString() };
    },

    async linkAccount(rawAccount) {
      console.log("link account");

      await client
        .insert(account)
        .values({ ...rawAccount, id: generateUniqueID() })
        .returning();
    },

    async unlinkAccount({ providerAccountId, provider }) {
      console.log("unlink account");

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
      console.log("create Session");
      const newUserId = parseInt(userId);

      await client.insert(session).values({
        id: generateUniqueID(),
        sessionToken,
        userId: newUserId,
        expires,
      });

      return {
        sessionToken,
        userId,
        expires,
      };
    },

    async getSessionAndUser(sessionToken) {
      console.log("getSessionAndUser");

      const session = await getSessionFromDB({ client, sessionToken });

      if (session) {
        const rawUser =
          (
            await client
              .select()
              .from(users)
              .where(eq(users.id, parseInt(session.userId)))
          )[0] ?? null;

        if (rawUser) {
          const user = {
            id: rawUser.id.toString(),
            email: rawUser.email,
            emailVerified: rawUser.emailVerified,
          };

          return { session: session, user: user };
        }
      }
      return null;
    },

    async updateSession({ sessionToken }) {
      console.log("update session");

      const res =
        (
          await client
            .update(session)
            .set({ sessionToken: sessionToken })
            .where(eq(session.sessionToken, sessionToken))
            .returning()
        )[0] ?? null;

      if (res) {
        return {
          ...res,
          userId: res.userId.toString(),
        };
      }
      return null;
    },

    async deleteSession(sessionToken) {
      console.log("delete session");

      await client
        .delete(session)
        .where(eq(session.sessionToken, sessionToken));
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
      console.log("useVerificationToken", identifier, token);

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
