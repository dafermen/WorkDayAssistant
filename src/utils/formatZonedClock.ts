import type { TimeText } from '../types';
import { getZonedDateTime } from './getZonedDateTime';

export interface ZonedClock {
  readonly time: TimeText;
  readonly dateLabel: string;
  readonly zoneLabel: string;
}

function pad(value: number) {
  return String(value).padStart(2, '0');
}

export function formatZonedClock(date: Date, timeZone: string): ZonedClock {
  const parts = getZonedDateTime(date, timeZone);
  const zoneParts = new Intl.DateTimeFormat('es-US', {
    timeZone,
    timeZoneName: 'long',
  }).formatToParts(date);

  return {
    time: `${pad(parts.hours)}:${pad(parts.minutes)}:${pad(parts.seconds)}` as TimeText,
    dateLabel: new Intl.DateTimeFormat('es-US', {
      timeZone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date),
    zoneLabel: zoneParts.find((part) => part.type === 'timeZoneName')?.value ?? timeZone,
  };
}
