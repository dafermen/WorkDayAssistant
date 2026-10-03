export const supportedLanguages = ['en', 'es'] as const;

export type Language = (typeof supportedLanguages)[number];

const english = {
  'language.label': 'Language',
  'language.english': 'English',
  'language.spanish': 'Español',
  'app.eyebrow': 'Workday calculator',
  'app.intro':
    'Enter the time accumulated immediately before your last task and the exact time you started it. We will calculate your closing time and start the countdown in one step.',
  'clock.current': 'Current time',
  'clock.timeZone': 'Time zone',
  'timezone.newYork': 'New York (Eastern Time)',
  'timezone.chicago': 'Chicago (Central Time)',
  'timezone.denver': 'Denver (Mountain Time)',
  'timezone.losAngeles': 'Los Angeles (Pacific Time)',
  'timezone.anchorage': 'Anchorage (Alaska)',
  'timezone.honolulu': 'Honolulu (Hawaii)',
  'timezone.utc': 'UTC',
  'field.maximum.label': 'Maximum workday',
  'field.maximum.description':
    'Total time allowed for your workday. You can keep the suggested value.',
  'field.worked.label': 'Time worked',
  'field.worked.description': 'Time accumulated immediately before starting your last task.',
  'field.lastTask.label': 'Last task start',
  'field.lastTask.description':
    'Clock time when you started the task that will remain open until closing.',
  'field.useCurrentTime': 'Use current time',
  'field.hint': 'Enter 4 or 6 digits; colons are added automatically. Example: 1430 → 14:30:00.',
  'validation.maximum': 'the maximum workday',
  'validation.worked': 'the time worked',
  'validation.lastTask': 'the last task start time',
  'validation.required': 'Enter {field}.',
  'validation.invalid': 'Use HH:mm:ss for {field}; hours must be 00–23 and minutes/seconds 00–59.',
  'action.calculate': 'Calculate and start',
  'action.testAlarm': 'Test alarm',
  'action.stopAlarm': 'Stop alarm',
  'action.cancelCountdown': 'Cancel countdown',
  'action.newWorkday': 'New workday',
  'quickActions.title': 'Quick actions',
  'alarm.inactive.title': 'Alarm not scheduled',
  'alarm.active.title': 'Alarm active',
  'alarm.ringing.title': 'Alarm ringing',
  'alarm.inactive.message': 'Complete the fields and select “Calculate and start”.',
  'alarm.active.message': 'Scheduled for {time}{zone}.',
  'alarm.ringing.message': 'It is time to close your workday.',
  'result.label': 'Calculation result',
  'result.remaining': 'Time remaining',
  'result.closing': 'Recommended closing time',
  'result.nextDay': 'Next day',
  'result.syncNote':
    'The device clock is used. When you return from another application, the countdown automatically resynchronizes.',
  'countdown.title': 'Countdown',
  'countdown.finalMinute': 'Less than one minute remains before closing your workday.',
  'countdown.complete': 'It is time to close your workday.',
  'limit.title': 'Workday limit exceeded.',
  'limit.message': 'You exceeded {maximum} by {exceeded}.',
  'feedback.playError': 'The alarm could not play. Check your device sound.',
  'feedback.currentTime': 'Current time entered: {time}.',
  'feedback.pastClosing':
    'The recommended closing time has already passed in this time zone. Review the values and calculate again.',
  'feedback.soundNotConfirmed':
    'The countdown will work, but the browser did not confirm the alarm sound.',
  'feedback.cancelled': 'The countdown and alarm were cancelled.',
  'feedback.testRunning': 'Alarm test in progress. It will stop automatically.',
  'feedback.testComplete': 'Alarm test completed successfully.',
  'feedback.testError': 'The alarm could not be tested. Check permissions and volume.',
  'feedback.reset': 'New workday ready. Previous values were cleared.',
  'documentation.link': 'View documentation',
} as const;

export type TranslationKey = keyof typeof english;

const spanish: Record<TranslationKey, string> = {
  'language.label': 'Idioma',
  'language.english': 'English',
  'language.spanish': 'Español',
  'app.eyebrow': 'Calculadora de jornada',
  'app.intro':
    'Indica cuánto tiempo llevabas acumulado justo antes de comenzar tu última tarea y la hora exacta en que la iniciaste. Calcularemos el cierre y activaremos la cuenta regresiva en una sola acción.',
  'clock.current': 'Hora actual',
  'clock.timeZone': 'Zona horaria',
  'timezone.newYork': 'New York (hora del Este)',
  'timezone.chicago': 'Chicago (hora Central)',
  'timezone.denver': 'Denver (hora de la Montaña)',
  'timezone.losAngeles': 'Los Ángeles (hora del Pacífico)',
  'timezone.anchorage': 'Anchorage (Alaska)',
  'timezone.honolulu': 'Honolulu (Hawái)',
  'timezone.utc': 'UTC',
  'field.maximum.label': 'Jornada máxima',
  'field.maximum.description':
    'Límite total permitido para tu jornada. Puedes conservar el valor sugerido.',
  'field.worked.label': 'Tiempo trabajado',
  'field.worked.description': 'Tiempo acumulado justo antes de comenzar tu última tarea.',
  'field.lastTask.label': 'Inicio de la última tarea',
  'field.lastTask.description':
    'Hora del reloj en que comenzaste la tarea que permanecerá abierta hasta el cierre.',
  'field.useCurrentTime': 'Usar hora actual',
  'field.hint': 'Escribe 4 o 6 dígitos; agregamos los dos puntos. Ejemplo: 1430 → 14:30:00.',
  'validation.maximum': 'la jornada máxima',
  'validation.worked': 'el tiempo trabajado',
  'validation.lastTask': 'la hora de inicio de la última tarea',
  'validation.required': 'Ingresa {field}.',
  'validation.invalid': 'Usa HH:mm:ss para {field}; horas 00–23 y minutos/segundos 00–59.',
  'action.calculate': 'Calcular e iniciar',
  'action.testAlarm': 'Probar alarma',
  'action.stopAlarm': 'Detener alarma',
  'action.cancelCountdown': 'Cancelar cuenta regresiva',
  'action.newWorkday': 'Nueva jornada',
  'quickActions.title': 'Acciones rápidas',
  'alarm.inactive.title': 'Alarma sin programar',
  'alarm.active.title': 'Alarma activada',
  'alarm.ringing.title': 'Alarma sonando',
  'alarm.inactive.message': 'Completa los datos y usa “Calcular e iniciar”.',
  'alarm.active.message': 'Programada para las {time}{zone}.',
  'alarm.ringing.message': 'Llegó la hora de cerrar tu turno.',
  'result.label': 'Resultado del cálculo',
  'result.remaining': 'Tiempo restante',
  'result.closing': 'Cierre recomendado',
  'result.nextDay': 'Día siguiente',
  'result.syncNote':
    'Se usa la hora real del dispositivo. Al volver desde otra aplicación, el contador se sincroniza automáticamente.',
  'countdown.title': 'Cuenta regresiva',
  'countdown.finalMinute': 'Menos de un minuto para cerrar el turno.',
  'countdown.complete': 'Es hora de cerrar el turno.',
  'limit.title': 'Límite de jornada superado.',
  'limit.message': 'Has excedido {maximum} por {exceeded}.',
  'feedback.playError': 'No fue posible reproducir la alarma. Revisa el sonido del equipo.',
  'feedback.currentTime': 'Se colocó la hora actual: {time}.',
  'feedback.pastClosing':
    'La hora recomendada ya pasó en esta zona horaria. Revisa los valores y calcula de nuevo.',
  'feedback.soundNotConfirmed':
    'La cuenta regresiva funcionará, pero el navegador no confirmó el sonido de la alarma.',
  'feedback.cancelled': 'La cuenta regresiva y la alarma fueron canceladas.',
  'feedback.testRunning': 'Prueba de alarma en curso. Se detendrá automáticamente.',
  'feedback.testComplete': 'Prueba de alarma completada correctamente.',
  'feedback.testError': 'No fue posible probar la alarma. Revisa los permisos y el volumen.',
  'feedback.reset': 'Nueva jornada lista. Los valores anteriores fueron eliminados.',
  'documentation.link': 'Ver documentación',
};

const translations: Record<Language, Readonly<Record<TranslationKey, string>>> = {
  en: english,
  es: spanish,
};

export const localeByLanguage: Record<Language, string> = {
  en: 'en-US',
  es: 'es-US',
};

export function translate(
  language: Language,
  key: TranslationKey,
  variables: Readonly<Record<string, string>> = {},
) {
  return translations[language][key].replace(/\{(\w+)\}/g, (placeholder, variable: string) => {
    const replacement = variables[variable];
    return replacement === undefined ? placeholder : replacement;
  });
}
