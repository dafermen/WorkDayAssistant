import type { DurationSeconds, TimeText } from '../types';

export const MAX_WORKDAY_TIME: TimeText = '07:29:45';

/** One shared scalar prevents separate calculations from drifting away from the approved limit. */
export const MAX_WORKDAY_SECONDS: DurationSeconds = 26_985;
