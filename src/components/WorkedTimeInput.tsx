import { TimeInput, type TimeInputProps } from './TimeInput';

export type WorkedTimeInputProps = Omit<TimeInputProps, 'id' | 'label'>;

/**
 * Gives the shared time control its worked-time meaning while preserving one source of markup.
 */
export function WorkedTimeInput(props: WorkedTimeInputProps) {
  return (
    <TimeInput
      id="worked-time"
      label="Tiempo trabajado"
      description="Tiempo acumulado justo antes de comenzar tu última tarea."
      {...props}
    />
  );
}
