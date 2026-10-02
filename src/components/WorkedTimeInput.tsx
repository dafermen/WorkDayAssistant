import { TimeInput, type TimeInputProps } from './TimeInput';

export type WorkedTimeInputProps = Omit<TimeInputProps, 'id' | 'label'>;

/**
 * Gives the shared time control its worked-time meaning while preserving one source of markup.
 */
export function WorkedTimeInput(props: WorkedTimeInputProps) {
  return <TimeInput id="worked-time" label="Worked time" {...props} />;
}
