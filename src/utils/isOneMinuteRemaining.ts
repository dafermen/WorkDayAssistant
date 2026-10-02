import type { DurationSeconds } from '../types';

/**
 * Identifies the final-minute warning window before closing time.
 *
 * Zero is excluded because it belongs to the closing state. Keeping the window inclusive from
 * sixty through one second prevents timer intervals from missing a warning between ticks.
 */
export function isOneMinuteRemaining(remaining: DurationSeconds): boolean {
  return remaining > 0 && remaining <= 60;
}
