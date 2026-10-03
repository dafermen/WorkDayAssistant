import { completeTimeInput, formatTimeInput } from '../../src/utils';

describe('formatTimeInput', () => {
  it.each([
    ['', ''],
    ['1', '1'],
    ['14', '14'],
    ['143', '14:3'],
    ['1430', '14:30'],
    ['143005', '14:30:05'],
    ['14:30:05', '14:30:05'],
    ['14a30-0512', '14:30:05'],
  ])('formats %j as %j', (input, expected) => {
    expect(formatTimeInput(input)).toBe(expected);
  });

  it('adds zero seconds to a four-digit entry', () => {
    expect(completeTimeInput('1430')).toBe('14:30:00');
  });

  it('leaves incomplete and six-digit entries unchanged after formatting', () => {
    expect(completeTimeInput('1')).toBe('1');
    expect(completeTimeInput('143005')).toBe('14:30:05');
  });
});
