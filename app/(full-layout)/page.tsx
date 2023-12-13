import { PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";

import { COUNTDOWN_START, EVENT_START } from "~/app/_configs/hackathon";
import {
  ALPHA_SPONSORS,
  BETA_SPONSORS,
  GAMMA_SPONSORS,
  MEDIA_ARTICLES,
  MediaArticle,
  PARTNERS,
  Podkrepqsht,
} from "../_configs/podkrepq";
import { SignInButton } from "../components/buttons";
import { CountdownTimer } from "../components/countdowns";
import { CountdownHourglass } from "../components/hourglass";
import { Button } from "../components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "../components/ui/card";

export default async function LandingPage() {
  return (
    <div className="flex min-h-fit w-full flex-col">
      <CountdownHero />
      <section className="light relative flex flex-col gap-14 overflow-x-visible bg-sand pb-14 pt-28 text-sand-foreground">
        <div className="absolute -left-[calc(100vw-100%)] bottom-0 top-0 -z-10 h-full w-[calc(100vw+(100vw-100%)/2)] bg-sand" />
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
        <div className="py-9" />
      </section>
      <section className="relative flex flex-col items-center gap-3 pt-7">
        <div
          className="absolute -top-3 left-1/2 -z-30 h-[34px] min-h-[800px] w-[300%] -translate-x-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,hsl(var(--sand)/0.15),transparent)]"
          aria-hidden
        />
        <h2 className="scroll-m-20 pt-7 text-center text-5xl font-extrabold tracking-tight first:mt-0">
          Медиите за нас
        </h2>
        <div className="py-2" />
        {MEDIA_ARTICLES.map((article) => (
          <MediaArticleCard key={article.title} article={article} />
        ))}
      </section>
      <div className="pb-4"></div>
    </div>
  );
}

function CountdownHero() {
  return (
    <div className="mx-auto flex min-h-fit w-full max-w-sm flex-col items-center justify-between gap-10 md:max-w-4xl md:flex-row">
      <section className="flex h-full w-full flex-col items-center justify-center gap-4">
        <h1 className="relative inline-block bg-gradient-to-br from-[#ce0e3eff] to-[#e3686bff] bg-clip-text text-center font-llpixel text-5xl text-transparent md:text-7xl">
          <div
            className="absolute left-1/2 top-1/2 -z-30 h-[300%] min-h-[800px] w-[300%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,#ce0e3e1c,transparent)]"
            aria-hidden
          />
          Hack TUES&nbsp;
          <span className="bg-[radial-gradient(farthest-corner_at_100%_50%,#ffdea6a3_3%,transparent_45%)] bg-clip-text text-transparent">
            X
          </span>
        </h1>
        <div className="py-2" />
        <CountdownTimer to={EVENT_START} />
        <Button asChild>
          <SignInButton>Регистрирай се</SignInButton>
        </Button>
      </section>
      <aside className="relative flex w-full flex-col items-center justify-center gap-4">
        <h2 className="sr-only">Пясъчен часовник</h2>
        <div
          className="absolute left-1/2 top-1/2 -z-30 h-[300%] min-h-[800px] w-[300%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,#ffdfa62f,transparent)]"
          aria-hidden
        />
        <CountdownHourglass from={COUNTDOWN_START} to={EVENT_START} />
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
    <ul className="mx-auto grid max-w-sm grid-cols-1 gap-6 p-2 sm:max-w-3xl sm:grid-cols-2 md:grid-cols-3">
      {podkrepqshti.map((podkrepqsht) => (
        <li key={podkrepqsht.name} title={podkrepqsht.name}>
          <Link
            href={podkrepqsht.url}
            className="group relative grid aspect-video flex-1 shrink-0 place-content-center overflow-clip rounded-lg bg-white p-4 shadow-md"
            target="_blank"
          >
            <Image
              className="max-h-full max-w-full object-contain px-3 py-5 transition-transform group-hover:scale-110"
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
  return <section className="flex flex-col gap-3">{children}</section>;
}

function PodkrepqTitle({ children }: PropsWithChildren<{}>) {
  return (
    <h2 className="scroll-m-20 pb-2 text-center text-4xl font-extrabold tracking-tight text-destructive first:mt-0">
      {children}
    </h2>
  );
}

const dateFormatter = new Intl.DateTimeFormat("bg", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

function MediaArticleCard({ article }: { article: MediaArticle }) {
  return (
    <Link href={article.url} className="block" target="_blank">
      <Card className="flex max-w-2xl flex-col overflow-clip transition-transform hover:scale-105 sm:flex-row">
        <figure className="relative grid aspect-video flex-1 shrink-0 place-content-center overflow-clip border-b bg-card/5 p-4 text-card-foreground shadow-sm backdrop-blur-md sm:w-1/2 sm:border-b-0 sm:border-r">
          <Image
            className="max-h-full max-w-full object-contain px-3 py-5 transition-transform"
            src={article.logo}
            alt={article.name}
          />
        </figure>
        <div className="flex-1">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-center sm:text-left">
              {article.title}
            </CardTitle>
          </CardHeader>
          <div className="pb-3 text-center sm:hidden">{"●"}</div>
          <CardFooter className="justify-center text-center sm:justify-start sm:text-left">
            <time dateTime={article.date.toISOString()}>
              {dateFormatter.format(article.date)}
            </time>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}
