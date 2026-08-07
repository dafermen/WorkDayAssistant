import type { DurationSeconds, TimeText } from '../types';

/**
 * Converts a validated time value into one scalar duration.
 *
 * A single unit makes later addition and subtraction predictable and avoids repeating carry logic
 * for seconds, minutes, and hours in every business calculation.
 */
export function convertTimeToSeconds(value: TimeText): DurationSeconds {
  const hours = Number(value.slice(0, 2));
  const minutes = Number(value.slice(3, 5));
  const seconds = Number(value.slice(6, 8));

  return hours * 60 * 60 + minutes * 60 + seconds;
}
