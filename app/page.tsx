import Link from "next/link";

import { CountdownTimer } from "./components/countdowns";
import { CountdownHourglass } from "./components/hourglass";
import { Button } from "./components/ui/button";

export default async function Home() {
  return (
    <div className="flex min-h-fit w-full flex-col gap-4 md:flex-row">
      <CountdownHero />
    </div>
  );
}

function CountdownHero() {
  return (
    <div className="mx-auto flex min-h-fit w-full max-w-sm flex-col justify-between gap-10 md:max-w-4xl md:flex-row">
      <section className="flex h-full w-full flex-col items-center justify-center gap-4">
        <h1 className="text-center font-llpixel text-5xl text-accent-foreground md:text-7xl">
          Hack TUES&nbsp;X
        </h1>
        <div className="py-2" />
        <CountdownTimer to={new Date("2024-03-18T03:00:00.000Z")} />
        <Button asChild>
          <Link href="/register">Регистрирай се</Link>
        </Button>
      </section>
      <section className="flex w-full flex-col items-center justify-center gap-4">
        <CountdownHourglass />
      </section>
    </div>
  );
}
