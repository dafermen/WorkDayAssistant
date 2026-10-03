import { act, renderHook } from '@testing-library/react';
import { useCurrentTime } from '../../src/hooks';

describe('useCurrentTime', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-03T16:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('ticks and immediately reflects a time-zone change', () => {
    const { result, rerender } = renderHook(({ zone }) => useCurrentTime(zone), {
      initialProps: { zone: 'America/New_York' },
    });

    expect(result.current.time).toBe('12:00:00');
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.time).toBe('12:00:01');

    rerender({ zone: 'America/Los_Angeles' });
    expect(result.current.time).toBe('09:00:01');
  });

  it('resynchronizes on focus', () => {
    const { result } = renderHook(() => useCurrentTime('UTC'));

    act(() => {
      vi.setSystemTime(new Date('2026-10-03T16:00:15.000Z'));
      window.dispatchEvent(new Event('focus'));
    });

    expect(result.current.time).toBe('16:00:15');
  });
});
