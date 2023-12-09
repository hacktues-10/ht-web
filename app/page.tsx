import Image from "next/image";
import Link from "next/link";

import { PropsWithChildren } from "react";
import { CountdownTimer } from "./components/countdowns";
import { CountdownHourglass } from "./components/hourglass";
import { Button } from "./components/ui/button";
import {
  ALPHA_SPONSORS,
  BETA_SPONSORS,
  GAMMA_SPONSORS,
  PARTNERS,
  Podkrepqsht,
} from "./podkrepq";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-fit w-full gap-4">
      <CountdownHero />
      <section className="relative flex flex-col gap-14 text-sand-foreground bg-sand pt-28 pb-14 overflow-x-visible">
        <div className="bg-sand -z-10 absolute top-0 bottom-0 h-full w-[calc(100vw+(100vw-100%)/2)] -left-[calc(100vw-100%)]" />
        <PordkrepqPackage>
          <PodkrepqTitle>Алфа Спонсори</PodkrepqTitle>
          <PodkrepqPackageScrollableContent podkrepqshti={ALPHA_SPONSORS} />
        </PordkrepqPackage>
        <PordkrepqPackage>
          <PodkrepqTitle>Бета Спонсори</PodkrepqTitle>
          <PodkrepqPackageScrollableContent podkrepqshti={BETA_SPONSORS} />
        </PordkrepqPackage>
        <PordkrepqPackage>
          <PodkrepqTitle>Гама Спонсори</PodkrepqTitle>
          <PodkrepqPackageScrollableContent podkrepqshti={GAMMA_SPONSORS} />
        </PordkrepqPackage>
        <PordkrepqPackage>
          <PodkrepqTitle>Партньори</PodkrepqTitle>
          <PodkrepqPackageScrollableContent podkrepqshti={PARTNERS} />
        </PordkrepqPackage>
      </section>
    </div>
  );
}

function CountdownHero() {
  return (
    <div className="mx-auto flex min-h-fit w-full max-w-sm flex-col justify-between items-center gap-10 md:max-w-4xl md:flex-row">
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
      <aside className="flex w-full flex-col items-center justify-center gap-4">
        <h1 className="sr-only">Пясъчен часовник</h1>
        <CountdownHourglass />
      </aside>
    </div>
  );
}

function PodkrepqPackageScrollableContent({
  podkrepqshti,
}: {
  podkrepqshti: Podkrepqsht[];
}) {
  return (
    <ul className="grid mx-auto max-w-sm grid-cols-1 gap-6 p-2 sm:grid-cols-2 sm:max-w-3xl md:grid-cols-3">
      {podkrepqshti.map((podkrepqsht) => (
        <li key={podkrepqsht.name} title={podkrepqsht.name}>
          <Link
            href={podkrepqsht.url}
            className="grid place-content-center group rounded-lg flex-1 aspect-video shrink-0 relative bg-white p-4 overflow-clip shadow-sm"
          >
            <Image
              className="group-hover:scale-110 max-w-full max-h-full transition-transform px-3 py-5 object-contain"
              src={podkrepqsht.logo}
              alt={podkrepqsht.name}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function PordkrepqPackage({ children }: PropsWithChildren) {
  return <section className="flex gap-3 flex-col">{children}</section>;
}

function PodkrepqTitle({ children }: PropsWithChildren<{}>) {
  return (
    <h2 className="scroll-m-20 text-center pb-2 text-4xl font-extrabold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}
