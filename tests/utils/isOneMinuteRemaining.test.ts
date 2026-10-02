import type { DurationSeconds } from '../../src/types';
import { isOneMinuteRemaining } from '../../src/utils';

const alertCases = [
  { scenario: 'more than one minute remains', remaining: 61, expected: false },
  { scenario: 'exactly one minute remains', remaining: 60, expected: true },
  { scenario: 'inside the final minute', remaining: 59, expected: true },
  { scenario: 'one second remains', remaining: 1, expected: true },
  { scenario: 'closing time has arrived', remaining: 0, expected: false },
  { scenario: 'the timer is late', remaining: -1, expected: false },
] satisfies ReadonlyArray<{
  scenario: string;
  remaining: DurationSeconds;
  expected: boolean;
}>;

describe('isOneMinuteRemaining', () => {
  it.each(alertCases)('returns $expected when $scenario', ({ remaining, expected }) => {
    expect(isOneMinuteRemaining(remaining)).toBe(expected);
  });
});
