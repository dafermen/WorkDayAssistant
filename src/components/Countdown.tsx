import { useLanguage } from '../i18n';
import type { TimeText } from '../types';

export type CountdownVisualState = 'running' | 'final-minute' | 'complete';

export interface CountdownProps {
  readonly time: TimeText;
  readonly state: CountdownVisualState;
}

export function Countdown({ time, state }: CountdownProps) {
  const { t } = useLanguage();
  const isComplete = state === 'complete';

  return (
    <section className={`countdown countdown--${state}`} aria-labelledby="countdown-title">
      <h2 id="countdown-title">{t('countdown.title')}</h2>
      <output className="countdown__value" role="timer" aria-live="off" aria-atomic="true">
        {time}
      </output>
      {state === 'final-minute' ? (
        <p className="countdown__message">{t('countdown.finalMinute')}</p>
      ) : null}
      {isComplete ? (
        <p className="countdown__message" role="alert">
          {t('countdown.complete')}
        </p>
      ) : null}
    </section>
  );
}
