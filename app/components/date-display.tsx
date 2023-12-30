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

export const DateRangeDisplay = ({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) => (
  <time dateTime={startDate.toISOString() + "/" + endDate.toISOString()}>
    {dateFormatter.formatRange(startDate, endDate)}
  </time>
);
