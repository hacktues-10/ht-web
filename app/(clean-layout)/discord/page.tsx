import { Metadata } from "next";
import Link from "next/link";
import { XIcon } from "lucide-react";
import { FaDiscord } from "react-icons/fa6";

import { SOCIAL_MEDIA } from "~/app/_configs/pr";
import { IfHTFeatureOn } from "~/app/_integrations/components";
import { getUserAuthorization, signInRedirect } from "~/app/api/auth/session";
import { HTLogo } from "~/app/components/logos";
import { Button } from "~/app/components/ui/button";
import { Card } from "~/app/components/ui/card";
import { Separator } from "~/app/components/ui/separator";
import { DiscordLoadingLink } from "./_components/discord-loading-link";

export const metadata: Metadata = {
  title: "Discord Профил",
  description: "Свържете своя Discord профил с Hack TUES X",
};

export default async function DiscordPage() {
  const { hasSession, hasConnectedDiscord } = await getUserAuthorization();
  if (!hasSession) signInRedirect();

  const socialMedia = SOCIAL_MEDIA.filter(
    (s) => s.platform !== "Email" && s.platform !== "Linktree",
  );
  const randomSocialMedia =
    socialMedia[Math.floor(Math.random() * socialMedia.length)];

  return hasConnectedDiscord ? (
    <Card className="mt-20 px-2 py-5 sm:px-5">
      <div className="max-w-lg items-center justify-center text-center">
        <div className="flex items-center justify-center">
          <FaDiscord className="pb-5 text-8xl" />
        </div>
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          Успешно свързахте своя Discord профил!
        </h1>
        <h2 className="text-center text-2xl leading-7 [&:not(:first-child)]:mt-6">
          Какво следва?
        </h2>
        <div className="px-0 py-3 sm:px-8">
          <div className="flex flex-col gap-2 border-2 p-3">
            <IfHTFeatureOn feature="create-team">
              <Button asChild variant="secondary">
                <Link href="/teams/new">Създайте нов отбор</Link>
              </Button>
            </IfHTFeatureOn>
            <IfHTFeatureOn feature="show-teams">
              <Button asChild variant="secondary">
                <Link href="/teams">Разгледайте отборите</Link>
              </Button>
            </IfHTFeatureOn>
            <Button asChild variant="secondary">
              <Link href="/profile">Персонализирайте профила си</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={randomSocialMedia.link} target="_blank">
                Последвайте ни в {randomSocialMedia.platform}
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/">Към началната страница</Link>
            </Button>
          </div>
        </div>
        <div className="pb-2" />
        <Separator />
        <p className="text-center text-sm leading-7 [&:not(:first-child)]:mt-6">
          Грешен Discord профил?
        </p>
        <div className="py-1" />
        <DiscordLoadingLink
          href="/api/discord/remove"
          variant="destructive"
          size="sm"
        >
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
