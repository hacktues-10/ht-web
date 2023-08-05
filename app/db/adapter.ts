import { db } from "./index"
import { particpants } from "./schema"
import { eq } from "drizzle-orm";


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

/** @return { import("next-auth/adapters").Adapter } */
export default function DrizzleAdapter( options = {}) {
    return {

      async createUser(user: any) {
        if(await db.select().from(particpants).where(user.email)) {
        return user.id;
        }
        else {
            const res = await db.insert(particpants).values(user);
            return res;
        }
    },
      async getUser(id: number) {
        const res = await db.select().from(particpants).where(eq(particpants.id, id));
        return res;
      },
      async getUserByEmail(email: string) {
        const res = await db.select().from(particpants).where(eq(particpants.email, email));
        return res;
      },
      async getUserByAccount({ providerAccountId, provider }) {

        return
      },
      async updateUser(id: any, user: Participants) {
        return await db.update(particpants).set(user).where(eq(id, user.id));
      },
      async deleteUser(userId: number) {
        const res = await db.delete(particpants).where(eq(particpants.id, userId));
        return res;
      },
      async linkAccount(account: any) {
        return
      },
      async unlinkAccount( providerAccountId: number, provider : any) {
        return
      },
      async createSession({ sessionToken, userId, expires }) {
        return
      },
      async getSessionAndUser(sessionToken) {
        return
      },
      async updateSession({ sessionToken }) {
        return
      },
      async deleteSession(sessionToken) {
        return
      },
      async createVerificationToken({ identifier, expires, token }) {
        return
      },
      async useVerificationToken({ identifier, token }) {
        return
      },
    }
  }