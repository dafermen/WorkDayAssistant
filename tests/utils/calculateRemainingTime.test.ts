import type { DurationSeconds, RemainingTimeResult } from '../../src/types';
import { calculateRemainingTime, MAX_WORKDAY_SECONDS } from '../../src/utils';

const calculationCases = [
  {
    scenario: 'no worked time',
    worked: 0,
    expected: { status: 'within-limit', remainingSeconds: 26_970, exceededBySeconds: 0 },
  },
  {
    scenario: 'a partial workday',
    worked: 12_570,
    expected: { status: 'within-limit', remainingSeconds: 14_400, exceededBySeconds: 0 },
  },
  {
    scenario: 'one second before the limit',
    worked: 26_969,
    expected: { status: 'within-limit', remainingSeconds: 1, exceededBySeconds: 0 },
  },
  {
    scenario: 'the exact workday limit',
    worked: 26_970,
    expected: { status: 'within-limit', remainingSeconds: 0, exceededBySeconds: 0 },
  },
  {
    scenario: 'one second over the limit',
    worked: 26_971,
    expected: { status: 'over-limit', remainingSeconds: 0, exceededBySeconds: 1 },
  },
  {
    scenario: 'eight worked hours',
    worked: 28_800,
    expected: { status: 'over-limit', remainingSeconds: 0, exceededBySeconds: 1_830 },
  },
] satisfies ReadonlyArray<{
  scenario: string;
  worked: DurationSeconds;
  expected: RemainingTimeResult;
}>;

describe('calculateRemainingTime', () => {
  it('exports the approved maximum workday as one shared constant', () => {
    expect(MAX_WORKDAY_SECONDS).toBe(26_970);
  });

  it.each(calculationCases)('calculates $scenario', ({ worked, expected }) => {
    expect(calculateRemainingTime(worked)).toEqual(expected);
  });

  it('uses an editable maximum when one is provided', () => {
    expect(calculateRemainingTime(3_600, 7_200)).toEqual({
      status: 'within-limit',
      remainingSeconds: 3_600,
      exceededBySeconds: 0,
    });
  });
});
