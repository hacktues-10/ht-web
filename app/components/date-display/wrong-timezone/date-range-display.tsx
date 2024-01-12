import { dateFormatter } from "./formatters";

const DateRangeDisplayWrongTimezone = ({
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

export default DateRangeDisplayWrongTimezone;
