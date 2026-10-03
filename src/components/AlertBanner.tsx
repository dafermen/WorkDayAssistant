import type { TimeText } from '../types';

export interface AlertBannerProps {
  readonly maximumWorkday: TimeText;
  readonly exceededBy: TimeText;
}

/** Gives an exceeded workday a visible and screen-reader-announced warning. */
export function AlertBanner({ maximumWorkday, exceededBy }: AlertBannerProps) {
  return (
    <div className="alert-banner" role="alert">
      <strong>Límite de jornada superado.</strong>
      <span>
        Has excedido {maximumWorkday} por {exceededBy}.
      </span>
    </div>
  );
}
