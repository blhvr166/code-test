export type NotificationType = 'registration-received' | 'time-update' | 'doctor-available';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  createdAt: string;
  isUnread: boolean;
}
