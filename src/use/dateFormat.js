import { subDays, add, format } from 'date-fns';

const FORMATS = {
  apiCall: 'yyyy-MM-dd',
  visualShow: 'dd-MM-yyyy',
};

export function twoWeeksAgo(date) {
  const dateObj = subDays(date, 7);
  return format(dateObj, FORMATS.apiCall);
}

export function twoWeeksAhead(date) {
  const dateObj = add(date, { weeks: 1 });
  return format(dateObj, FORMATS.apiCall);
}
