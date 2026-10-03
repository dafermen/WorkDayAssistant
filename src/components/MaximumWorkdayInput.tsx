import { TimeInput, type TimeInputProps } from './TimeInput';

export type MaximumWorkdayInputProps = Omit<TimeInputProps, 'id' | 'label'>;

/** Gives the editable workday limit a stable label while reusing the shared time control. */
export function MaximumWorkdayInput(props: MaximumWorkdayInputProps) {
  return (
    <TimeInput
      id="maximum-workday"
      label="Jornada máxima"
      description="Límite total permitido para tu jornada. Puedes conservar el valor sugerido."
      {...props}
    />
  );
}
