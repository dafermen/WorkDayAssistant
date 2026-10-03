import { calculateCountdownTarget } from '../../src/utils';

describe('calculateCountdownTarget', () => {
  it('creates an absolute target in the selected time zone', () => {
    const target = calculateCountdownTarget({
      now: new Date('2026-10-03T16:00:00.500Z'),
      closingTime: '12:30:00',
      dayOffset: 0,
      timeZone: 'America/New_York',
    });

    expect(target).toBe(new Date('2026-10-03T16:30:00.000Z').getTime());
  });

  it('uses the next local calendar day when the calculation crosses midnight', () => {
    const target = calculateCountdownTarget({
      now: new Date('2026-10-03T23:00:00.000Z'),
      closingTime: '01:15:00',
      dayOffset: 1,
      timeZone: 'America/New_York',
    });

    expect(target).toBe(new Date('2026-10-04T05:15:00.000Z').getTime());
  });

  it('accounts for daylight-saving changes in an IANA time zone', () => {
    const target = calculateCountdownTarget({
      now: new Date('2026-03-08T06:30:00.000Z'),
      closingTime: '03:30:00',
      dayOffset: 0,
      timeZone: 'America/New_York',
    });

    expect(target).toBe(new Date('2026-03-08T07:30:00.000Z').getTime());
  });

  it('rejects a target that has already passed', () => {
    expect(
      calculateCountdownTarget({
        now: new Date('2026-10-03T16:30:00.000Z'),
        closingTime: '12:00:00',
        dayOffset: 0,
        timeZone: 'America/New_York',
      }),
    ).toBeNull();
  });
});
