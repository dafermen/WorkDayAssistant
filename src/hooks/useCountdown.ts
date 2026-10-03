import { useCallback, useEffect, useState } from 'react';

export type CountdownStatus = 'idle' | 'running' | 'complete';

function secondsUntil(targetTimestamp: number) {
  return Math.max(0, Math.ceil((targetTimestamp - Date.now()) / 1000));
}

export interface UseCountdownResult {
  readonly targetTimestamp: number | null;
  readonly remainingSeconds: number;
  readonly status: CountdownStatus;
  readonly start: (targetTimestamp: number) => void;
  readonly cancel: () => void;
}

export function useCountdown(): UseCountdownResult {
  const [targetTimestamp, setTargetTimestamp] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  const synchronize = useCallback(() => {
    if (targetTimestamp === null) {
      return;
    }

    setRemainingSeconds(secondsUntil(targetTimestamp));
  }, [targetTimestamp]);

  useEffect(() => {
    if (targetTimestamp === null) {
      return;
    }

    const interval = window.setInterval(synchronize, 250);
    document.addEventListener('visibilitychange', synchronize);
    window.addEventListener('focus', synchronize);
    window.addEventListener('pageshow', synchronize);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', synchronize);
      window.removeEventListener('focus', synchronize);
      window.removeEventListener('pageshow', synchronize);
    };
  }, [synchronize, targetTimestamp]);

  const start = useCallback((nextTargetTimestamp: number) => {
    setTargetTimestamp(nextTargetTimestamp);
    setRemainingSeconds(secondsUntil(nextTargetTimestamp));
  }, []);

  const cancel = useCallback(() => {
    setTargetTimestamp(null);
    setRemainingSeconds(0);
  }, []);

  return {
    targetTimestamp,
    remainingSeconds,
    status: targetTimestamp === null ? 'idle' : remainingSeconds > 0 ? 'running' : 'complete',
    start,
    cancel,
  };
}
