import type { TimeText } from '../types';
import { convertTimeToSeconds } from './convertTimeToSeconds';
import { getZonedDateTime, type ZonedDateTime } from './getZonedDateTime';

export interface CountdownTargetInput {
  readonly now: Date;
  readonly closingTime: TimeText;
  readonly dayOffset: number;
  readonly timeZone: string;
}

function asComparableUtc(parts: ZonedDateTime) {
  return Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hours,
    parts.minutes,
    parts.seconds,
  );
}

function resolveZonedTimestamp(parts: ZonedDateTime, timeZone: string) {
  const desiredTimestamp = asComparableUtc(parts);
  let candidate = desiredTimestamp;

  for (let attempt = 0; attempt < 4; attempt += 1) {
    const actualTimestamp = asComparableUtc(getZonedDateTime(new Date(candidate), timeZone));
    const difference = desiredTimestamp - actualTimestamp;

    candidate += difference;

    if (difference === 0) {
      break;
    }
  }

  return candidate;
}

/** Converts a wall-clock closing time in an IANA zone into an absolute timestamp. */
export function calculateCountdownTarget({
  now,
  closingTime,
  dayOffset,
  timeZone,
}: CountdownTargetInput): number | null {
  const current = getZonedDateTime(now, timeZone);
  const targetDate = new Date(Date.UTC(current.year, current.month - 1, current.day + dayOffset));
  const closingSeconds = convertTimeToSeconds(closingTime);
  const target = resolveZonedTimestamp(
    {
      year: targetDate.getUTCFullYear(),
      month: targetDate.getUTCMonth() + 1,
      day: targetDate.getUTCDate(),
      hours: Math.floor(closingSeconds / 3600),
      minutes: Math.floor((closingSeconds % 3600) / 60),
      seconds: closingSeconds % 60,
    },
    timeZone,
  );

  return target > now.getTime() ? target : null;
}
