import { useEffect, useMemo, useState } from 'react';
import { formatZonedClock } from '../utils';

export function useCurrentTime(timeZone: string) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    function synchronizeClock() {
      setNow(Date.now());
    }

    synchronizeClock();
    const interval = window.setInterval(synchronizeClock, 1000);
    document.addEventListener('visibilitychange', synchronizeClock);
    window.addEventListener('focus', synchronizeClock);
    window.addEventListener('pageshow', synchronizeClock);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', synchronizeClock);
      window.removeEventListener('focus', synchronizeClock);
      window.removeEventListener('pageshow', synchronizeClock);
    };
  }, [timeZone]);

  return useMemo(() => formatZonedClock(new Date(now), timeZone), [now, timeZone]);
}
