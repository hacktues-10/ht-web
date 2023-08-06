import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";

import { DrizzleAdapter } from "../../../db/adapter";
import { db } from "../../../db/index";

const handler = NextAuth({
  providers: [
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_HOST,
    //     port: process.env.EMAIL_PORT,
    //     auth: {
    //       user: process.env.EMAIL_USER,
    //       pass: process.env.EMAIL_PASSWORD,
    //     },
    //   },
    //   sendVerificationRequest: ({ identifier: email, url, token }) => {
    //     console.log("Verification request sent to", email, url, token);
    //   },
    // }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "database",
  },
  secret: process.env.SECRET,
});

export { handler as GET, handler as POST };
