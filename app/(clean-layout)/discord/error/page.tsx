import Link from "next/link";
import { redirect } from "next/navigation";

import { DiscordLoadingLink } from "../_components/discord-loading-link";

export default function DiscordErrorPage({
  searchParams: { source, q: obfuscatedErrorCode, t: obfuscatedTimestamp },
}: {
  searchParams: { source?: string; q?: string; t?: string };
}) {
  const redirectUrl =
    source === "/discord"
      ? "/api/discord"
      : source === "/discord/remove"
        ? "/api/discord/remove"
        : "/user/configure";

  // this must be done bc its client component
  if (redirectUrl === "/user/configure") {
    redirect(redirectUrl);
  }

  const errorCode =
    obfuscatedErrorCode &&
    obfuscatedTimestamp &&
    getErrorCode(obfuscatedErrorCode, obfuscatedTimestamp);

  return (
    <div className="mt-20 max-w-lg items-center justify-center text-center">
<<<<<<< HEAD
      <h2 className="scroll-m-20  border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Възникна грешка с Discord профила
=======
      <h2 className="scroll-m-20  border-b pb-2 font-htags text-3xl font-semibold tracking-tight first:mt-0">
        Нещо се обърка
>>>>>>> ee67f8c (improved discord flow error handling)
      </h2>
      <p className="mb-6 text-center text-lg leading-7 [&:not(:first-child)]:mt-6">
        Възникна неочаквана грешка при комуникацията с Discord. Моля, опитайте
        отново.
      </p>
      <DiscordLoadingLink href={redirectUrl}>Опитай отново</DiscordLoadingLink>
      <div className="my-9 space-y-3 text-sm text-muted-foreground">
        <p className="text-center italic">
          Ако проблемът продължава, моля, свържете се с нас на адрес{" "}
          <Link href="mailto:hacktues@elsys-bg.org" className="underline">
            hacktues@elsys-bg.org
          </Link>
          .
        </p>
        {!!errorCode && (
          <>
            <p className="text-center italic">
              Когато се свързвате с нас, моля, споделете следния код на
              грешката:
            </p>
            <p className="text-md text-center italic">
              <code>HT-{errorCode}</code>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function getErrorCode(
  obfuscatedErrorCode: string,
  obfuscatedTimestamp: string,
) {
  try {
    const errorCode = parseInt(obfuscatedErrorCode, 36);
    if (isNaN(errorCode)) {
      return null;
    }
    const timestamp = parseInt(obfuscatedTimestamp, 36);
    if (isNaN(timestamp)) {
      return null;
    }
    const transform = (str: string) => str.split("").reverse().join("");
    return btoa(
      transform(obfuscatedErrorCode) + ":" + transform(obfuscatedTimestamp),
    ).replace(/=/g, "");
  } catch {
    return null;
  }
}
