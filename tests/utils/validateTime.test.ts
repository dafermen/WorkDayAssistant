import type { RawTimeInput, TimeText } from '../../src/types';
import { validateTime } from '../../src/utils';

const validCases = [
  { scenario: 'midnight', value: '00:00:00', expected: '00:00:00' },
  { scenario: 'default maximum workday', value: '07:29:30', expected: '07:29:30' },
  { scenario: 'end of day', value: '23:59:59', expected: '23:59:59' },
  { scenario: 'surrounding spaces', value: ' 07:29:30 ', expected: '07:29:30' },
  { scenario: 'surrounding tabs', value: '\t07:29:30\t', expected: '07:29:30' },
  { scenario: 'surrounding line breaks', value: '\n07:29:30\r\n', expected: '07:29:30' },
] satisfies ReadonlyArray<{
  scenario: string;
  value: RawTimeInput;
  expected: TimeText;
}>;

const invalidCases = [
  { scenario: 'empty input', value: '' },
  { scenario: 'whitespace-only input', value: '   ' },
  { scenario: 'missing leading hour zero', value: '7:29:45' },
  { scenario: 'missing seconds', value: '07:29' },
  { scenario: 'wrong separators', value: '07-29-45' },
  { scenario: 'non-numeric segment', value: 'AA:29:45' },
  { scenario: 'internal whitespace', value: '07: 29:45' },
  { scenario: 'hour above 23', value: '24:00:00' },
  { scenario: 'minute above 59', value: '07:60:00' },
  { scenario: 'second above 59', value: '07:29:60' },
  { scenario: 'negative segment', value: '-1:29:45' },
  { scenario: 'extra trailing content', value: '07:29:30 UTC' },
] satisfies ReadonlyArray<{ scenario: string; value: RawTimeInput }>;

describe('validateTime', () => {
  it.each(validCases)('returns normalized time for $scenario', ({ value, expected }) => {
    expect(validateTime(value)).toBe(expected);
  });

  it.each(invalidCases)('returns null for $scenario', ({ value }) => {
    expect(validateTime(value)).toBeNull();
  });
});
