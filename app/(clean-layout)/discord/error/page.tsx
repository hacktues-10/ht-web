"use client";

import { redirect, useSearchParams } from "next/navigation";

import { DiscordLoadingLink } from "../_components/discord-loading-link";

export default function DiscordErrorPage({}) {
  const searchParams = useSearchParams();
  const source = searchParams.get("source");

  const redirectUr =
    source === "/discord"
      ? "/api/discord"
      : source === "/discord/remove"
        ? "/api/discord/remove"
        : "/user/configure";

  if (redirectUr === "/user/configure") {
    redirect(redirectUr);
  }

  return (
    <div className="mt-20 max-w-lg items-center justify-center text-center">
      <h2 className="scroll-m-20  border-b pb-2 font-htags text-3xl font-semibold tracking-tight first:mt-0">
        Възникна грешка с Discord профила
      </h2>
      <p className="mb-6 text-center text-lg italic leading-7 [&:not(:first-child)]:mt-6">
        Моля опитайте отново по-късно. Ако проблемът продължава, моля свържете
        се с нас на адрес hacktues@elsys-bg.org.
      </p>
      <DiscordLoadingLink href={redirectUr}>Опитай отново</DiscordLoadingLink>
    </div>
  );
}
