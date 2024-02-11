import { SCHEDULE } from "~/app/_configs/hackathon";
import { ComingSoonPage } from "~/app/components/coming-soon/coming-soon-page";
import { Card } from "~/app/components/ui/card";

export default function OurTeamPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      {SCHEDULE.map((event, index) => (
        <div className="flex gap-1" key={index}>
          <Card asChild>
            <time dateTime={event.startDate.toISOString()}>
              <h2>{dayOfMonthFormatter.format(event.startDate)}</h2>
              <p>{monthFormatter.format(event.startDate)}</p>
            </time>
          </Card>
          <Card asChild>
            <article>
              <h1>{event.title}</h1>
              <p>{event.description}</p>
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
const monthFormatter = new Intl.DateTimeFormat("bg", {
  month: "long",
});
const dayOfMonthFormatter = new Intl.DateTimeFormat("bg", {
  day: "numeric",
});
