import { TimeInput, type TimeInputProps } from './TimeInput';

export interface LastTaskTimeInputProps extends Omit<TimeInputProps, 'id' | 'label'> {
  readonly onUseCurrentTime?: () => void;
}

/**
 * Gives the shared time control its final-task start meaning without duplicating input markup.
 */
export function LastTaskTimeInput({ onUseCurrentTime, ...props }: LastTaskTimeInputProps) {
  return (
    <TimeInput
      id="last-task-start-time"
      label="Inicio de la última tarea"
      description="Hora del reloj en que comenzaste la tarea que permanecerá abierta hasta el cierre."
      actionLabel={onUseCurrentTime ? 'Usar hora actual' : undefined}
      onAction={onUseCurrentTime}
      {...props}
    />
  );
}
