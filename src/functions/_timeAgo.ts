import { parseISO, formatDistanceToNow } from "date-fns";

export const _timeAgo = (time: any) => {
  let timeAgo = "";
  const date = parseISO(time);
  const timePeriod = formatDistanceToNow(date);
  timeAgo = ` ${timePeriod} ago`;

  return timeAgo;
};
