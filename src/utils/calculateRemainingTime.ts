import type { DurationSeconds, RemainingTimeResult } from '../types';
import { MAX_WORKDAY_SECONDS } from './workdayConstants';

/**
 * Calculates the remaining duration and explicitly signals when the workday limit was exceeded.
 *
 * Remaining time is clamped to zero because a countdown cannot meaningfully display a negative
 * duration. The separate excess value lets the UI explain the warning without reimplementing the
 * business rule.
 */
export function calculateRemainingTime(
  worked: DurationSeconds,
  maximumWorkday: DurationSeconds = MAX_WORKDAY_SECONDS,
): RemainingTimeResult {
  if (worked > maximumWorkday) {
    return {
      status: 'over-limit',
      remainingSeconds: 0,
      exceededBySeconds: worked - maximumWorkday,
    };
  }

  return {
    status: 'within-limit',
    remainingSeconds: maximumWorkday - worked,
    exceededBySeconds: 0,
  };
}
