import { SCHEDULE } from "~/app/_configs/hackathon";
import { Badge } from "~/app/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";

export default function OurTeamPage() {
  return (
    <div className="flex max-w-xl flex-col  items-center justify-center gap-3">
      {SCHEDULE.map((event, index) => (
        <div className="flex w-full gap-3" key={index}>
          <Card asChild className="flex items-center justify-center">
            <time dateTime={event.startDate.toISOString()}>
              <CardHeader className="flex aspect-square flex-col items-center justify-center">
                <h2 className="text-4xl font-extrabold">
                  {dayOfMonthFormatter.format(event.startDate)}
                </h2>
                <p className="font-semibold">
                  {monthFormatter.format(event.startDate)}
                </p>
              </CardHeader>
            </time>
          </Card>
          <Card asChild className="flex w-full flex-1 flex-grow">
            <article>
              <div className="flex-1">
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
              </div>
              <CardFooter
                className="flex h-full w-32 flex-shrink-0 flex-grow-0 flex-col items-center justify-center gap-2"
                asChild
              >
                <time dateTime={event.startDate.toISOString()}>
                  <Badge variant="outline" className="text-sm">
                    {dayOfWeekFormatter.format(event.startDate)}
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    {hourFormatter.format(event.startDate)}
                  </Badge>
                </time>
              </CardFooter>
            </article>
          </Card>
        </div>
      ))}
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
