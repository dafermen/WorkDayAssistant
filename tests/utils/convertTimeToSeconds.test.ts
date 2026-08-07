import { convertTimeToSeconds } from '../../src/utils';
import type { DurationSeconds, TimeText } from '../../src/types';

const conversionCases = [
  { scenario: 'zero duration', value: '00:00:00', expected: 0 },
  { scenario: 'smallest one-second duration', value: '00:00:01', expected: 1 },
  { scenario: 'one complete minute', value: '00:01:00', expected: 60 },
  { scenario: 'one complete hour', value: '01:00:00', expected: 3_600 },
  { scenario: 'maximum workday', value: '07:29:45', expected: 26_985 },
  { scenario: 'largest valid clock value', value: '23:59:59', expected: 86_399 },
] satisfies ReadonlyArray<{
  scenario: string;
  value: TimeText;
  expected: DurationSeconds;
}>;

describe('convertTimeToSeconds', () => {
  it.each(conversionCases)(
    'converts $scenario ($value) to $expected seconds',
    ({ value, expected }) => {
      expect(convertTimeToSeconds(value)).toBe(expected);
    },
  );
});
