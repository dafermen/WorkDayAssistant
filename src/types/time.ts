/** Text that has the structural shape HH:mm:ss after runtime validation. */
export type TimeText = `${number}${number}:${number}${number}:${number}${number}`;

/** Untrusted text received from an input, storage, or another external boundary. */
export type RawTimeInput = string;

/** Numeric duration used internally by pure calculation functions. */
export type DurationSeconds = number;

/** Decomposed time value used when parsing or formatting HH:mm:ss values. */
export interface TimeParts {
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
}
