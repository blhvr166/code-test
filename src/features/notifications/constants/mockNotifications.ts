import { NotificationItem } from '../types/notifications';

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    type: 'registration-received',
    title: 'Your registration form has been received.',
    createdAt: '2026-04-08T10:00:00.000Z',
    isUnread: true,
  },
  {
    id: '2',
    type: 'time-update',
    title: 'Estimated wait time updated: 45 min.',
    createdAt: '2026-04-08T10:03:00.000Z',
    isUnread: true,
  },
  {
    id: '3',
    type: 'doctor-available',
    title: 'Doctor available for consultation.',
    createdAt: '2026-04-08T10:04:00.000Z',
    isUnread: true,
  },
];
