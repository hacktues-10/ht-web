import { PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";

import { CountdownTimer } from "./components/countdowns";
import { CountdownHourglass } from "./components/hourglass";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  ALPHA_SPONSORS,
  BETA_SPONSORS,
  GAMMA_SPONSORS,
  MEDIA_ARTICLES,
  MediaArticle,
  PARTNERS,
  Podkrepqsht,
} from "./podkrepq";

export default async function Home() {
  return (
    <div className="flex min-h-fit w-full flex-col gap-4">
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
      </section>
      <section className="flex flex-col items-center gap-3 pt-7">
        <h2 className="scroll-m-20 pt-7 text-center text-5xl font-extrabold tracking-tight first:mt-0">
          Медиите за нас
        </h2>
        <div className="py-2" />
        {MEDIA_ARTICLES.map((article) => (
          <MediaArticleCard key={article.title} article={article} />
        ))}
      </section>
    </div>
  );
}

function CountdownHero() {
  return (
    <div className="mx-auto flex min-h-fit w-full max-w-sm flex-col items-center justify-between gap-10 md:max-w-4xl md:flex-row">
      <section className="flex h-full w-full flex-col items-center justify-center gap-4">
        <h1 className="text-center font-llpixel text-5xl text-primary md:text-7xl">
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
    <h2 className="scroll-m-20 pb-2 text-center text-4xl font-extrabold tracking-tight text-primary first:mt-0">
      {children}
    </h2>
  );
}

function MediaArticleCard({ article }: { article: MediaArticle }) {
  const dateFormatter = new Intl.DateTimeFormat("bg", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={article.url} className="block">
      <Card className="flex max-w-2xl flex-col transition-transform hover:scale-105 sm:flex-row">
        <Card className="relative grid aspect-video flex-1 shrink-0 place-content-center overflow-clip p-4 sm:w-1/2">
          <Image
            className="max-h-full max-w-full object-contain px-3 py-5 transition-transform"
            src={article.logo}
            alt={article.name}
          />
        </Card>
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
