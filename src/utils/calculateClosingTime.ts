import type { ClosingTimeResult, DurationSeconds, TimeText } from '../types';
import { convertSecondsToTime } from './convertSecondsToTime';
import { convertTimeToSeconds } from './convertTimeToSeconds';

const SECONDS_PER_DAY = 24 * 60 * 60;

/**
 * Adds a remaining duration to a clock time and preserves any midnight rollover separately.
 *
 * The clock value wraps to a valid 24-hour time while dayOffset communicates “next day” without
 * inventing a calendar date that the application never received.
 */
export function calculateClosingTime(
  start: TimeText,
  remaining: DurationSeconds,
): ClosingTimeResult {
  const totalSeconds = convertTimeToSeconds(start) + remaining;
  const dayOffset = Math.floor(totalSeconds / SECONDS_PER_DAY);
  const clockSeconds = totalSeconds % SECONDS_PER_DAY;

  return {
    time: convertSecondsToTime(clockSeconds),
    dayOffset,
  };
}
