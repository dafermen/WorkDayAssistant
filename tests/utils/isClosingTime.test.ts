import type { DurationSeconds } from '../../src/types';
import { isClosingTime } from '../../src/utils';

const closingCases = [
  { scenario: 'one minute remains', remaining: 60, expected: false },
  { scenario: 'one second remains', remaining: 1, expected: false },
  { scenario: 'closing time has arrived', remaining: 0, expected: true },
  { scenario: 'the countdown is late', remaining: -1, expected: true },
] satisfies ReadonlyArray<{
  scenario: string;
  remaining: DurationSeconds;
  expected: boolean;
}>;

describe('isClosingTime', () => {
  it.each(closingCases)('returns $expected when $scenario', ({ remaining, expected }) => {
    expect(isClosingTime(remaining)).toBe(expected);
  });
});
