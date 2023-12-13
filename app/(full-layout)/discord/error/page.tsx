"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "~/app/components/ui/button";

export default function DiscordErrorPage({}) {
  const searchParams = useSearchParams();
  const source = searchParams.get("source");

  const redirectUr =
    source === "/discord"
      ? "/api/discord"
      : source === "/discord/remove"
        ? "/api/discord/remove"
        : "/api/discord";

  return (
    <div className="mt-20 max-w-lg items-center justify-center text-center">
      <h2 className="font-htags  scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Възникна грешка с Discord профила
      </h2>
      <p className="mb-6 text-center text-lg italic leading-7 [&:not(:first-child)]:mt-6">
        Моля опитайте отново по-късно. Ако проблемът продължава, моля свържете
        се с нас на адрес hacktues@elsys-bg.org.
      </p>
      <Button asChild>
        <Link href={redirectUr}>Опитай отново</Link>
      </Button>
    </div>
  );
}
