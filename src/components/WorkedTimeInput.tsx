import { useLanguage } from '../i18n';
import { TimeInput, type TimeInputProps } from './TimeInput';

export type WorkedTimeInputProps = Omit<TimeInputProps, 'id' | 'label'>;

/**
 * Gives the shared time control its worked-time meaning while preserving one source of markup.
 */
export function WorkedTimeInput(props: WorkedTimeInputProps) {
  const { t } = useLanguage();

  return (
    <TimeInput
      id="worked-time"
      label={t('field.worked.label')}
      description={t('field.worked.description')}
      {...props}
    />
  );
}
