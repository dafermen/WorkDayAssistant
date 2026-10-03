import type { TimeText } from '../types';

export type AlarmStatus = 'inactive' | 'active' | 'ringing';

export interface AlarmStatusCardProps {
  readonly status: AlarmStatus;
  readonly closingTime?: TimeText;
  readonly timeZoneLabel?: string;
}

const statusLabels: Record<AlarmStatus, string> = {
  inactive: 'Alarma sin programar',
  active: 'Alarma activada',
  ringing: 'Alarma sonando',
};

export function AlarmStatusCard({ status, closingTime, timeZoneLabel }: AlarmStatusCardProps) {
  return (
    <section
      className={`alarm-status alarm-status--${status}`}
      aria-labelledby="alarm-status-title"
    >
      <div className="alarm-status__indicator" aria-hidden="true" />
      <div>
        <h2 id="alarm-status-title">{statusLabels[status]}</h2>
        {status === 'inactive' ? <p>Completa los datos y usa “Calcular e iniciar”.</p> : null}
        {status === 'active' && closingTime ? (
          <p>
            Programada para las <strong>{closingTime}</strong>
            {timeZoneLabel ? ` · ${timeZoneLabel}` : ''}.
          </p>
        ) : null}
        {status === 'ringing' ? <p role="alert">Llegó la hora de cerrar tu turno.</p> : null}
      </div>
    </section>
  );
}
