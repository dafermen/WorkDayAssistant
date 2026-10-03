import { formatZonedClock } from '../../src/utils';

describe('formatZonedClock', () => {
  it('formats the current time and zone in New York', () => {
    const clock = formatZonedClock(new Date('2026-10-03T16:04:05.000Z'), 'America/New_York');

    expect(clock.time).toBe('12:04:05');
    expect(clock.dateLabel).toContain('2026');
    expect(clock.zoneLabel).toBeTruthy();
  });

  it('changes the displayed clock when the time zone changes', () => {
    const clock = formatZonedClock(new Date('2026-10-03T16:04:05.000Z'), 'America/Los_Angeles');

    expect(clock.time).toBe('09:04:05');
  });

  it('reports an invalid IANA time zone', () => {
    expect(() => formatZonedClock(new Date(), 'Invalid/Zone')).toThrow();
  });
});
