import { useLanguage } from '../i18n';
import type { TimeText } from '../types';

export interface ClosingTimeCardProps {
  readonly time: TimeText;
  readonly dayOffset: number;
}

/** Presents the recommended clock time and makes a midnight rollover explicit. */
export function ClosingTimeCard({ time, dayOffset }: ClosingTimeCardProps) {
  const { t } = useLanguage();

  return (
    <article className="result-card" aria-labelledby="closing-time-title">
      <h2 id="closing-time-title">{t('result.closing')}</h2>
      <output className="result-card__value">{time}</output>
      {dayOffset > 0 ? <p className="result-card__note">{t('result.nextDay')}</p> : null}
    </article>
  );
}
