import { useEffect, useMemo, useReducer, useRef } from 'react';
import { useWaitTimes } from '../../dashboard/hooks/useWaitTimes';
import { INITIAL_NOTIFICATIONS } from '../constants/mockNotifications';
import { NotificationItem } from '../types/notifications';
import { useNow } from '../../../shared/hooks/useNow';

type NotificationsAction =
  | { type: 'append'; payload: NotificationItem }
  | { type: 'mark-all-read' };

function notificationsReducer(state: NotificationItem[], action: NotificationsAction): NotificationItem[] {
  if (action.type === 'append') {
    return [action.payload, ...state];
  }

  return state.map((notification) => ({
    ...notification,
    isUnread: false,
  }));
}

export function useNotificationFeed() {
  const { data } = useWaitTimes();
  const previousUpdateRef = useRef<string | null>(null);
  const [notifications, dispatchNotifications] = useReducer(notificationsReducer, INITIAL_NOTIFICATIONS);
  const now = useNow(30000);

  useEffect(() => {
    if (!data?.lastUpdated) {
      return;
    }

    if (previousUpdateRef.current === null) {
      previousUpdateRef.current = data.lastUpdated;
      return;
    }

    if (previousUpdateRef.current !== data.lastUpdated) {
      const newNotification: NotificationItem = {
        id: `wait-update-${Date.now()}`,
        type: 'time-update',
        title: `Estimated wait time updated: ${data.averageWaitTime} min.`,
        createdAt: new Date().toISOString(),
        isUnread: true,
      };

      dispatchNotifications({ type: 'append', payload: newNotification });
      previousUpdateRef.current = data.lastUpdated;
      return;
    }

    previousUpdateRef.current = data.lastUpdated;
  }, [data?.averageWaitTime, data?.lastUpdated]);

  function markAllAsRead() {
    dispatchNotifications({ type: 'mark-all-read' });
  }

  const unreadCount = useMemo(
    () => notifications.reduce((total, notification) => total + (notification.isUnread ? 1 : 0), 0),
    [notifications],
  );

  return {
    notifications,
    unreadCount,
    now,
    markAllAsRead,
  };
}
