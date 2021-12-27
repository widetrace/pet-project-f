import { subDays, add, format } from 'date-fns';

const FORMATS = {
  apiCall: 'yyyy-MM-dd',
  visual: {
    date: 'dd-MM-yyyy',
    time: 'HH:mm',
  },
};

export function twoWeeksAgo(date) {
  const dateObj = subDays(date, 7);
  return format(dateObj, FORMATS.apiCall);
}

export function twoWeeksAhead(date) {
  const dateObj = add(date, { weeks: 1 });
  return format(dateObj, FORMATS.apiCall);
}

export function formatDate(date) {
  return format(new Date(date), FORMATS.visual.date);
}

export function formatTime(date) {
  return format(new Date(date), FORMATS.visual.time);
}
