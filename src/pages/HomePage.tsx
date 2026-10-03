import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  AlertBanner,
  AlarmStatusCard,
  ClosingTimeCard,
  Countdown,
  CurrentTimePanel,
  LastTaskTimeInput,
  MaximumWorkdayInput,
  RemainingTimeCard,
  WorkedTimeInput,
} from '../components';
import { useCountdown, useCurrentTime, useWorkdayCalculator } from '../hooks';
import { webAudioAlertService } from '../services';
import type { WorkdayCalculation } from '../types';
import {
  calculateCountdownTarget,
  convertSecondsToTime,
  isClosingTime,
  isOneMinuteRemaining,
} from '../utils';
import '../styles/workday-calculator.css';

const DEFAULT_TIME_ZONE = 'America/New_York';

const timeZoneOptions = [
  { value: 'America/New_York', label: 'New York (hora del Este)' },
  { value: 'America/Chicago', label: 'Chicago (hora Central)' },
  { value: 'America/Denver', label: 'Denver (hora de la Montaña)' },
  { value: 'America/Los_Angeles', label: 'Los Ángeles (hora del Pacífico)' },
  { value: 'America/Anchorage', label: 'Anchorage (Alaska)' },
  { value: 'Pacific/Honolulu', label: 'Honolulu (Hawái)' },
  { value: 'UTC', label: 'UTC' },
] as const;

export function HomePage() {
  const calculator = useWorkdayCalculator();
  const countdown = useCountdown();
  const [timeZone, setTimeZone] = useState(DEFAULT_TIME_ZONE);
  const [countdownError, setCountdownError] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const lastAlarmTarget = useRef<number | null>(null);
  const testAlarmTimeout = useRef<number | null>(null);
  const clock = useCurrentTime(timeZone);

  useEffect(() => {
    if (
      countdown.status !== 'complete' ||
      countdown.targetTimestamp === null ||
      lastAlarmTarget.current === countdown.targetTimestamp
    ) {
      return;
    }

    lastAlarmTarget.current = countdown.targetTimestamp;
    void webAudioAlertService
      .play('closing-time')
      .catch(() =>
        setFeedbackMessage('No fue posible reproducir la alarma. Revisa el sonido del equipo.'),
      );
  }, [countdown.status, countdown.targetTimestamp]);

  useEffect(
    () => () => {
      webAudioAlertService.stop();
      if (testAlarmTimeout.current !== null) {
        window.clearTimeout(testAlarmTimeout.current);
      }
    },
    [],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    resetActiveCountdown();
    const calculation = calculator.calculate();

    if (calculation) {
      void startCountdown(calculation);
    }
  }

  function resetActiveCountdown() {
    countdown.cancel();
    webAudioAlertService.stop();
    lastAlarmTarget.current = null;
    setCountdownError(null);
    setFeedbackMessage(null);
  }

  function handleMaximumWorkdayChange(value: string) {
    resetActiveCountdown();
    calculator.setMaximumWorkday(value);
  }

  function handleWorkedTimeChange(value: string) {
    resetActiveCountdown();
    calculator.setWorkedTime(value);
  }

  function handleLastTaskStartTimeChange(value: string) {
    resetActiveCountdown();
    calculator.setLastTaskStartTime(value);
  }

  function handleUseCurrentTime() {
    handleLastTaskStartTimeChange(clock.time);
    setFeedbackMessage(`Se colocó la hora actual: ${clock.time}.`);
  }

  function handleTimeZoneChange(nextTimeZone: string) {
    setTimeZone(nextTimeZone);
    resetActiveCountdown();
  }

  async function startCountdown(calculation: WorkdayCalculation) {
    const targetTimestamp = calculateCountdownTarget({
      now: new Date(),
      closingTime: calculation.recommendedClosingTime,
      dayOffset: calculation.recommendedClosingDayOffset,
      timeZone,
    });

    if (targetTimestamp === null) {
      setCountdownError(
        'La hora recomendada ya pasó en esta zona horaria. Revisa los valores y calcula de nuevo.',
      );
      return;
    }

    setCountdownError(null);
    setFeedbackMessage(null);
    lastAlarmTarget.current = null;
    countdown.start(targetTimestamp);

    try {
      await webAudioAlertService.prime();
    } catch {
      setFeedbackMessage(
        'La cuenta regresiva funcionará, pero el navegador no confirmó el sonido de la alarma.',
      );
    }
  }

  function handleStopCountdown() {
    countdown.cancel();
    webAudioAlertService.stop();
    lastAlarmTarget.current = null;
    setFeedbackMessage('La cuenta regresiva y la alarma fueron canceladas.');
  }

  async function handleTestAlarm() {
    if (testAlarmTimeout.current !== null) {
      window.clearTimeout(testAlarmTimeout.current);
    }

    try {
      await webAudioAlertService.prime();
      await webAudioAlertService.play('closing-time');
      setFeedbackMessage('Prueba de alarma en curso. Se detendrá automáticamente.');
      testAlarmTimeout.current = window.setTimeout(() => {
        webAudioAlertService.stop();
        testAlarmTimeout.current = null;
        setFeedbackMessage('Prueba de alarma completada correctamente.');
      }, 1500);
    } catch {
      setFeedbackMessage('No fue posible probar la alarma. Revisa los permisos y el volumen.');
    }
  }

  function handleResetWorkday() {
    resetActiveCountdown();
    calculator.reset();
    setFeedbackMessage('Nueva jornada lista. Los valores anteriores fueron eliminados.');
  }

  const countdownTime = convertSecondsToTime(countdown.remainingSeconds);
  const countdownVisualState = isClosingTime(countdown.remainingSeconds)
    ? 'complete'
    : isOneMinuteRemaining(countdown.remainingSeconds)
      ? 'final-minute'
      : 'running';
  const alarmStatus =
    countdown.status === 'complete'
      ? 'ringing'
      : countdown.status === 'running'
        ? 'active'
        : 'inactive';

  return (
    <main className="app-shell">
      <section className="status-card calculator-card" aria-labelledby="app-title">
        <p className="eyebrow">Calculadora de jornada</p>
        <h1 id="app-title">WorkDay Assistant</h1>
        <p>
          Indica cuánto tiempo llevabas acumulado justo antes de comenzar tu última tarea y la hora
          exacta en que la iniciaste. Calcularemos el cierre y activaremos la cuenta regresiva en
          una sola acción.
        </p>

        <CurrentTimePanel
          clock={clock}
          timeZone={timeZone}
          options={timeZoneOptions}
          onTimeZoneChange={handleTimeZoneChange}
        />

        <form className="calculator-form" onSubmit={handleSubmit} noValidate>
          <div className="calculator-form__fields">
            <MaximumWorkdayInput
              value={calculator.maximumWorkday}
              onChange={handleMaximumWorkdayChange}
              error={calculator.errors.maximumWorkday}
            />
            <WorkedTimeInput
              value={calculator.workedTime}
              onChange={handleWorkedTimeChange}
              error={calculator.errors.workedTime}
            />
            <LastTaskTimeInput
              value={calculator.lastTaskStartTime}
              onChange={handleLastTaskStartTimeChange}
              onUseCurrentTime={handleUseCurrentTime}
              error={calculator.errors.lastTaskStartTime}
            />
          </div>
          <button className="calculator-form__button" type="submit">
            Calcular e iniciar
          </button>
        </form>

        <AlarmStatusCard
          status={alarmStatus}
          closingTime={calculator.calculation?.recommendedClosingTime}
          timeZoneLabel={clock.zoneLabel}
        />

        <section className="quick-actions" aria-labelledby="quick-actions-title">
          <h2 id="quick-actions-title">Acciones rápidas</h2>
          <div>
            <button
              className="secondary-button"
              type="button"
              onClick={() => void handleTestAlarm()}
              disabled={countdown.status !== 'idle'}
            >
              Probar alarma
            </button>
            {countdown.status !== 'idle' ? (
              <button className="secondary-button" type="button" onClick={handleStopCountdown}>
                {countdown.status === 'complete' ? 'Detener alarma' : 'Cancelar cuenta regresiva'}
              </button>
            ) : null}
            <button className="secondary-button" type="button" onClick={handleResetWorkday}>
              Nueva jornada
            </button>
          </div>
        </section>

        {calculator.overLimit ? (
          <AlertBanner
            maximumWorkday={calculator.overLimit.maximumWorkday}
            exceededBy={calculator.overLimit.exceededBy}
          />
        ) : null}

        {calculator.calculation ? (
          <section
            className="calculation-results"
            aria-label="Resultado del cálculo"
            aria-live="polite"
          >
            <RemainingTimeCard time={calculator.calculation.remainingTime} />
            <ClosingTimeCard
              time={calculator.calculation.recommendedClosingTime}
              dayOffset={calculator.calculation.recommendedClosingDayOffset}
            />
            <div className="countdown-controls">
              <p>
                Se usa la hora real del dispositivo. Al volver desde otra aplicación, el contador se
                sincroniza automáticamente.
              </p>
            </div>
          </section>
        ) : null}

        {countdown.status !== 'idle' ? (
          <Countdown time={countdownTime} state={countdownVisualState} />
        ) : null}

        {countdownError ? (
          <p className="inline-message inline-message--error" role="alert">
            {countdownError}
          </p>
        ) : null}

        {feedbackMessage ? (
          <p className="inline-message" role="status">
            {feedbackMessage}
          </p>
        ) : null}

        <a className="calculator-card__documentation" href="./docs/index.html">
          Ver documentación
        </a>
      </section>
    </main>
  );
}
