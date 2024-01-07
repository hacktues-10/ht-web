import { XIcon } from "lucide-react";
import { FaDiscord } from "react-icons/fa6";

import { getUserAuthorization, signInRedirect } from "~/app/api/auth/session";
import { HTLogo } from "~/app/components/logos";
import { Card } from "~/app/components/ui/card";
import { Separator } from "~/app/components/ui/separator";
import { DiscordLoadingLink } from "./_components/discord-loading-link";

export default async function DiscordPage() {
  const { hasSession, hasConnectedDiscord } = await getUserAuthorization();
  if (!hasSession) signInRedirect();

  return hasConnectedDiscord ? (
    <Card className="mt-20 p-5">
      <div className="max-w-lg items-center justify-center text-center">
        <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Успешно свързахте своя Discord профил!
        </h1>
        <Separator />
        <p className="text-center text-sm leading-7 [&:not(:first-child)]:mt-6">
          Можете да премахнете своя Discord профил от{" "}
          <HTLogo className="text-inherit">Hack&nbsp;TUES&nbsp;X</HTLogo>.
        </p>
        <div className="py-2" />
        <DiscordLoadingLink href="/api/discord/remove" variant="destructive">
          <XIcon className="mr-2 inline-block h-4 w-4" /> Премахни Discord
        </DiscordLoadingLink>
      </div>
    </Card>
  ) : (
    <Card className="p-5">
      <div className="max-w-lg items-center justify-center text-center">
        <h2 className="scroll-m-20 pb-5 text-3xl font-semibold tracking-tight">
          Още малко остава!
        </h2>
        <Separator />
        <h2 className="text-center text-lg leading-7 [&:not(:first-child)]:mt-6">
          Свържете своя Discord профил и станете част от Discord сървъра на{" "}
          <HTLogo className="text-inherit">Hack&nbsp;TUES&nbsp;X</HTLogo>!
        </h2>
        <div className="relative pb-6 pt-12">
          <DiscordLoadingLink
            href="/api/discord"
            className="bg-blue-500 text-white hover:bg-blue-500/90"
            size="lg"
          >
            <FaDiscord className="mr-2 h-5 w-5" />
            Свържи Discord
          </DiscordLoadingLink>
        </div>
        <div className="py-5">
          <Separator />
        </div>
        <p className="text-sm text-muted-foreground">
          През Discord ще се осъществява комуникацията с вашия отбор. Ако нямате
          регистрация в Discord, е необходимо да се регистрирате за да участвате
          в <HTLogo className="text-inherit">Hack&nbsp;TUES&nbsp;X</HTLogo>.
        </p>
      </div>
    </Card>
  );
}
