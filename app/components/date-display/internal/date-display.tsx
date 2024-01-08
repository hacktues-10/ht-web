import { dateFormatter, timeFormatter } from "./formatters";

const DateDisplayInternal = ({
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

export default DateDisplayInternal;
