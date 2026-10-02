import type { RawTimeInput, TimeText } from '../types';

const VALID_TIME_PATTERN = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;

/**
 * Removes surrounding whitespace and returns a valid 24-hour HH:mm:ss value.
 *
 * Returning the normalized value, instead of only a boolean, ensures callers use the exact text
 * that passed validation. Internal whitespace remains invalid because silently repairing the time
 * itself could hide a typing error.
 */
export function validateTime(value: RawTimeInput): TimeText | null {
  const normalizedValue = value.trim();

  return VALID_TIME_PATTERN.test(normalizedValue) ? (normalizedValue as TimeText) : null;
}
