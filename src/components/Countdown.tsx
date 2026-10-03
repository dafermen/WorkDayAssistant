import type { TimeText } from '../types';

export type CountdownVisualState = 'running' | 'final-minute' | 'complete';

export interface CountdownProps {
  readonly time: TimeText;
  readonly state: CountdownVisualState;
}

export function Countdown({ time, state }: CountdownProps) {
  const isComplete = state === 'complete';

  return (
    <section className={`countdown countdown--${state}`} aria-labelledby="countdown-title">
      <h2 id="countdown-title">Cuenta regresiva</h2>
      <output className="countdown__value" role="timer" aria-live="off" aria-atomic="true">
        {time}
      </output>
      {state === 'final-minute' ? (
        <p className="countdown__message">Menos de un minuto para cerrar el turno.</p>
      ) : null}
      {isComplete ? (
        <p className="countdown__message" role="alert">
          Es hora de cerrar el turno.
        </p>
      ) : null}
    </section>
  );
}
