import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { MEDIA_ARTICLES, MediaArticle } from "~/app/_configs/podkrepq";
import DateDisplayWrongTimezone from "~/app/components/date-display/wrong-timezone/date-display";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";
import { cn } from "~/app/utils";

export const metadata: Metadata = {
  title: "Медиите за нас",
  description:
    "Медиите, които подкрепиха десетото юбилейно издание на Hack TUES X и ни помогнаха да го осъществим.",
  openGraph: {},
};

export default function MediaCoverage() {
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
        className={cn(
          "flex max-w-2xl flex-col overflow-clip transition-transform hover:scale-105 sm:flex-row",
          article.date.getFullYear() >= 2024 &&
            "border-brand/10 bg-gradient-to-tl from-brand/20 to-sand/20 shadow-lg shadow-brand/25 transition-all hover:from-brand/30",
        )}
      >
        <article>
          <figure
            className={cn(
              "relative grid aspect-video flex-1 shrink-0 place-content-center overflow-clip border-b p-4 text-card-foreground shadow-sm backdrop-blur-md sm:w-1/2 sm:border-b-0 sm:border-r",
              article.date.getFullYear() < 2024 && "bg-card/5",
              article.date.getFullYear() >= 2024 && "bg-white",
            )}
          >
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
              <DateDisplayWrongTimezone date={article.date} />
            </CardFooter>
          </div>
        </article>
      </Card>
    </Link>
  );
}
