import { parseISO, format } from "date-fns";

export const _day = (time: string) => {
  //   let timeAgo = "";
  const date = parseISO(time);

  //   const timePeriod = formatDistanceToNow(date);
  //   timeAgo = ` ${timePeriod} ago`;

  return format(date, "MM/dd/yyyy");
};
