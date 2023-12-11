import "server-only";

import { google } from "googleapis";
import { NextAuthOptions, Theme } from "next-auth";
import EmailProvider, { EmailConfig } from "next-auth/providers/email";
import { createTransport } from "nodemailer";

import { db } from "~/app/db";
import { DrizzleAdapter } from "~/app/db/adapter";
import { env } from "~/app/env.mjs";
import { mentorWhitelist } from "~/app/user/configure/actions";

const oAuth2Client = new google.auth.OAuth2(
  env.GMAIL_CLIENT_ID,
  env.GMAIL_CLIENT_SECRET,
  env.GMAIL_REDIRECT_URI,
);

oAuth2Client.setCredentials({ refresh_token: env.GMAIL_REFRESH_TOKEN });

const authConst = {
  type: "OAuth2",
  user: "hacktues@elsys-bg.org",
  clientId: env.GMAIL_CLIENT_ID,
  clientSecret: env.GMAIL_CLIENT_SECRET,
  refreshToken: env.GMAIL_REFRESH_TOKEN,
};

function printReturn<T>(x: T) {
  console.log(x);
  return x;
}

export const authOptions = {
  providers: [
    EmailProvider({
      sendVerificationRequest: async ({ identifier, url, provider, theme }) => {
        // if (
        //   identifier.endsWith("@elsys-bg.org") ||
        //   (await mentorWhitelist(identifier))
        // )
        // {
        const result = await sendEmail(identifier, provider, url, theme);
        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
        }
        // } else {
        //   throw new Error(`Please use your @elsys-bg.org email to sign in.`);
        // }
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

function html(params: { url: string; identifier: string; theme: Theme }) {
  const { url, identifier, theme } = params;

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
        Получавате това писмо, защото някой е въвел вашия адрес (${identifier}) в сайта на Hack TUES X. Ако не сте били вие, моля пренебрегнете това съобщение. Можете да се свържете с нас като отговорите на този имейл или пишете на hacktues@elsys-bg.org
      </td>
    </tr>
  </table>
</body>
`;
}

async function sendEmail(
  identifier: string,
  provider: EmailConfig,
  url: string,
  theme: Theme,
) {
  const accessToken = await oAuth2Client.getAccessToken();
  let token = await accessToken.token;

  const transport = createTransport({
    // @ts-ignore
    service: "gmail",
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      ...authConst,
      accessToken: token,
    },
  });
  return await transport.sendMail({
    to: identifier,
    from: "Hack TUES X",
    subject: `Влизане в Hack TUES X`,
    html: html({ url, identifier, theme }),
  });
}
