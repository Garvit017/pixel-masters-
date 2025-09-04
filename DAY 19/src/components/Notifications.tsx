import React from 'react';
import { useStore } from '../store/useStore';
import { Heart, MessageCircle, UserPlus, AtSign, Bell } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function Notifications() {
  const { currentUser, getUserNotifications, users, markNotificationAsRead } = useStore();
  
  if (!currentUser) return null;

  const notifications = getUserNotifications(currentUser.id);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'follow':
        return <UserPlus className="w-5 h-5 text-green-500" />;
      case 'mention':
        return <AtSign className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationText = (notification: any) => {
    const fromUser = users.find(u => u.id === notification.fromUserId);
    if (!fromUser) return '';

    switch (notification.type) {
      case 'like':
        return `${fromUser.displayName} liked your post`;
      case 'comment':
        return `${fromUser.displayName} commented on your post`;
      case 'follow':
        return `${fromUser.displayName} started following you`;
      case 'mention':
        return `${fromUser.displayName} mentioned you in a post`;
      default:
        return 'You have a new notification';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-gray-400 mb-4">
              <Bell className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">You're all caught up!</p>
          </div>
        ) : (
          notifications.map((notification) => {
            const fromUser = users.find(u => u.id === notification.fromUserId);
            if (!fromUser) return null;

            return (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                  !notification.isRead ? 'bg-blue-50' : ''
                }`}
                onClick={() => markNotificationAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600 flex-shrink-0">
                    {fromUser.avatar ? (
                      <img
                        src={fromUser.avatar}
                        alt={fromUser.displayName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      getInitials(fromUser.displayName)
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      {getNotificationIcon(notification.type)}
                      <p className="text-sm text-gray-900">
                        {getNotificationText(notification)}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </p>
                  </div>

                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
