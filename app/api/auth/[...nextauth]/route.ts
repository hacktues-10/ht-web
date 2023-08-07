import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";

import { DrizzleAdapter } from "../../../db/adapter";
import { db } from "../../../db/index";

const handler = NextAuth({
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
  ],
  adapter: DrizzleAdapter(db),
  cookies: {
    sessionToken: {
      name: "ht-10 session token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60 * 4, // 120 days
    updateAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.SECRET,
});

export { handler as GET, handler as POST };
