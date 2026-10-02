import type { DurationSeconds } from '../types';

/**
 * Identifies when closing time has arrived or the countdown has passed it.
 *
 * Timers can resume late after an app is suspended, so negative values must remain in the closing
 * state instead of incorrectly returning to a non-alert state.
 */
export function isClosingTime(remaining: DurationSeconds): boolean {
  return remaining <= 0;
}
