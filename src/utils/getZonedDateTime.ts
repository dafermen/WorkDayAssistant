export interface ZonedDateTime {
  readonly year: number;
  readonly month: number;
  readonly day: number;
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
}

const partNames = ['year', 'month', 'day', 'hour', 'minute', 'second'] as const;

export function getZonedDateTime(date: Date, timeZone: string): ZonedDateTime {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
    numberingSystem: 'latn',
  }).formatToParts(date);

  const values = Object.fromEntries(
    partNames.map((name) => {
      const value = parts.find((part) => part.type === name)?.value;

      if (!value) {
        throw new Error(`No fue posible obtener ${name} para la zona horaria ${timeZone}.`);
      }

      return [name, Number(value)];
    }),
  ) as Record<(typeof partNames)[number], number>;

  return {
    year: values.year,
    month: values.month,
    day: values.day,
    hours: values.hour,
    minutes: values.minute,
    seconds: values.second,
  };
}
