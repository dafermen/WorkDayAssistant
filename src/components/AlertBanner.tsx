import { useLanguage } from '../i18n';
import type { TimeText } from '../types';

export interface AlertBannerProps {
  readonly maximumWorkday: TimeText;
  readonly exceededBy: TimeText;
}

/** Gives an exceeded workday a visible and screen-reader-announced warning. */
export function AlertBanner({ maximumWorkday, exceededBy }: AlertBannerProps) {
  const { t } = useLanguage();

  return (
    <div className="alert-banner" role="alert">
      <strong>{t('limit.title')}</strong>
      <span>{t('limit.message', { maximum: maximumWorkday, exceeded: exceededBy })}</span>
    </div>
  );
}
