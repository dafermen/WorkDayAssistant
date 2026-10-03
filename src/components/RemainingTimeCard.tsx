import type { TimeText } from '../types';

export interface RemainingTimeCardProps {
  readonly time: TimeText;
}

/** Presents the calculated duration without repeating business rules in the UI layer. */
export function RemainingTimeCard({ time }: RemainingTimeCardProps) {
  return (
    <article className="result-card" aria-labelledby="remaining-time-title">
      <h2 id="remaining-time-title">Tiempo restante</h2>
      <output className="result-card__value">{time}</output>
    </article>
  );
}
