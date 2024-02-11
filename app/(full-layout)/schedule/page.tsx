import React from "react";
import Link from "next/link";
import { MapPin, Youtube } from "lucide-react";
import invariant from "tiny-invariant";

import { SCHEDULE, ScheduleEvent } from "~/app/_configs/hackathon";
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
import { IconParagraph } from "../page";

export default function SchedulePage() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-htags mt-5 flex flex-col gap-5 text-center text-5xl font-extrabold">
        Програма
      </h1>

      <div className="flex max-w-xl flex-col items-center justify-center gap-3">
        {SCHEDULE.map((event, index) => (
          <div className="flex w-full gap-3" key={index}>
            <CalendarDay event={event} />
            <Card
              asChild
              className="flex w-full flex-1 flex-grow flex-col sm:flex-row"
            >
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
                    <CardDescription>{event.description}</CardDescription>
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
                  </CardContent>
                </div>
                <CardFooter
                  className="flex flex-shrink-0 flex-grow-0 items-center justify-start gap-2 sm:h-full sm:w-32 sm:flex-col sm:justify-center"
                  asChild
                >
                  <TimeDisplay event={event} />
                </CardFooter>
              </article>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

const dayOfWeekFormatter = new Intl.DateTimeFormat("bg", {
  weekday: "long",
});
const hourFormatter = new Intl.DateTimeFormat("bg", {
  hour: "numeric",
  minute: "numeric",
});
const monthFormatter = new Intl.DateTimeFormat("bg", {
  month: "long",
});
const dayOfMonthFormatter = new Intl.DateTimeFormat("bg", {
  day: "numeric",
});

function CalendarDay({ event }: { event: ScheduleEvent }) {
  invariant(
    !event.endDate || event.startDate.getMonth() === event.endDate.getMonth(),
    "Events should not span multiple months",
  );
  return (
    <Card asChild className="flex items-center justify-center">
      <time dateTime={event.startDate.toISOString()}>
        <CardHeader className="flex w-24 flex-shrink flex-col items-center justify-center sm:w-40">
          <h2 className="text-4xl font-extrabold">
            {event.endDate &&
            event.endDate.getDay() != event.startDate.getDay() ? (
              <>
                {dayOfMonthFormatter.format(event.startDate)}&nbsp;-&nbsp;
                {dayOfMonthFormatter.format(event.endDate)}
              </>
            ) : (
              dayOfMonthFormatter.format(event.startDate)
            )}
          </h2>
          <p className="font-semibold">
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
          <Badge variant="outline" className="text-sm">
            {dayOfWeekFormatter.format(event.startDate)}
          </Badge>
          <Badge variant="outline" className="text-sm">
            {event.endDate
              ? hourFormatter.formatRange(event.startDate, event.endDate)
              : hourFormatter.format(event.startDate)}
          </Badge>
        </>
      ) : (
        <>
          <Badge variant="outline" className="text-sm">
            от{" "}
            {dayOfWeekFormatter.format(event.startDate) +
              " " +
              hourFormatter.format(event.startDate)}
          </Badge>
          <Badge variant="outline" className="text-sm">
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
