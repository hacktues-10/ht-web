import React, { PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Calendar,
  ChevronDown,
  Globe,
  LinkIcon,
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
  MAX_TEAMS_ALUMNI,
  MAX_TEAMS_STUDENTS,
  STUDENTS_REGISTRATION_START,
} from "~/app/_configs/hackathon";
import ht8Image from "~/app/assets/img/ht8_stream_3.jpg";
import { Hackathon, HACKATHONS } from "../_configs/archive";
import { IfAnyHTFeatureOn } from "../_integrations/components";
import { CountdownTimer } from "../components/countdowns";
import { DateDisplay, DateRangeDisplay } from "../components/date-display";
import { CountdownHourglass } from "../components/hourglass";
import { HTLogo, HTXLogoDuotone } from "../components/logos";
import { PageBackdrop } from "../components/page-backdrop";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { cn } from "../utils";

export default async function LandingPage() {
  return (
    <div className="flex min-h-fit w-full flex-col">
      <CountdownHero />
      <UnescoSection />
      <ArchiveContainer>
        <section className="grid place-items-center gap-9 pb-12 pt-28">
          <p className="scroll-m-20 text-center font-lazydog text-2xl tracking-tight first:mt-0 sm:text-3xl">
            В началото всичко бе пусто. <br />И тогава се появи...
          </p>
          <ChevronDownLink
            href="#the-beginning"
            className="motion-safe:animate-bounce motion-safe:scroll-smooth"
          />
        </section>
        {HACKATHONS.map((hackathon, i, hackathons) => (
          <ArchiveSection key={hackathon.name} {...hackathon}>
            <div className="flex flex-col">
              <p className="text-xl font-light uppercase text-primary">Тема</p>
              <h3 className="scroll-m-20 pb-2 text-2xl font-extrabold tracking-tight first:mt-0 sm:text-3xl">
                {hackathon.theme}
              </h3>
            </div>
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
                {/* TODO: add back when we add archive pages */}
                {/* <Link href={`/archive/${hackathon.id}`}> */}
                <Link href={hackathon.aztuesArticleUrl} target="_blank">
                  Още за {hackathon.name} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </ArchiveActionButtons>
            <div className="grid w-full place-items-center">
              {hackathons.at(i + 1) ? (
                <ChevronDownLink href={`#${hackathons.at(i + 1)!.id}`} />
              ) : (
                <ChevronDownLink href="#hacktues-x" />
              )}
            </div>
          </ArchiveSection>
        ))}
        <ArchiveSection id={"hacktues-x" as any} className="gap-10 sm:gap-9">
          <div className="flex flex-col gap-1">
            <h2 className="scroll-m-20 pb-2 text-5xl font-extrabold tracking-tight text-destructive first:mt-0 sm:text-6xl">
              <HTXLogoDuotone />
            </h2>
            <p className="scroll-m-20 pb-2 font-lazydog text-xl font-extrabold italic tracking-tight first:mt-0">
              „Десетото юбилейно издание на емблематичния за ТУЕС хакатон“
            </p>
          </div>
          {/* <ArchiveLocation
            startDate={EVENT_START}
            endDate={EVENT_END}
            location="София Тех Парк"
            format="присъствен"
          /> */}
          <Card className="flex flex-col items-center justify-center gap-4 p-5 text-center">
            <h3 className="pb-3 text-2xl font-bold md:text-3xl">
              Веднъж ТУЕС-ар, завинаги ТУЕС-ар!
            </h3>
            <p className="text-lg">
              Десетото юбилейно издание на Hack TUES дава възможност за участие
              на{" "}
              <span className="font-bold text-primary">завършили туесари</span>{" "}
              от всички випуски на ТУЕС!
            </p>
          </Card>
          <ArchiveStatsCard className="md:grid-cols-2">
            <p className="col-span-2 pb-3 text-center text-2xl font-semibold md:text-3xl">
              Местата са ограничени!
            </p>
            <ArchiveStatsItem
              value={MAX_TEAMS_STUDENTS}
              label="отбора на ученици"
            />
            <ArchiveStatsItem
              value={MAX_TEAMS_ALUMNI}
              label="отбора на завършили"
            />
            <p className="col-span-2 text-center text-lg font-light">
              Регистрацията за завършили{" "}
              <em className="italic">ще бъде отворена</em> от{" "}
              <DateDisplay date={ALUMNI_REGISTRATION_START} /> до{" "}
              <DateDisplay date={fiveDaysAfter(ALUMNI_REGISTRATION_START)} />, а
              за ученици <em className="italic">от</em>{" "}
              <DateDisplay date={STUDENTS_REGISTRATION_START} /> до{" "}
              <DateDisplay date={fiveDaysAfter(STUDENTS_REGISTRATION_START)} />,
              или{" "}
              <strong className="font-extrabold">
                до изчерпване на местата
              </strong>
              .
            </p>
          </ArchiveStatsCard>
          {/* <IfAnyHTFeatureOn outOf={["register-alumni", "register-students"]}>
            <Card className="flex flex-col items-center justify-center gap-4 p-5 text-center">
              <h3 className="pb-3 text-2xl font-bold md:text-3xl">
                Не пропускайте възможността да участвате!
              </h3>
              <Button asChild size="lg">
                <Link href="/signup">Регистрирайте се!</Link>
              </Button>
            </Card>
          </IfAnyHTFeatureOn> */}
        </ArchiveSection>
      </ArchiveContainer>
      <IfAnyHTFeatureOn outOf={["register-alumni", "register-students"]}>
        <section className="relative flex flex-col items-center gap-3 pb-16 pt-5">
          <h2 className="scroll-m-20 pt-7 text-center text-5xl font-extrabold tracking-tight first:mt-0">
            Какво чакате?
          </h2>
          <div className="py-2" />
          <Button size="lg">
            <Link href="/signup">Регистрирайте се сега!</Link>
          </Button>
        </section>
      </IfAnyHTFeatureOn>
      <div className="pb-4"></div>
    </div>
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
        <div className="flex flex-col items-center justify-center">
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
          <p className="text-center font-lazydog text-sm lg:text-lg">
            Eмблематичният за ТУЕС хакатон се&nbsp;завръща!
          </p>
        </div>

        <div className="flex flex-col gap-1 py-3 text-sm font-semibold">
          <IconParagraph icon={Calendar}>
            <DateRangeDisplay startDate={EVENT_START} endDate={EVENT_END} />
          </IconParagraph>
          <IconParagraph icon={MapPin}>София Тех Парк</IconParagraph>
          <IconParagraph icon={Award}>10-ТО ЮБИЛЕЙНО ИЗДАНИЕ!!!</IconParagraph>
          {/* <IconParagraph icon={Landmark}>
            Българската практика от ЮНЕСКО{" "}
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="h-auto p-1"
                >
                  <Link href="#unesco">
                    {" "}
                    <Info className="h-3 w-3 scale-125" />
                  </Link>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 space-y-2 text-center">
                <p>
                  През 2023 г. Hack TUES, намери своето място сред иновативните
                  и обещаващи практики на ЮНЕСКО за Техническо и професионално
                  образование и обучение.
                </p>
                <Button asChild>
                  <Link href="#unesco">
                    Прочетете повече <ArrowDown className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </HoverCardContent>
            </HoverCard>
          </IconParagraph> */}
        </div>

        <CountdownTimer to={EVENT_START} />

        <Button asChild size="lg">
          <Link href="/signup">Регистрирайте се!</Link>
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

function ArchiveContainer({ children }: PropsWithChildren) {
  return (
    <div id="the-beginning" className="mx-auto flex w-full max-w-4xl flex-col">
      {children}
    </div>
  );
}

function ArchiveSection({
  children,
  id,
  logo,
  font,
  themeStyle,
  colorClasses,
  className,
  background: Background,
}: PropsWithChildren<
  Pick<
    Partial<Hackathon>,
    "id" | "logo" | "font" | "themeStyle" | "colorClasses" | "background"
  > & {
    className?: string;
  }
>) {
  return (
    <section
      id={id}
      className={cn(
        "relative flex flex-col justify-center gap-5 py-28 text-foreground sm:gap-7 sm:py-16",
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
      {!!Background && <Background />}
      {!!logo && (
        <h2 className="inline-flex w-full scroll-m-20 pb-2 text-4xl font-extrabold tracking-tight text-destructive first:mt-0 sm:text-6xl">
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
        <DateRangeDisplay startDate={startDate} endDate={endDate} />
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
    <Card
      className={cn(
        "flex w-full flex-col items-center justify-center gap-2 p-5 md:grid md:grid-cols-3",
        className,
      )}
    >
      {children}
    </Card>
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
    <Card className="flex w-full flex-1 flex-col items-center justify-around gap-2 p-4 text-center">
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

function UnescoSection() {
  const UNESCO_URL =
    "https://unevoc.unesco.org/home/Promising+Practices+in+TVET/lang=en/id=6662";
  return (
    <section
      id="unesco"
      className="light relative grid place-items-center gap-14 overflow-x-visible pb-32 pt-28 text-sand-foreground"
    >
      <div className="absolute -left-[calc(100vw-100%)] bottom-0 top-0 -z-10 h-full w-[calc(100vw+(100vw-100%)/2)]">
        <SandMask className="absolute inset-0 h-full w-full fill-sand" />
      </div>
      {/* <div className="absolute -left-[calc(100vw-100%)] bottom-0 top-0 -z-10 h-full w-[calc(100vw+(100vw-100%)/2)] [clip-path:url(#sandMaskBg)]" /> */}
      <div className="flex max-w-5xl flex-col-reverse items-center justify-center gap-8 sm:flex-row">
        <div className="flex-3 flex w-full items-center justify-center">
          <Link href={UNESCO_URL} target="_blank">
            <Image
              src={ht8Image}
              alt="Екипът на Hack TUES 8 гледа в екрана на лаптоп"
              className="h-auto w-full rounded-lg object-cover object-center shadow-md transition-all hover:scale-105 hover:shadow-xl"
            />
          </Link>
        </div>
        <div className="flex w-full flex-col gap-1">
          <h2 className="scroll-m-20 pb-2 text-center text-4xl font-extrabold tracking-tight text-destructive first:mt-0">
            <HTLogo className="font-extrabold">Hack TUES</HTLogo> в ЮНЕСКО
          </h2>
          <p className="text-md scroll-m-20 pb-2 font-semibold tracking-tight first:mt-0">
            Емблематичният за ТУЕС към ТУ – София хакатон, организиран от
            ученици за ученици,{" "}
            <HTLogo className="font-semibold text-inherit">
              Hack&nbsp;TUES
            </HTLogo>
            , намери своето място сред иновативните и обещаващи практики на
            ЮНЕСКО за Техническо и професионално образование и обучение. Това
            прави{" "}
            <HTLogo className="font-semibold text-inherit">
              Hack&nbsp;TUES
            </HTLogo>{" "}
            единствената образователна практика в България, която е включена в
            тази глобална инициатива.
          </p>
          <Button asChild variant="destructive">
            <Link href={UNESCO_URL} target="_blank">
              <LinkIcon className="mr-2 h-4 w-4" /> Прочетете повече
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function SandMask(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      viewBox="0 0 1714 700"
      preserveAspectRatio="none"
      {...props}
    >
      {/* <defs> */}
      {/* <clipPath id="sandMaskBg"> */}
      <path
        d="M1737.85 23.892v612.101s-27.61-18.834-62.12-7.343c-46.35 15.435-66.7-28.67-140.76-6.541-50.66 15.14-35.46 132.699-138.8 2.007-12.36-15.635-45-40.734-63.89-18.243-20.91 24.89-48.86 57.072-75.02 31.305-55.91-55.074-176.67-19.114-268.809 4.688-55.5 14.337-163.031 86.781-194.606 36.78-9.175-14.528-55.523 2.036-65.483 1.312-17.577-1.279-14.124-27.319-70.019-35.415-58.102-8.416-116.217 56.073-189.851 21.229-54.739-25.903-119.177 1.522-158.732-30.166-30.217-24.206-37.535 24.144-51.418 40.332-17.949 20.932-35.654 25.208-53.054 8.537-97.035-92.967-227.541-48.482-227.541-48.482V23.892S85.608 84.02 216.913 52.825c52.021-12.359 177.089-64.293 323.175-25.412 179.38 47.742 570.712 39.273 789.542 10.944 257.19-33.293 386.47 14.794 408.22-14.465z"
        // transform="matrix(.9738 0 0 .99898 21.67 .024)"
      />
      {/* </clipPath> */}
      {/* </defs> */}
    </svg>
  );
}

function fiveDaysAfter(date: Date) {
  const fiveDays = 5 * 24 * 60 * 60 * 1000;
  const oneDay = 24 * 60 * 60 * 1000;
  return new Date(date.getTime() + fiveDays - oneDay);
}

function ChevronDownLink({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  return (
    <Button
      asChild
      variant="secondary"
      size="icon"
      className={cn("rounded-full border backdrop-blur-md", className)}
    >
      <Link href={href}>
        <ChevronDown className="h-6 w-6" />
      </Link>
    </Button>
  );
}
