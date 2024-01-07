import Image from "next/image";
import Link from "next/link";

import { Button } from "~/app/components/ui/button";
import sullyHourglass from "./sully-hourglass.svg";

export function ComingSoonPage() {
  return (
    <div className="flex h-full max-w-lg flex-col items-center justify-center gap-5 text-center">
      <h1 className="font-lazydog text-4xl font-bold md:text-6xl">
        Очаквайте скоро!
      </h1>
      <p className="text-2xl font-semibold">
        Порталът към тази страница тепърва предстои да се отвори.
      </p>
      <Button
        asChild
        variant="ghost"
        className="my-3 text-lg hover:backdrop-blur-sm"
      >
        <Link href="/">{"<-"} Обратно в началото</Link>
      </Button>
      <Image
        className="h-[270px] [mask-image:linear-gradient(to_bottom,white,calc(100%-30px),transparent)]"
        src={sullyHourglass}
        alt="Sully hourglass"
      />
    </div>
  );
}
