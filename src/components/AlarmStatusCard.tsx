import { useLanguage } from '../i18n';
import type { TimeText } from '../types';

export type AlarmStatus = 'inactive' | 'active' | 'ringing';

export interface AlarmStatusCardProps {
  readonly status: AlarmStatus;
  readonly closingTime?: TimeText;
  readonly timeZoneLabel?: string;
}

export function AlarmStatusCard({ status, closingTime, timeZoneLabel }: AlarmStatusCardProps) {
  const { t } = useLanguage();
  const statusLabels: Record<AlarmStatus, string> = {
    inactive: t('alarm.inactive.title'),
    active: t('alarm.active.title'),
    ringing: t('alarm.ringing.title'),
  };

  return (
    <section
      className={`alarm-status alarm-status--${status}`}
      aria-labelledby="alarm-status-title"
    >
      <div className="alarm-status__indicator" aria-hidden="true" />
      <div>
        <h2 id="alarm-status-title">{statusLabels[status]}</h2>
        {status === 'inactive' ? <p>{t('alarm.inactive.message')}</p> : null}
        {status === 'active' && closingTime ? (
          <p>
            {t('alarm.active.message', {
              time: closingTime,
              zone: timeZoneLabel ? ` · ${timeZoneLabel}` : '',
            })}
          </p>
        ) : null}
        {status === 'ringing' ? <p role="alert">{t('alarm.ringing.message')}</p> : null}
      </div>
    </section>
  );
}
