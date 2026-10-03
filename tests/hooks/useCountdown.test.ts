import { act, renderHook } from '@testing-library/react';
import { useCountdown } from '../../src/hooks';

describe('useCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-03T16:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('counts from an absolute target and reaches the complete state', () => {
    const { result } = renderHook(() => useCountdown());

    act(() => result.current.start(Date.now() + 2000));
    expect(result.current.remainingSeconds).toBe(2);
    expect(result.current.status).toBe('running');

    act(() => {
      vi.setSystemTime(new Date('2026-10-03T16:00:02.000Z'));
      vi.advanceTimersByTime(250);
    });

    expect(result.current.remainingSeconds).toBe(0);
    expect(result.current.status).toBe('complete');
  });

  it('resynchronizes when the page becomes visible again', () => {
    const { result } = renderHook(() => useCountdown());

    act(() => result.current.start(Date.now() + 10_000));
    act(() => {
      vi.setSystemTime(new Date('2026-10-03T16:00:08.000Z'));
      document.dispatchEvent(new Event('visibilitychange'));
    });

    expect(result.current.remainingSeconds).toBe(2);
  });

  it('can cancel an active countdown', () => {
    const { result } = renderHook(() => useCountdown());

    act(() => result.current.start(Date.now() + 10_000));
    act(() => result.current.cancel());

    expect(result.current.status).toBe('idle');
    expect(result.current.targetTimestamp).toBeNull();
  });
});
