'use client';

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { formatTimeAgo } from '../../../shared/utils/formatTimeAgo';
import { useNotificationFeed } from '../hooks/useNotificationFeed';
import { NotificationTypeIcon } from './NotificationTypeIcon';
import { NotificationItem } from '../types/notifications';
import '../styles/notifications.css';

function NotificationIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none" aria-hidden="true">
      <path d="M0 16.5278V14.5833H1.94444V7.77778C1.94444 6.43287 2.34954 5.23785 3.15972 4.19271C3.96991 3.14757 5.02315 2.46296 6.31944 2.13889V1.45833C6.31944 1.05324 6.46123 0.70891 6.74479 0.425344C7.02836 0.141781 7.37269 -1.90735e-06 7.77778 -1.90735e-06C8.18287 -1.90735e-06 8.5272 0.141781 8.81076 0.425344C9.09433 0.70891 9.23611 1.05324 9.23611 1.45833V2.13889C10.5324 2.46296 11.5856 3.14757 12.3958 4.19271C13.206 5.23785 13.6111 6.43287 13.6111 7.77778V14.5833H15.5556V16.5278H0ZM7.77778 19.4444C7.24306 19.4444 6.7853 19.254 6.40451 18.8733C6.02373 18.4925 5.83333 18.0347 5.83333 17.5H9.72222C9.72222 18.0347 9.53183 18.4925 9.15104 18.8733C8.77026 19.254 8.3125 19.4444 7.77778 19.4444ZM3.88889 14.5833H11.6667V7.77778C11.6667 6.70833 11.2859 5.79282 10.5243 5.03125C9.76273 4.26967 8.84722 3.88889 7.77778 3.88889C6.70833 3.88889 5.79282 4.26967 5.03125 5.03125C4.26968 5.79282 3.88889 6.70833 3.88889 7.77778V14.5833Z" fill="#135BEC"/>
    </svg>
  );
}

const NotificationListItem = memo(function NotificationListItem({
  notification,
  now,
}: {
  notification: NotificationItem;
  now: number;
}) {
  return (
    <li
      className={`notificationRow${notification.isUnread ? ' notificationRowUnread' : ''}`}
      role="listitem"
    >
      <span className="notificationRowIcon" aria-hidden="true">
        <NotificationTypeIcon type={notification.type} />
      </span>
      <div className="notificationRowContent">
        <p className="notificationRowText">{notification.title}</p>
        <span className="notificationRowTime" suppressHydrationWarning>{formatTimeAgo(notification.createdAt, now)}</span>
      </div>
    </li>
  );
});

function NotificationBellComponent() {
  const notificationsRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { notifications, unreadCount, now, markAllAsRead } = useNotificationFeed();
  const visibleNotifications = useMemo(
    () => (isExpanded ? notifications : notifications.slice(0, 3)),
    [isExpanded, notifications],
  );

  const closePopover = useCallback(() => {
    setIsOpen(false);
    setIsExpanded(false);
  }, []);

  const togglePopover = useCallback(() => {
    setIsOpen((previous) => {
      const nextIsOpen = !previous;
      if (!nextIsOpen) {
        setIsExpanded(false);
      }
      return nextIsOpen;
    });
  }, []);

  const expandPopover = useCallback(() => {
    setIsExpanded(true);
  }, []);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!notificationsRef.current) return;
      if (!notificationsRef.current.contains(event.target as Node)) {
        closePopover();
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [closePopover]);

  useEffect(() => {
    if (!isOpen) return;

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closePopover();
      }
    }

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [closePopover, isOpen]);

  return (
    <div className="notificationFeature" ref={notificationsRef}>
      <button
        type="button"
        className="actionButton notificationButton"
        aria-label="Open notifications"
        aria-expanded={isOpen}
        aria-controls="nav-notifications"
        onClick={togglePopover}
      >
        <span className="actionButtonBackground">
          <NotificationIcon />
        </span>
        {unreadCount > 0 && (
          <span className="notificationBadge" aria-label={`${unreadCount} unread notifications`}>
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          id="nav-notifications"
          className={`notificationsPopover${isExpanded ? ' notificationsPopoverExpanded' : ''}`}
          role="dialog"
          aria-modal="false"
          aria-label="Notifications"
        >
          <div className="notificationsHeader">
            <h2 className="notificationsTitle">Notifications</h2>
            <button type="button" className="markAllReadButton" onClick={markAllAsRead}>
              Mark all as read
            </button>
          </div>

          <ul className="notificationsList" role="list">
            {visibleNotifications.map((notification) => (
              <NotificationListItem key={notification.id} notification={notification} now={now} />
            ))}
          </ul>

          {notifications.length > 3 && !isExpanded && (
            <button type="button" className="viewAllNotificationsButton" onClick={expandPopover}>
              View All Notifications
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export const NotificationBell = memo(NotificationBellComponent);
