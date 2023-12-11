import Link from "next/link";

import { Button } from "~/app/components/ui/button";

export default function DiscordPage() {
  return (
    <div className="mt-20 items-center justify-center text-center">
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
