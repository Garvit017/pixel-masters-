import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Sidebar } from './Sidebar';
import { Feed } from './Feed';
import { Notifications } from './Notifications';
import { TrendingPosts } from './TrendingPosts';
import { SearchBar } from './SearchBar';
import { Home, Bell, TrendingUp, Search } from 'lucide-react';

type TabType = 'home' | 'notifications' | 'trending' | 'search';

export function Dashboard() {
  const { currentUser } = useStore();
  const [activeTab, setActiveTab] = useState<TabType>('home');

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to SocialHub</h1>
          <p className="text-gray-600">Please log in to continue</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Feed />;
      case 'notifications':
        return <Notifications />;
      case 'trending':
        return <TrendingPosts />;
      case 'search':
        return <SearchBar />;
      default:
        return <Feed />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Content Area */}
          <div className="flex-1 max-w-4xl mx-auto">
            {/* Mobile Navigation */}
            <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'home'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Home size={18} />
                  <span className="text-sm font-medium">Home</span>
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'notifications'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Bell size={18} />
                  <span className="text-sm font-medium">Notifications</span>
                </button>
                <button
                  onClick={() => setActiveTab('trending')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'trending'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <TrendingUp size={18} />
                  <span className="text-sm font-medium">Trending</span>
                </button>
                <button
                  onClick={() => setActiveTab('search')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'search'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Search size={18} />
                  <span className="text-sm font-medium">Search</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {renderContent()}
            </div>
          </div>

          {/* Right Sidebar - Desktop Only */}
          <div className="hidden lg:block w-80 bg-white border-l border-gray-200 p-6">
            <div className="space-y-6">
              {/* Search */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Search</h3>
                <SearchBar />
              </div>

              {/* Trending Posts */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Trending Posts</h3>
                <TrendingPosts />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
