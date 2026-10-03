import { useLanguage } from '../i18n';
import { TimeInput, type TimeInputProps } from './TimeInput';

export type MaximumWorkdayInputProps = Omit<TimeInputProps, 'id' | 'label'>;

/** Gives the editable workday limit a stable label while reusing the shared time control. */
export function MaximumWorkdayInput(props: MaximumWorkdayInputProps) {
  const { t } = useLanguage();

  return (
    <TimeInput
      id="maximum-workday"
      label={t('field.maximum.label')}
      description={t('field.maximum.description')}
      {...props}
    />
  );
}
