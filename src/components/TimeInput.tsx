import type { ChangeEvent } from 'react';
import '../styles/time-input.css';

export interface TimeInputProps {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly error?: string;
  readonly disabled?: boolean;
}

/**
 * Presents one controlled time field without owning validation or business calculations.
 *
 * Keeping those responsibilities outside the component makes the same accessible input reusable
 * for worked time and final-task start time while their parent decides when to validate.
 */
export function TimeInput({ id, label, value, onChange, error, disabled = false }: TimeInputProps) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = error ? `${hintId} ${errorId}` : hintId;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <div className="time-input">
      <label className="time-input__label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="time-input__control"
        type="text"
        inputMode="numeric"
        autoComplete="off"
        placeholder="00:00:00"
        maxLength={8}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        aria-describedby={describedBy}
        aria-invalid={Boolean(error)}
      />
      <p id={hintId} className="time-input__hint">
        Format: HH:mm:ss
      </p>
      {error ? (
        <p id={errorId} className="time-input__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
