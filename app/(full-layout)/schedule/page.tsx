import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { MapPin, Youtube } from "lucide-react";
import invariant from "tiny-invariant";

import { SCHEDULE, ScheduleEvent } from "~/app/_configs/hackathon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/app/components/ui/accordion";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/app/components/ui/avatar";
import { Badge } from "~/app/components/ui/badge";
import { Button } from "~/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";
import { Separator } from "~/app/components/ui/separator";
import { cn } from "~/app/utils";
import { IconParagraph } from "../page";

export const metadata: Metadata = {
  title: "Пълна програма",
  description: "Пълната програма на десетото юбилейно издание на Hack TUES",
  openGraph: {
    title: "Програма",
    description: "Пълната програма на десетото юбилейно издание на Hack TUES",
  },
};

export default function SchedulePage() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="mt-5 flex flex-col gap-5 text-center text-5xl font-extrabold">
        Програма
      </h1>

      <div className="pb-2" />

      <div className="flex w-full max-w-2xl flex-col items-center justify-center gap-10 overflow-y-clip sm:gap-8">
        {/* Gradients */}
        <div
          className="absolute left-1/2 top-52 -z-30 h-[30%] w-[300%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,#ce0e3e1c,transparent)]"
          aria-hidden
        />
        <div
          className="absolute left-5 top-[200px] -z-30 h-[1540px] w-[964px] bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,hsl(var(--brand)/5%),transparent)]"
          aria-hidden
        />
        <div
          className="absolute right-0 top-[380px] -z-30 h-[1500px] w-[640px] bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,hsl(var(--sand)/7%),transparent)]"
          aria-hidden
        />
        <div
          className="absolute left-0 top-[1300px] -z-30 h-[1040px] w-[564px] bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,hsl(var(--brand)/5%),transparent)]"
          aria-hidden
        />
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="workshops">
            <Card>
              <AccordionTrigger className="w-full">
                Workshop-и преди Hack TUES X
              </AccordionTrigger>
            </Card>
            <AccordionContent className="px-0">
              <ScheduleItemList
                events={SCHEDULE.filter((item) => item.type === "workshop")}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <ScheduleItemList
          events={SCHEDULE.filter((item) => item.type !== "workshop")}
        />
        <div className="w-full pt-2">
          <Separator />
        </div>
        {/* <div className="flex items-center justify-center gap-10 py-4">
          <div className="h-3 w-3 rounded-full bg-white/75"></div>
          <div className="h-4 w-4 rounded-full bg-white/80"></div>
          <div className="h-3 w-3 rounded-full bg-white/75"></div>
        </div> */}
        <p className="text-center font-lazydog text-lg">
          Нека направим един прекрасен и незабравим хакатон заедно.
          <br />
          Успех на всички!
        </p>
      </div>
    </div>
  );
}

const dayOfWeekFormatter = new Intl.DateTimeFormat("bg", {
  weekday: "long",
  timeZone: "Europe/Sofia",
});
const hourFormatter = new Intl.DateTimeFormat("bg", {
  hour: "numeric",
  minute: "numeric",
  timeZone: "Europe/Sofia",
});
const monthFormatter = new Intl.DateTimeFormat("bg", {
  month: "long",
  timeZone: "Europe/Sofia",
});
const dayOfMonthFormatter = new Intl.DateTimeFormat("bg", {
  day: "numeric",
  timeZone: "Europe/Sofia",
});

function CalendarDay({ event }: { event: ScheduleEvent }) {
  invariant(
    !event.endDate || event.startDate.getMonth() === event.endDate.getMonth(),
    "Events should not span multiple months",
  );
  const spansMultipleDays =
    event.endDate && event.endDate.getDay() != event.startDate.getDay();
  return (
    <Card asChild className="flex items-center justify-center">
      <time dateTime={event.startDate.toISOString()}>
        <CardHeader className="flex w-32 flex-shrink flex-col items-center justify-center sm:w-40">
          <h2
            className={cn(
              "text-5xl font-extrabold",
              spansMultipleDays && "text-5xl sm:text-4xl",
            )}
          >
            {spansMultipleDays ? (
              <>
                {dayOfMonthFormatter.format(event.startDate)}&nbsp;-&nbsp;
                {dayOfMonthFormatter.format(event.endDate)}
              </>
            ) : (
              dayOfMonthFormatter.format(event.startDate)
            )}
          </h2>
          <p className="font-light uppercase sm:text-lg">
            {monthFormatter.format(event.startDate)}
          </p>
        </CardHeader>
      </time>
    </Card>
  );
}

function TimeDisplay({
  event,
  ...props
}: React.ComponentProps<"time"> & { event: ScheduleEvent }) {
  return (
    <time
      {...props}
      dateTime={
        event.endDate
          ? `${event.startDate.toISOString()}/${event.endDate.toISOString()}`
          : event.startDate.toISOString()
      }
    >
      {!event.endDate || event.endDate.getDay() === event.startDate.getDay() ? (
        <>
          <Badge variant="secondary" className="text-sm">
            {dayOfWeekFormatter.format(event.startDate)}
          </Badge>
          <Badge variant="secondary" className="text-sm">
            {event.endDate
              ? hourFormatter.formatRange(event.startDate, event.endDate)
              : hourFormatter.format(event.startDate)}
          </Badge>
        </>
      ) : (
        <>
          <Badge variant="secondary" className="text-sm">
            от{" "}
            {dayOfWeekFormatter.format(event.startDate) +
              " " +
              hourFormatter.format(event.startDate)}
          </Badge>
          <Badge variant="secondary" className="text-sm">
            до{" "}
            {dayOfWeekFormatter.format(event.endDate) +
              " " +
              hourFormatter.format(event.endDate)}
          </Badge>
        </>
      )}
    </time>
  );
}

function ScheduleItemList({ events }: { events: readonly ScheduleEvent[] }) {
  return (
    <div className="flex flex-col items-center justify-center gap-10 sm:gap-8">
      {events.map((event) => (
        <div
          key={JSON.stringify(Object.values(event))}
          className="flex w-full flex-col gap-2 sm:flex-row sm:gap-3"
        >
          <CalendarDay event={event} />
          <Card asChild className="flex w-full flex-1 flex-grow flex-col">
            <article>
              <div className="flex-1">
                <CardHeader>
                  <div>
                    {event.type === "workshop" && (
                      <p className="text-xl font-light uppercase text-primary">
                        Workshop
                      </p>
                    )}
                    <CardTitle className="pb-1">{event.title}</CardTitle>
                  </div>
                  {event.description.split("\n").map((paragraph, i) => (
                    <CardDescription key={i}>{paragraph}</CardDescription>
                  ))}
                </CardHeader>
                <CardContent>
                  {event.type === "youtube" && (
                    <Button
                      asChild
                      variant="destructive"
                      className="items-center justify-center"
                      size="sm"
                    >
                      <Link
                        href="https://youtube.com/@TUES/live"
                        target="_blank"
                      >
                        <Youtube className="mr-2 h-5 w-5" /> Гледай на живо!
                      </Link>
                    </Button>
                  )}
                  {event.type === "in-person" && (
                    <IconParagraph icon={MapPin} className="text-sm">
                      София&nbsp;Тех&nbsp;Парк „Джон&nbsp;Атанасов“
                    </IconParagraph>
                  )}
                  {event.type === "workshop" && (
                    <ul className="flex flex-col gap-3">
                      {event.lectors.map((lector) => (
                        <li
                          className="flex items-center gap-2"
                          key={lector.name}
                        >
                          <Avatar>
                            <AvatarImage
                              src={lector.image.src}
                              alt={lector.name}
                            />
                            <AvatarFallback>{lector.name.at(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col justify-center">
                            <p className="font-semibold">{lector.name}</p>
                            <p className="text-xs font-light text-muted-foreground">
                              {lector.origin}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </div>
              <CardFooter
                className="flex flex-shrink-0 flex-grow-0 items-center justify-start gap-2"
                asChild
              >
                <TimeDisplay event={event} />
              </CardFooter>
            </article>
          </Card>
        </div>
      ))}
    </div>
  );
}
