import { cookies } from "next/headers";
import Link from "next/link";

import { Button } from "~/app/components/ui/button";
import { env } from "~/app/env.mjs";

export default async function DiscordPage() {
  const userCookies = cookies();
  if (userCookies.has("next-auth.session-token")) {
    const response = await fetch(`${env.NEXTAUTH_URL}api/checkAuthentication`, {
      credentials: "include",
      headers: {
        cookie: `next-auth.session-token=${userCookies.get(
          "next-auth.session-token",
        )?.value}`,
      },
    });

    const { hasConnectedDiscord } = (await response.json()).body;
    return hasConnectedDiscord ? (
      <div className="mt-20 max-w-lg items-center justify-center text-center">
        <h2 className="font-htags scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Имате свързан дискорд акаунт към профила си
        </h2>
        <p className="mb-6 text-center text-lg italic leading-7 [&:not(:first-child)]:mt-6">
          Можете да откачите своя Discord профил от Hack TUES X.
        </p>
        <Button>
          <Link href="/api/discord/remove">Откачи Discord</Link>
        </Button>
      </div>
    ) : (
      <div className="mt-20 max-w-lg items-center justify-center text-center">
        <h2 className="font-htags scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Още малко остава!
        </h2>
        <p className="mb-6 text-center text-lg italic leading-7 [&:not(:first-child)]:mt-6">
          Свържете своя Discord профил и станете част от Discord сървъра на Hack
          TUES X.
        </p>
        <Button>
          <Link href="/api/discord">Свържи Discord</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1>opa</h1>
    </div>
  );
}
