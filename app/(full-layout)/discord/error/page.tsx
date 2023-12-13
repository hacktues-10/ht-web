import Link from "next/link";

import { Button } from "~/app/components/ui/button";

export default function DiscordErrorPage() {
  return (
    <div className="mt-20 max-w-lg items-center justify-center text-center">
      <h2 className="font-htags  scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Възникна грешка при свързването с Discord профила
      </h2>
      <p className="mb-6 text-center text-lg italic leading-7 [&:not(:first-child)]:mt-6">
        Моля опитайте отново по-късно. Ако проблемът продължава, моля свържете
        се с нас на адрес hacktues@elsys-bg.org.
      </p>
      <Button>
        <Link href="/api/discord">Опитай отново</Link>
      </Button>
    </div>
  );
}
