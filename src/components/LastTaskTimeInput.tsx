import { TimeInput, type TimeInputProps } from './TimeInput';

export type LastTaskTimeInputProps = Omit<TimeInputProps, 'id' | 'label'>;

/**
 * Gives the shared time control its final-task start meaning without duplicating input markup.
 */
export function LastTaskTimeInput(props: LastTaskTimeInputProps) {
  return <TimeInput id="last-task-start-time" label="Last task start time" {...props} />;
}
