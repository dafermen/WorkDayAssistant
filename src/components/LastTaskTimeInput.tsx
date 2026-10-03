import { useLanguage } from '../i18n';
import { TimeInput, type TimeInputProps } from './TimeInput';

export interface LastTaskTimeInputProps extends Omit<TimeInputProps, 'id' | 'label'> {
  readonly onUseCurrentTime?: () => void;
}

/**
 * Gives the shared time control its final-task start meaning without duplicating input markup.
 */
export function LastTaskTimeInput({ onUseCurrentTime, ...props }: LastTaskTimeInputProps) {
  const { t } = useLanguage();

  return (
    <TimeInput
      id="last-task-start-time"
      label={t('field.lastTask.label')}
      description={t('field.lastTask.description')}
      actionLabel={onUseCurrentTime ? t('field.useCurrentTime') : undefined}
      onAction={onUseCurrentTime}
      {...props}
    />
  );
}
