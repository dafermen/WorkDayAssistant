import { useState } from 'react';
import type { TimeText, WorkdayCalculation, WorkdayField } from '../types';
import {
  calculateClosingTime,
  calculateRemainingTime,
  convertSecondsToTime,
  convertTimeToSeconds,
  MAX_WORKDAY_TIME,
  validateTime,
} from '../utils';

export type WorkdayValidationErrors = Partial<Record<WorkdayField, string>>;

export interface WorkdayOverLimit {
  readonly maximumWorkday: TimeText;
  readonly exceededBy: TimeText;
}

export interface UseWorkdayCalculatorResult {
  readonly maximumWorkday: string;
  readonly workedTime: string;
  readonly lastTaskStartTime: string;
  readonly errors: WorkdayValidationErrors;
  readonly calculation: WorkdayCalculation | null;
  readonly overLimit: WorkdayOverLimit | null;
  readonly setMaximumWorkday: (value: string) => void;
  readonly setWorkedTime: (value: string) => void;
  readonly setLastTaskStartTime: (value: string) => void;
  readonly calculate: () => WorkdayCalculation | null;
  readonly reset: () => void;
}

function validationMessage(value: string, fieldName: string): string {
  return value.trim() === ''
    ? `Ingresa ${fieldName}.`
    : `Usa HH:mm:ss para ${fieldName}; horas 00–23 y minutos/segundos 00–59.`;
}

/**
 * Coordinates raw form state with the pure calculation utilities.
 *
 * The hook clears derived output whenever an input changes so the screen never presents a result
 * calculated from values that are no longer visible in the form.
 */
export function useWorkdayCalculator(): UseWorkdayCalculatorResult {
  const [maximumWorkday, setMaximumWorkdayValue] = useState<string>(MAX_WORKDAY_TIME);
  const [workedTime, setWorkedTimeValue] = useState('');
  const [lastTaskStartTime, setLastTaskStartTimeValue] = useState('');
  const [errors, setErrors] = useState<WorkdayValidationErrors>({});
  const [calculation, setCalculation] = useState<WorkdayCalculation | null>(null);
  const [overLimit, setOverLimit] = useState<WorkdayOverLimit | null>(null);

  function clearDerivedOutput() {
    setCalculation(null);
    setOverLimit(null);
  }

  function clearFieldError(field: WorkdayField) {
    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
  }

  function setMaximumWorkday(value: string) {
    setMaximumWorkdayValue(value);
    clearFieldError('maximumWorkday');
    clearDerivedOutput();
  }

  function setWorkedTime(value: string) {
    setWorkedTimeValue(value);
    clearFieldError('workedTime');
    clearDerivedOutput();
  }

  function setLastTaskStartTime(value: string) {
    setLastTaskStartTimeValue(value);
    clearFieldError('lastTaskStartTime');
    clearDerivedOutput();
  }

  function calculate() {
    const validatedMaximumWorkday = validateTime(maximumWorkday);
    const validatedWorkedTime = validateTime(workedTime);
    const validatedLastTaskStartTime = validateTime(lastTaskStartTime);
    const nextErrors: WorkdayValidationErrors = {};

    if (!validatedMaximumWorkday) {
      nextErrors.maximumWorkday = validationMessage(maximumWorkday, 'la jornada máxima');
    }

    if (!validatedWorkedTime) {
      nextErrors.workedTime = validationMessage(workedTime, 'el tiempo trabajado');
    }

    if (!validatedLastTaskStartTime) {
      nextErrors.lastTaskStartTime = validationMessage(
        lastTaskStartTime,
        'la hora de inicio de la última tarea',
      );
    }

    setErrors(nextErrors);
    setCalculation(null);
    setOverLimit(null);

    if (!validatedMaximumWorkday || !validatedWorkedTime || !validatedLastTaskStartTime) {
      return null;
    }

    const remainingResult = calculateRemainingTime(
      convertTimeToSeconds(validatedWorkedTime),
      convertTimeToSeconds(validatedMaximumWorkday),
    );

    if (remainingResult.status === 'over-limit') {
      setOverLimit({
        maximumWorkday: validatedMaximumWorkday,
        exceededBy: convertSecondsToTime(remainingResult.exceededBySeconds),
      });
      return null;
    }

    const closingTime = calculateClosingTime(
      validatedLastTaskStartTime,
      remainingResult.remainingSeconds,
    );

    const nextCalculation: WorkdayCalculation = {
      maximumWorkday: validatedMaximumWorkday,
      workedTime: validatedWorkedTime,
      lastTaskStartTime: validatedLastTaskStartTime,
      remainingTime: convertSecondsToTime(remainingResult.remainingSeconds),
      remainingSeconds: remainingResult.remainingSeconds,
      recommendedClosingTime: closingTime.time,
      recommendedClosingDayOffset: closingTime.dayOffset,
    };

    setCalculation(nextCalculation);
    return nextCalculation;
  }

  function reset() {
    setMaximumWorkdayValue(MAX_WORKDAY_TIME);
    setWorkedTimeValue('');
    setLastTaskStartTimeValue('');
    setErrors({});
    setCalculation(null);
    setOverLimit(null);
  }

  return {
    maximumWorkday,
    workedTime,
    lastTaskStartTime,
    errors,
    calculation,
    overLimit,
    setMaximumWorkday,
    setWorkedTime,
    setLastTaskStartTime,
    calculate,
    reset,
  };
}
