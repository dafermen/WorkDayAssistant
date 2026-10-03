import type { DurationSeconds, TimeText } from '../../src/types';
import { convertSecondsToTime } from '../../src/utils';

const formattingCases = [
  { scenario: 'zero duration', value: 0, expected: '00:00:00' },
  { scenario: 'smallest one-second duration', value: 1, expected: '00:00:01' },
  { scenario: 'last second before one minute', value: 59, expected: '00:00:59' },
  { scenario: 'one complete minute', value: 60, expected: '00:01:00' },
  { scenario: 'last second before one hour', value: 3_599, expected: '00:59:59' },
  { scenario: 'one complete hour', value: 3_600, expected: '01:00:00' },
  { scenario: 'default maximum workday', value: 26_970, expected: '07:29:30' },
  { scenario: 'largest valid clock duration', value: 86_399, expected: '23:59:59' },
] satisfies ReadonlyArray<{
  scenario: string;
  value: DurationSeconds;
  expected: TimeText;
}>;

describe('convertSecondsToTime', () => {
  it.each(formattingCases)('formats $scenario ($value) as $expected', ({ value, expected }) => {
    expect(convertSecondsToTime(value)).toBe(expected);
  });
});
