import { useLanguage } from '../i18n';
import type { ZonedClock } from '../utils';

export interface TimeZoneOption {
  readonly value: string;
  readonly label: string;
}

export interface CurrentTimePanelProps {
  readonly clock: ZonedClock;
  readonly timeZone: string;
  readonly options: readonly TimeZoneOption[];
  readonly onTimeZoneChange: (timeZone: string) => void;
}

export function CurrentTimePanel({
  clock,
  timeZone,
  options,
  onTimeZoneChange,
}: CurrentTimePanelProps) {
  const { t } = useLanguage();

  return (
    <section className="current-time" aria-labelledby="current-time-title">
      <div>
        <h2 id="current-time-title">{t('clock.current')}</h2>
        <time className="current-time__value">{clock.time}</time>
        <p className="current-time__date">{clock.dateLabel}</p>
        <p className="current-time__zone">{clock.zoneLabel}</p>
      </div>
      <label className="time-zone-select">
        <span>{t('clock.timeZone')}</span>
        <select value={timeZone} onChange={(event) => onTimeZoneChange(event.target.value)}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}
