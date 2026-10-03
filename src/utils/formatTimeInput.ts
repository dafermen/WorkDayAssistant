/** Keeps only six digits and inserts HH:mm:ss separators while the user types. */
export function formatTimeInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 6);
  const segments = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 6)];

  return segments.filter(Boolean).join(':');
}

/** Treats four entered digits as HH:mm and supplies zero seconds when focus leaves the field. */
export function completeTimeInput(value: string): string {
  const formatted = formatTimeInput(value);
  return /^\d{2}:\d{2}$/.test(formatted) ? `${formatted}:00` : formatted;
}
