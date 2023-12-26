const dateFormatter = new Intl.DateTimeFormat("bg", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("bg", {
  hour: "numeric",
  minute: "numeric",
});

export const DateDisplay = ({
  date,
  showHour = false,
}: {
  date: Date;
  showHour?: boolean;
}) => (
  <time dateTime={date.toISOString()}>
    {dateFormatter.format(date)}
    {showHour ? " в " + timeFormatter.format(date) : ""}
  </time>
);
