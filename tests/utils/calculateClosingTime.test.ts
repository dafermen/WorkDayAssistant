import type { ClosingTimeResult, DurationSeconds, TimeText } from '../../src/types';
import { calculateClosingTime } from '../../src/utils';

const closingTimeCases = [
  {
    scenario: 'no remaining duration',
    start: '08:00:00',
    remaining: 0,
    expected: { time: '08:00:00', dayOffset: 0 },
  },
  {
    scenario: 'hours, minutes, and seconds on the same day',
    start: '08:00:00',
    remaining: 3_661,
    expected: { time: '09:01:01', dayOffset: 0 },
  },
  {
    scenario: 'carry from seconds into minutes',
    start: '12:34:50',
    remaining: 15,
    expected: { time: '12:35:05', dayOffset: 0 },
  },
  {
    scenario: 'maximum workday duration from midnight',
    start: '00:00:00',
    remaining: 26_985,
    expected: { time: '07:29:45', dayOffset: 0 },
  },
  {
    scenario: 'one second across midnight',
    start: '23:59:59',
    remaining: 1,
    expected: { time: '00:00:00', dayOffset: 1 },
  },
  {
    scenario: 'two hours across midnight',
    start: '23:00:00',
    remaining: 7_200,
    expected: { time: '01:00:00', dayOffset: 1 },
  },
  {
    scenario: 'maximum remaining duration across midnight',
    start: '23:59:00',
    remaining: 26_985,
    expected: { time: '07:28:45', dayOffset: 1 },
  },
] satisfies ReadonlyArray<{
  scenario: string;
  start: TimeText;
  remaining: DurationSeconds;
  expected: ClosingTimeResult;
}>;

describe('calculateClosingTime', () => {
  it.each(closingTimeCases)('calculates $scenario', ({ start, remaining, expected }) => {
    expect(calculateClosingTime(start, remaining)).toEqual(expected);
  });
});
