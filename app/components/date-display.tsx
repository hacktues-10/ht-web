export const dateFormatter = new Intl.DateTimeFormat("bg", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export const DateDisplay = ({ date }: { date: Date }) => (
  <time dateTime={date.toISOString()}>{dateFormatter.format(date)}</time>
);
