import type { AlertKind, PersistedWorkdayData } from './workday';

export type NotificationPermissionStatus = 'prompt' | 'granted' | 'denied';

export interface LocalNotificationRequest {
  readonly id: number;
  readonly title: string;
  readonly body: string;
  readonly at: Date;
}

/** Keeps localStorage usage outside React and allows a test double in unit tests. */
export interface WorkdayStorageService {
  load(): PersistedWorkdayData | null;
  save(data: PersistedWorkdayData): void;
  clear(): void;
}

/** Hides browser and Capacitor notification differences from hooks and components. */
export interface LocalNotificationService {
  getPermissionStatus(): Promise<NotificationPermissionStatus>;
  requestPermission(): Promise<NotificationPermissionStatus>;
  schedule(request: LocalNotificationRequest): Promise<void>;
  cancel(id: number): Promise<void>;
}

/** Provides a small API so audible alerts can be disabled or replaced in tests. */
export interface AudioAlertService {
  play(kind: AlertKind): Promise<void>;
  stop(): void;
}
