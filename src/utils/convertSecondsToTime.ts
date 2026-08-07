import type { DurationSeconds, TimeText } from '../types';

const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * MINUTES_PER_HOUR;

function formatSegment(value: number): string {
  return String(value).padStart(2, '0');
}

/**
 * Formats a non-negative whole-second duration as HH:mm:ss.
 *
 * Centralizing the division, remainder, and padding rules ensures every UI feature presents the
 * same duration and prevents components from implementing slightly different time formats.
 */
export function convertSecondsToTime(value: DurationSeconds): TimeText {
  const hours = Math.floor(value / SECONDS_PER_HOUR);
  const minutes = Math.floor((value % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE);
  const seconds = value % SECONDS_PER_MINUTE;

  return `${formatSegment(hours)}:${formatSegment(minutes)}:${formatSegment(seconds)}` as TimeText;
}
