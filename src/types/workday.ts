import type { DurationSeconds, RawTimeInput, TimeText } from './time';

export type WorkdayField = 'workedTime' | 'lastTaskStartTime';

export type AlertKind = 'one-minute-remaining' | 'closing-time';

export interface WithinWorkdayLimit {
  readonly status: 'within-limit';
  readonly remainingSeconds: DurationSeconds;
  readonly exceededBySeconds: 0;
}

export interface WorkdayLimitExceeded {
  readonly status: 'over-limit';
  readonly remainingSeconds: 0;
  readonly exceededBySeconds: DurationSeconds;
}

/** Makes limit warnings explicit instead of encoding them as negative remaining time. */
export type RemainingTimeResult = WithinWorkdayLimit | WorkdayLimitExceeded;

/** Values as entered by the user before validation. */
export interface WorkdayInput {
  readonly workedTime: RawTimeInput;
  readonly lastTaskStartTime: RawTimeInput;
}

/** Validated and calculated values ready for presentation. */
export interface WorkdayCalculation {
  readonly workedTime: TimeText;
  readonly lastTaskStartTime: TimeText;
  readonly remainingTime: TimeText;
  readonly remainingSeconds: DurationSeconds;
  readonly recommendedClosingTime: TimeText;
}

export type TimeValidationCode = 'required' | 'format' | 'range';

export interface TimeValidationIssue {
  readonly field: WorkdayField;
  readonly code: TimeValidationCode;
  readonly message: string;
}

/** Versioned shape written by the persistence service. */
export interface PersistedWorkdayData extends WorkdayInput {
  readonly version: 1;
  readonly savedAt: string;
}
