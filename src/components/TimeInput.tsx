import type { ChangeEvent, FocusEvent } from 'react';
import { completeTimeInput, formatTimeInput } from '../utils';
import '../styles/time-input.css';

export interface TimeInputProps {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly description?: string;
  readonly actionLabel?: string;
  readonly onAction?: () => void;
  readonly error?: string;
  readonly disabled?: boolean;
}

/**
 * Presents one controlled time field without owning validation or business calculations.
 *
 * Keeping those responsibilities outside the component makes the same accessible input reusable
 * for worked time and final-task start time while their parent decides when to validate.
 */
export function TimeInput({
  id,
  label,
  value,
  onChange,
  description,
  actionLabel,
  onAction,
  error,
  disabled = false,
}: TimeInputProps) {
  const hintId = `${id}-hint`;
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const describedBy = [description ? descriptionId : null, hintId, error ? errorId : null]
    .filter(Boolean)
    .join(' ');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(formatTimeInput(event.target.value));
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    const completed = completeTimeInput(event.target.value);

    if (completed !== value) {
      onChange(completed);
    }
  }

  return (
    <div className="time-input">
      <div className="time-input__heading">
        <label className="time-input__label" htmlFor={id}>
          {label}
        </label>
        {actionLabel && onAction ? (
          <button
            className="time-input__action"
            type="button"
            onClick={onAction}
            disabled={disabled}
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
      {description ? (
        <p id={descriptionId} className="time-input__description">
          {description}
        </p>
      ) : null}
      <input
        id={id}
        className="time-input__control"
        type="text"
        inputMode="numeric"
        autoComplete="off"
        placeholder="HHMMSS"
        maxLength={8}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        aria-describedby={describedBy}
        aria-invalid={Boolean(error)}
      />
      <p id={hintId} className="time-input__hint">
        Escribe 4 o 6 dígitos; agregamos los dos puntos. Ejemplo: 1430 → 14:30:00.
      </p>
      {error ? (
        <p id={errorId} className="time-input__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
