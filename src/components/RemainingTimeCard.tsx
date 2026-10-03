import { useLanguage } from '../i18n';
import type { TimeText } from '../types';

export interface RemainingTimeCardProps {
  readonly time: TimeText;
}

/** Presents the calculated duration without repeating business rules in the UI layer. */
export function RemainingTimeCard({ time }: RemainingTimeCardProps) {
  const { t } = useLanguage();

  return (
    <article className="result-card" aria-labelledby="remaining-time-title">
      <h2 id="remaining-time-title">{t('result.remaining')}</h2>
      <output className="result-card__value">{time}</output>
    </article>
  );
}
