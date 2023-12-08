import "server-only";

import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { createTransport } from "nodemailer";

import { db } from "~/app/db";
import { DrizzleAdapter } from "~/app/db/adapter";
import { env } from "~/app/env.mjs";
import { mentorWhitelist } from "~/app/user/configure/actions";

function printReturn<T>(x: T) {
  console.log(x);
  return x;
}

export const authOptions = {
  providers: [
    EmailProvider({
      server: env.EMAIL_SERVER,
      sendVerificationRequest: async ({ identifier, url, provider, theme }) => {
        const { host } = new URL(url);
        const transport = createTransport(provider.server);
        if (
          identifier.endsWith("@elsys-bg.org") ||
          (await mentorWhitelist(identifier))
        ) {
          const result = await transport.sendMail({
            to: identifier,
            from: provider.from,
            subject: `Sign in to ${host}`,
            text: printReturn(text({ url, host })),
            html: html({ url, host, theme }),
          });
          const failed = result.rejected.concat(result.pending).filter(Boolean);
          if (failed.length) {
            throw new Error(
              `Email(s) (${failed.join(", ")}) could not be sent`,
            );
          }
        } else {
          throw new Error(`Please use your @elsys-bg.org email to sign in.`);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider !== "email") {
        return false;
      }
      if (
        user.email?.endsWith("@elsys-bg.org") ||
        (await mentorWhitelist(user.email))
      ) {
        return true;
      }
      return false;
    },
  },
  pages: {
    newUser: "/user/configure",
  },

  adapter: DrizzleAdapter(db),
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60 * 4, // 120 days
    updateAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;

function html(params: { url: string; host: string; theme: any }) {
  const { url, host, theme } = params;

  const color = {
    background: "#f9f9f9",
    text: "#fff",
    mainBackground: "#0F172A",
    buttonBorder: "#fff",
    buttonText: theme.buttonText || "#fff",
  };

  const buttonStyle = `
    color: ${color.buttonText};
    text-decoration: none;
    border-radius: 5px;
    padding: 10px 20px;
    display: inline-block;
    font-weight: bold;
    background: #b01c32;
  `;
  // border: 1px solid ${color.buttonBorder};

  return `
    <body style="background: ${color.background};">
      <table width="100%" border="0" cellspacing="20" cellpadding="0"
        style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
        <tr>
          <td align="center"
            style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
            Влезте в <strong>Hack TUES X</strong>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center" style="border-radius: 5px;">
                  <a href="${url}" target="_blank" style="${buttonStyle}">
                    Влез
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center"
            style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
            Ако не сте поискали този имейл, можете спокойно да го игнорирате.
          </td>
        </tr>
      </table>
    </body>
  `;
}

function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
