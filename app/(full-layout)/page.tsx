import { PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Calendar,
  Globe,
  LucideIcon,
  MapPin,
  Users,
  Wifi,
} from "lucide-react";

import {
  ALUMNI_REGISTRATION_START,
  COUNTDOWN_START,
  EVENT_END,
  EVENT_START,
  STUDENTS_REGISTRATION_START,
} from "~/app/_configs/hackathon";
import { Hackathon, HACKATHONS } from "../_configs/archive";
import { MediaArticle, Podkrepqsht } from "../_configs/podkrepq";
import {
  IfAllHTFeaturesOff,
  IfAnyHTFeatureOn,
  IfHTFeatureOn,
} from "../_integrations/components";
import { CountdownTimer } from "../components/countdowns";
import { CountdownHourglass } from "../components/hourglass";
import { HTXLogoDuotone } from "../components/logos";
import { Button } from "../components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { cn, FEBRUARY, JANUARY } from "../utils";

export default async function LandingPage() {
  return (
    <div className="flex min-h-fit w-full flex-col">
      <CountdownHero />
      {/* <section className="light relative flex flex-col gap-14 overflow-x-visible bg-sand pb-14 pt-28 text-sand-foreground">
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
      </section> */}
      <ArchiveRoot>
        <section className="grid place-items-center gap-3">
          <p className="scroll-m-20 py-16 text-center font-lazydog text-2xl tracking-tight first:mt-0 sm:text-3xl">
            В началото всичко бе пусто. <br />И тогава се появи...
          </p>
        </section>
        {HACKATHONS.map((hackathon) => (
          <ArchiveSection key={hackathon.name} {...hackathon}>
            <h3 className="scroll-m-20 pb-2 text-2xl font-extrabold tracking-tight first:mt-0 sm:text-3xl">
              {hackathon.theme}
            </h3>
            <ArchiveLocation {...hackathon} />
            <ArchiveStats stats={hackathon.stats} />
            <ArchiveActionButtons>
              {!!hackathon.websiteArchiveUrl && (
                <Button
                  asChild
                  variant="secondary"
                  className="h-full w-full max-w-xs gap-2 backdrop-blur-md sm:w-fit"
                >
                  <Link href={hackathon.websiteArchiveUrl} target="_blank">
                    <Globe className="h-4 w-4" /> Уебсайт
                  </Link>
                </Button>
              )}
              <Button asChild className="h-full w-full max-w-xs gap-2 sm:w-fit">
                <Link href={`/archive/${hackathon.id}`}>
                  Още за {hackathon.name} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </ArchiveActionButtons>
          </ArchiveSection>
        ))}
        <ArchiveSection font={null} className="gap-7 sm:gap-9">
          <div className="flex flex-col gap-1">
            <h2 className="scroll-m-20 pb-2 text-5xl font-extrabold tracking-tight text-destructive first:mt-0 sm:text-6xl">
              <HTXLogoDuotone />
            </h2>
            <p className="scroll-m-20 pb-2 font-lazydog text-xl font-extrabold italic tracking-tight first:mt-0">
              „Десетото юбилейно издание на емблематичния за ТУЕС хакатон!“
            </p>
          </div>
          <ArchiveLocation
            startDate={EVENT_START}
            endDate={EVENT_END}
            location="София Тех Парк"
            format="присъствен"
          />
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl font-bold">
              Веднъж ТУЕС-ар, винаги ТУЕС-ар!
            </h3>
            <p className="text-lg">
              За първи път в историята на Hack TUES могат да участват завършили
              ученици.
              <ArchiveStatsCard className="md:grid-cols-2">
                <p className="col-span-2 pb-3 text-center text-2xl font-semibold">
                  Но местата са ограничени!
                </p>
                <ArchiveStatsItem value={80} label="отбора на ученици" />
                <ArchiveStatsItem value={10} label="отбора на завършили" />
                <p className="text-md col-span-2 text-center font-light">
                  Регистрацията <em className="italic">затваря окончателно</em>{" "}
                  на{" "}
                  {dateFormatter.format(
                    fiveDaysAfter(ALUMNI_REGISTRATION_START),
                  )}{" "}
                  за завършили и на{" "}
                  {dateFormatter.format(
                    fiveDaysAfter(STUDENTS_REGISTRATION_START),
                  )}{" "}
                  за ученици, или{" "}
                  <strong className="font-extrabold">
                    до изчерпване на местата
                  </strong>
                  .
                </p>
              </ArchiveStatsCard>{" "}
            </p>
          </div>
          <IfAnyHTFeatureOn outOf={["register-alumni", "register-students"]}>
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <h3 className="text-2xl font-bold md:text-3xl">
                Не пропускайте възможността да участвате!
              </h3>
              <Link href="/signup">
                <Button size="lg">Регистрирайте се!</Button>
              </Link>
            </div>
          </IfAnyHTFeatureOn>
        </ArchiveSection>
      </ArchiveRoot>
      {/* <section className="relative flex flex-col items-center gap-3 pt-7">
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
      </section> */}
      <div className="pb-4"></div>
    </div>
  );
}

function PageBackdrop({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        "absolute inset-y-0 left-1/2 -z-30 w-[300%] -translate-x-1/2 ",
        className,
      )}
      aria-hidden
    />
  );
}

function AnniversaryBadge() {
  return (
    <div className="flex items-center justify-center gap-2">
      <Award />
      <p className="text-center font-bold">Десето юбилейно издание</p>
    </div>
  );
}

function CountdownHero() {
  return (
    <div className="mx-auto flex min-h-fit w-full max-w-sm flex-col items-center justify-between gap-10 md:max-w-5xl md:flex-row">
      <section className="flex h-full w-full flex-col items-center justify-center gap-4">
        <h1 className="relative inline-block bg-gradient-to-br from-[#ce0e3eff] to-[#e3686bff] bg-clip-text text-center font-llpixel text-5xl text-transparent md:text-7xl">
          <div
            className="absolute left-1/2 top-1/2 -z-30 h-[300%] min-h-[800px] w-[300%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,#ce0e3e1c,transparent)]"
            aria-hidden
          />
          <PageBackdrop className="top-1/2 h-[300%] min-h-[800px] -translate-y-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,#ce0e3e1c,transparent)]" />
          Hack TUES&nbsp;
          <span className="bg-[radial-gradient(farthest-corner_at_100%_50%,#ffdea6a3_3%,transparent_45%)] bg-clip-text text-transparent">
            X
          </span>
        </h1>
        <p className="lg:text-md text-center font-lazydog text-xs">
          Eмблематичният за ТУЕС хакатон се&nbsp;завръща!
        </p>

        <div className="flex flex-col gap-1 text-sm font-semibold">
          <IconParagraph icon={Calendar}>
            {dateFormatter.formatRange(EVENT_START, EVENT_END)}
          </IconParagraph>
          <IconParagraph icon={MapPin}>София Тех Парк</IconParagraph>
        </div>

        <CountdownTimer to={EVENT_START} />
        <Link href="/signup">
          <Button size="lg">Регистрирайте се!</Button>
        </Link>
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

function ArchiveRoot({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col sm:ps-14">
      {children}
    </div>
  );
}

function ArchiveSection({
  children,
  logo,
  font,
  themeStyle,
  colorClasses,
  className,
}: PropsWithChildren<
  Pick<Partial<Hackathon>, "logo" | "font" | "themeStyle" | "colorClasses"> & {
    className?: string;
  }
>) {
  return (
    <section
      className={cn(
        "relative flex flex-col gap-5 py-10 text-foreground sm:gap-7 sm:py-16",
        className,
      )}
      style={{
        ...(font ? font : {}),
        ...themeStyle,
      }}
    >
      {!!colorClasses && (
        <PageBackdrop
          className={cn(colorClasses, "inset-y-0 h-full min-h-0")}
        />
      )}
      {!!logo && (
        <h2 className="scroll-m-20 pb-2 text-5xl font-extrabold tracking-tight text-destructive first:mt-0 sm:text-6xl">
          {logo}
        </h2>
      )}
      {children}
    </section>
  );
}

function IconParagraph({
  children,
  icon: Icon,
}: PropsWithChildren<{ icon: LucideIcon }>) {
  return (
    <p className="flex items-center gap-2">
      <Icon className="h-4 w-4" /> {children}
    </p>
  );
}

function ArchiveLocation({
  startDate,
  endDate,
  location,
  format,
}: Pick<Hackathon, "startDate" | "endDate" | "location" | "format">) {
  const FormatIcon = format === "онлайн" ? Wifi : Users;
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-4">
      <IconParagraph icon={Calendar}>
        {dateFormatter.formatRange(startDate, endDate)}
      </IconParagraph>
      {location ? (
        <IconParagraph icon={MapPin}>{location}</IconParagraph>
      ) : null}
      <IconParagraph icon={FormatIcon}>{format} формат</IconParagraph>
    </div>
  );
}

function ArchiveStatsCard({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className="py-6">
      <Card
        className={cn(
          "flex w-full flex-col items-center justify-center gap-2 p-5 md:grid md:grid-cols-3",
          className,
        )}
      >
        {children}
      </Card>
    </div>
  );
}

function ArchiveStats({
  children,
  stats,
}: PropsWithChildren<Pick<Hackathon, "stats">>) {
  return (
    <ArchiveStatsCard>
      <ArchiveStatsItem value={stats.participants} label="участници" />
      <ArchiveStatsItem value={stats.teams} label="отбора" />
      <ArchiveStatsItem value={stats.awardedTeams} label="наградени проекта" />
    </ArchiveStatsCard>
  );
}

function ArchiveStatsItem({ value, label }: { value: number; label: string }) {
  return (
    <Card className="flex h-full w-full max-w-xs flex-1 flex-col items-center justify-around gap-2 p-4 text-center">
      <p className="text-4xl font-extrabold">{value}</p>
      <p className="text-sm">{label}</p>
    </Card>
  );
}

function ArchiveActionButtons({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
      {children}
    </div>
  );
}

function fiveDaysAfter(date: Date) {
  const fiveDays = 5 * 24 * 60 * 60 * 1000;
  const oneDay = 24 * 60 * 60 * 1000;
  return new Date(date.getTime() + fiveDays - oneDay);
}
