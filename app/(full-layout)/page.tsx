import { PropsWithChildren } from "react";
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
  EVENT_END,
  EVENT_START,
  MAX_TEAMS_STUDENTS,
} from "~/app/_configs/hackathon";
import ht8Image from "~/app/assets/img/ht8_stream_3.jpg";
import {
  CURRENT_HACKATHON_ID,
  Hackathon,
  HACKATHONS,
} from "../_configs/archive";
import { IfHTFeatureOn } from "../_integrations/components";
import { IfNotHTSession } from "../api/auth/server-components";
import { LandingCountdownTimer } from "../components/countdowns";
import DateRangeDisplayWrongTimezone from "../components/date-display/wrong-timezone/date-range-display";
import { HTCurrentEventLogo, HTLogo } from "../components/logos";
import { PageBackdrop } from "../components/page-backdrop";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { cn } from "../utils";
import { LandingCTA, LandingSubtitle } from "./components";

export default async function LandingPage() {
  return (
    <div className="flex min-h-fit w-full flex-col">
      <CountdownHero />
      <UnescoSection />
      <ArchiveContainer>
        <TheBeginningSection />
        {HACKATHONS.map((hackathon, i, hackathons) => (
          <PastHTArchiveSection
            key={hackathon.id}
            hackathon={hackathon}
            nextHackathon={hackathons.at(i + 1)}
          />
        ))}
        <CurrentHTArchiveSection />
      </ArchiveContainer>
      <IfNotHTSession>
        <IfHTFeatureOn feature="register-students">
          <LastChanceCTA />
        </IfHTFeatureOn>
      </IfNotHTSession>
    </div>
  );
}

function TheBeginningSection() {
  return (
    <section className="grid place-items-center gap-9 pb-12 pt-28">
      <p className="scroll-m-20 text-center font-lazydog text-2xl tracking-tight first:mt-0 sm:text-3xl">
        В началото всичко бе пусто. <br />И тогава се появи...
      </p>
      <ChevronDownLink
        href="#the-beginning"
        className="motion-safe:animate-bounce motion-safe:scroll-smooth"
      />
    </section>
  );
}

function CountdownHero() {
  return (
    <div className="mx-auto flex min-h-fit w-full max-w-sm flex-col items-center justify-between gap-10 md:max-w-5xl md:flex-row">
      <section className="flex h-full w-full flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center">
          <h1 className="relative inline-block text-center font-llpixel text-5xl md:text-7xl">
            Hack TUES X
          </h1>
          <LandingSubtitle />
        </div>

        <div className="flex flex-col gap-1 py-3 text-sm font-semibold">
          <IconParagraph icon={Calendar}>
            <DateRangeDisplayWrongTimezone
              startDate={EVENT_START}
              endDate={EVENT_END}
            />
          </IconParagraph>
          <IconParagraph icon={MapPin}>София Тех Парк</IconParagraph>
          <IconParagraph icon={Award}>10-ТО ЮБИЛЕЙНО ИЗДАНИЕ!!!</IconParagraph>
        </div>

        <LandingCountdownTimer to={EVENT_START} />
        <LandingCTA />
      </section>
    </div>
  );
}

function ArchiveContainer({ children }: PropsWithChildren) {
  return (
    <div id="the-beginning" className="mx-auto flex w-full max-w-5xl flex-col">
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

export function IconParagraph({
  children,
  icon: Icon,
  className,
}: PropsWithChildren<{ className?: string; icon: LucideIcon }>) {
  return (
    <p className={cn("flex items-center gap-2", className)}>
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
        <DateRangeDisplayWrongTimezone
          startDate={startDate}
          endDate={endDate}
        />
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

function PastHTArchiveSection({
  hackathon,
  nextHackathon,
}: {
  hackathon: Hackathon;
  nextHackathon?: Hackathon;
}) {
  return (
    <ArchiveSection {...hackathon}>
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
          {/* NOTE: welp.. that never happened :( */}
          {/* <Link href={`/archive/${hackathon.id}`}> */}
          <Link href={hackathon.aztuesArticleUrl} target="_blank">
            Още за {hackathon.name} <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </ArchiveActionButtons>
      <div className="grid w-full place-items-center">
        {nextHackathon ? (
          <ChevronDownLink href={`#${nextHackathon.id}`} />
        ) : (
          <ChevronDownLink href={`#${CURRENT_HACKATHON_ID}`} />
        )}
      </div>
    </ArchiveSection>
  );
}

function CurrentHTArchiveSection() {
  return (
    <ArchiveSection
      id={CURRENT_HACKATHON_ID as any}
      className="gap-10 sm:gap-9"
    >
      <div className="flex flex-col gap-1">
        <h2 className="scroll-m-20 pb-2 text-5xl font-extrabold tracking-tight text-destructive first:mt-0 sm:text-6xl">
          <HTCurrentEventLogo />
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
          Десетото юбилейно издание на Hack TUES дава възможност за участие на{" "}
          <span className="font-bold text-primary">завършили туесари</span> от
          всички випуски на ТУЕС в отбори от двама или трима!
        </p>
      </Card>
      <ArchiveStatsCard className="md:grid-cols-2">
        <p className="col-span-2 pb-3 text-center text-2xl font-semibold md:text-3xl">
          Местата са запълнени!
        </p>
        <ArchiveStatsItem
          value={MAX_TEAMS_STUDENTS}
          label="отбора на ученици"
        />
        <ArchiveStatsItem value={12} label="отбора на завършили" />
        {/* <p className="col-span-2 text-center text-lg font-light">
              Регистрацията на ученици ще бъде отворена от{" "}
              <DateDisplay date={STUDENTS_REGISTRATION_START} showHour /> до{" "}
              <DateDisplay
                date={fiveDaysAfter(STUDENTS_REGISTRATION_START)}
                showHour
              />{" "}
              или{" "}
              <strong className="font-extrabold">
                до изчерпване на местата
              </strong>
              !
            </p> */}
      </ArchiveStatsCard>
    </ArchiveSection>
  );
}

function UnescoSection() {
  const UNESCO_URL =
    "https://unevoc.unesco.org/home/Promising+Practices+in+TVET/lang=en/id=6662";
  return (
    <section
      id="unesco"
      className="light relative grid place-items-center gap-14 overflow-x-visible bg-background pb-48 pt-28 text-foreground"
    >
      <div className="flex max-w-5xl flex-col items-center justify-center gap-8 sm:flex-row-reverse">
        <div className="flex w-full flex-col gap-1">
          <h2 className="scroll-m-20 pb-2 text-center text-4xl font-extrabold tracking-tight first:mt-0">
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
          <Button asChild>
            <Link href={UNESCO_URL} target="_blank">
              <LinkIcon className="mr-2 h-4 w-4" /> Прочетете повече
            </Link>
          </Button>
        </div>
        <div className="flex-3 flex w-full items-center justify-center">
          <Link
            href={UNESCO_URL}
            target="_blank"
            // FIXME: the focus ring classes are repeated in many places
            className="rounded-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            tabIndex={-1}
          >
            <Image
              src={ht8Image}
              alt="Екипът на Hack TUES 8 гледа в екрана на лаптоп"
              className="h-auto w-full rounded-lg object-cover object-center shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
              priority
            />
          </Link>
        </div>
      </div>
    </section>
  );
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
      aria-label="Към следващата секция"
    >
      <Link href={href}>
        <ChevronDown className="h-6 w-6" />
      </Link>
    </Button>
  );
}

function LastChanceCTA() {
  return (
    <section className="relative flex flex-col items-center gap-3 pb-16 pt-5">
      <h2 className="scroll-m-20 pt-7 text-center text-5xl font-extrabold tracking-tight first:mt-0">
        Какво чакате?
      </h2>
      <div className="py-2" />

      <Button size="lg" asChild>
        <Link href="/signup">Регистрирайте се сега!</Link>
      </Button>
    </section>
  );
}
