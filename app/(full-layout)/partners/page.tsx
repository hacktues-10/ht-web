import { PropsWithChildren } from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  ALPHA_SPONSORS,
  BETA_SPONSORS,
  GAMMA_SPONSORS,
  MEDIA_ARTICLES,
  MediaArticle,
  PARTNERS,
} from "~/app/_configs/podkrepq";
import { DateDisplay } from "~/app/components/date-display";
import PodkrepqAutomationComponent from "~/app/components/podkrepqAutoDisplay";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";

export const metadata: Metadata = {
  title: "Спонсори и партньори",
  description:
    "Компании, които подкрепиха десетото юбилейно издание на Hack TUES X и ни помогнаха да го осъществим.",
};

export default function Podkrepq() {
  return (
    <>
      <SponsorsAndPartners />
      <MediaCoverage />
    </>
  );
}

function SponsorsAndPartners() {
  return (
    <section className="light relative flex flex-col gap-14 overflow-x-visible pb-14 pt-14 text-sand-foreground">
      <div className="absolute -left-[calc(100vw-100%)] bottom-0 top-0 -z-10 h-full w-[calc(100vw+(100vw-100%)/2)]" />
      <div className="grid grid-cols-1 place-items-center ">
        <div className="mb-52">
          <PodkrepqTitle>Алфа Спонсори</PodkrepqTitle>
          <PodkrepqAutomationComponent podkrepqshti={ALPHA_SPONSORS} />
        </div>
        <div className="mb-52">
          <PodkrepqTitle>Бета Спонсори</PodkrepqTitle>
          <PodkrepqAutomationComponent podkrepqshti={BETA_SPONSORS} />
        </div>
        <div className="mb-52">
          <PodkrepqTitle>Гама Спонсори</PodkrepqTitle>
          <PodkrepqAutomationComponent podkrepqshti={GAMMA_SPONSORS} />
        </div>
        <div className="mb-20 place-self-center">
          <PodkrepqTitle>Партньори</PodkrepqTitle>
          <PodkrepqAutomationComponent podkrepqshti={PARTNERS} />
        </div>
      </div>
    </section>
  );
}

function PodkrepqTitle({ children }: PropsWithChildren<{}>) {
  return (
    <h2 className=" scroll-m-20 pb-2 text-center text-5xl font-extrabold tracking-tight text-sand first:mt-0 md:mb-24">
      {children}
    </h2>
  );
}

function MediaCoverage() {
  return (
    <section className="relative flex flex-col items-center gap-3 pt-7">
      {/* <div
        className="absolute -top-3 left-1/2 -z-30 h-[34px] min-h-[800px] w-[300%] -translate-x-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,hsl(var(--sand)/0.15),transparent)]"
        aria-hidden
      /> */}
      <h2 className="scroll-m-20 pt-7 text-center text-5xl font-extrabold tracking-tight first:mt-0">
        Медиите за нас
      </h2>
      <div className="py-2" />
      {MEDIA_ARTICLES.map((article) => (
        <MediaArticleCard key={article.title} article={article} />
      ))}
    </section>
  );
}

function MediaArticleCard({ article }: { article: MediaArticle }) {
  return (
    <Link href={article.url} className="block" target="_blank">
      <Card
        asChild
        className="flex max-w-2xl flex-col overflow-clip transition-transform hover:scale-105 sm:flex-row"
      >
        <article>
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
              <DateDisplay date={article.date} />
            </CardFooter>
          </div>
        </article>
      </Card>
    </Link>
  );
}
