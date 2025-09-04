import React from 'react';
import { useStore } from '../store/useStore';
import { Home, Search, Bell, Mail, Bookmark, User, Settings, LogOut, TrendingUp, Users } from 'lucide-react';

export function Sidebar() {
  const { currentUser, trendingTopics, users } = useStore();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const sidebarItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Search, label: 'Explore', active: false },
    { icon: Bell, label: 'Notifications', active: false },
    { icon: Mail, label: 'Messages', active: false },
    { icon: Bookmark, label: 'Bookmarks', active: false },
    { icon: User, label: 'Profile', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  const suggestedUsers = users
    .filter(user => user.id !== currentUser?.id)
    .slice(0, 5);

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600">SocialHub</h1>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <button
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    item.active
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Trending Topics */}
      <div className="p-4 border-t border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
          <TrendingUp size={16} className="mr-2" />
          Trending
        </h3>
        <div className="space-y-2">
          {trendingTopics.slice(0, 5).map((topic) => (
            <div key={topic.id} className="flex items-center justify-between">
              <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                #{topic.tag}
              </span>
              <span className="text-xs text-gray-500">{topic.postsCount}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Users */}
      <div className="p-4 border-t border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
          <Users size={16} className="mr-2" />
          Suggested for you
        </h3>
        <div className="space-y-3">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.displayName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  getInitials(user.displayName)
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.displayName}
                </p>
                <p className="text-xs text-gray-500">@{user.username}</p>
              </div>
              <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* User Profile */}
      {currentUser && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.displayName}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                getInitials(currentUser.displayName)
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {currentUser.displayName}
              </p>
              <p className="text-xs text-gray-500">@{currentUser.username}</p>
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
