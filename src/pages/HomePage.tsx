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
import { useLanguage, type Language, type TranslationKey } from '../i18n';
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

const timeZoneOptions: ReadonlyArray<{ value: string; labelKey: TranslationKey }> = [
  { value: 'America/New_York', labelKey: 'timezone.newYork' },
  { value: 'America/Chicago', labelKey: 'timezone.chicago' },
  { value: 'America/Denver', labelKey: 'timezone.denver' },
  { value: 'America/Los_Angeles', labelKey: 'timezone.losAngeles' },
  { value: 'America/Anchorage', labelKey: 'timezone.anchorage' },
  { value: 'Pacific/Honolulu', labelKey: 'timezone.honolulu' },
  { value: 'UTC', labelKey: 'timezone.utc' },
] as const;

interface FeedbackMessage {
  readonly key: TranslationKey;
  readonly variables?: Readonly<Record<string, string>>;
}

export function HomePage() {
  const { language, locale, setLanguage, t } = useLanguage();
  const calculator = useWorkdayCalculator(language);
  const countdown = useCountdown();
  const [timeZone, setTimeZone] = useState(DEFAULT_TIME_ZONE);
  const [hasCountdownError, setHasCountdownError] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<FeedbackMessage | null>(null);
  const lastAlarmTarget = useRef<number | null>(null);
  const testAlarmTimeout = useRef<number | null>(null);
  const clock = useCurrentTime(timeZone, locale);
  const localizedTimeZoneOptions = timeZoneOptions.map((option) => ({
    value: option.value,
    label: t(option.labelKey),
  }));

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
      .catch(() => setFeedbackMessage({ key: 'feedback.playError' }));
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
    setHasCountdownError(false);
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
    setFeedbackMessage({ key: 'feedback.currentTime', variables: { time: clock.time } });
  }

  function handleTimeZoneChange(nextTimeZone: string) {
    setTimeZone(nextTimeZone);
    resetActiveCountdown();
  }

  function handleLanguageChange(nextLanguage: Language) {
    calculator.clearErrors();
    setLanguage(nextLanguage);
  }

  async function startCountdown(calculation: WorkdayCalculation) {
    const targetTimestamp = calculateCountdownTarget({
      now: new Date(),
      closingTime: calculation.recommendedClosingTime,
      dayOffset: calculation.recommendedClosingDayOffset,
      timeZone,
    });

    if (targetTimestamp === null) {
      setHasCountdownError(true);
      return;
    }

    setHasCountdownError(false);
    setFeedbackMessage(null);
    lastAlarmTarget.current = null;
    countdown.start(targetTimestamp);

    try {
      await webAudioAlertService.prime();
    } catch {
      setFeedbackMessage({ key: 'feedback.soundNotConfirmed' });
    }
  }

  function handleStopCountdown() {
    countdown.cancel();
    webAudioAlertService.stop();
    lastAlarmTarget.current = null;
    setFeedbackMessage({ key: 'feedback.cancelled' });
  }

  async function handleTestAlarm() {
    if (testAlarmTimeout.current !== null) {
      window.clearTimeout(testAlarmTimeout.current);
    }

    try {
      await webAudioAlertService.prime();
      await webAudioAlertService.play('closing-time');
      setFeedbackMessage({ key: 'feedback.testRunning' });
      testAlarmTimeout.current = window.setTimeout(() => {
        webAudioAlertService.stop();
        testAlarmTimeout.current = null;
        setFeedbackMessage({ key: 'feedback.testComplete' });
      }, 1500);
    } catch {
      setFeedbackMessage({ key: 'feedback.testError' });
    }
  }

  function handleResetWorkday() {
    resetActiveCountdown();
    calculator.reset();
    setFeedbackMessage({ key: 'feedback.reset' });
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
        <div className="calculator-card__toolbar">
          <label className="language-select">
            <span>{t('language.label')}</span>
            <select
              value={language}
              onChange={(event) => handleLanguageChange(event.target.value as Language)}
            >
              <option value="en">{t('language.english')}</option>
              <option value="es">{t('language.spanish')}</option>
            </select>
          </label>
        </div>
        <p className="eyebrow">{t('app.eyebrow')}</p>
        <h1 id="app-title">WorkDay Assistant</h1>
        <p>{t('app.intro')}</p>

        <CurrentTimePanel
          clock={clock}
          timeZone={timeZone}
          options={localizedTimeZoneOptions}
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
            {t('action.calculate')}
          </button>
        </form>

        <AlarmStatusCard
          status={alarmStatus}
          closingTime={calculator.calculation?.recommendedClosingTime}
          timeZoneLabel={clock.zoneLabel}
        />

        <section className="quick-actions" aria-labelledby="quick-actions-title">
          <h2 id="quick-actions-title">{t('quickActions.title')}</h2>
          <div>
            <button
              className="secondary-button"
              type="button"
              onClick={() => void handleTestAlarm()}
              disabled={countdown.status !== 'idle'}
            >
              {t('action.testAlarm')}
            </button>
            {countdown.status !== 'idle' ? (
              <button className="secondary-button" type="button" onClick={handleStopCountdown}>
                {countdown.status === 'complete'
                  ? t('action.stopAlarm')
                  : t('action.cancelCountdown')}
              </button>
            ) : null}
            <button className="secondary-button" type="button" onClick={handleResetWorkday}>
              {t('action.newWorkday')}
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
            aria-label={t('result.label')}
            aria-live="polite"
          >
            <RemainingTimeCard time={calculator.calculation.remainingTime} />
            <ClosingTimeCard
              time={calculator.calculation.recommendedClosingTime}
              dayOffset={calculator.calculation.recommendedClosingDayOffset}
            />
            <div className="countdown-controls">
              <p>{t('result.syncNote')}</p>
            </div>
          </section>
        ) : null}

        {countdown.status !== 'idle' ? (
          <Countdown time={countdownTime} state={countdownVisualState} />
        ) : null}

        {hasCountdownError ? (
          <p className="inline-message inline-message--error" role="alert">
            {t('feedback.pastClosing')}
          </p>
        ) : null}

        {feedbackMessage ? (
          <p className="inline-message" role="status">
            {t(feedbackMessage.key, feedbackMessage.variables)}
          </p>
        ) : null}

        <a className="calculator-card__documentation" href="./docs/index.html">
          {t('documentation.link')}
        </a>
      </section>
    </main>
  );
}
