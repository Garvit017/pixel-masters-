import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Search, Hash, User } from 'lucide-react';

export function SearchBar() {
  const { users, posts } = useStore();
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const filteredUsers = users.filter(user =>
    user.displayName.toLowerCase().includes(query.toLowerCase()) ||
    user.username.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(query.toLowerCase()) ||
    post.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(e.target.value.length > 0);
          }}
          onFocus={() => setShowResults(query.length > 0)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          placeholder="Search users, posts, or hashtags..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {query.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <Search className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm">Start typing to search...</p>
            </div>
          ) : (
            <div>
              {/* Users */}
              {filteredUsers.length > 0 && (
                <div className="border-b border-gray-200">
                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 flex items-center">
                      <User size={14} className="mr-2" />
                      Users
                    </h3>
                  </div>
                  {filteredUsers.slice(0, 5).map((user) => (
                    <div key={user.id} className="p-3 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center space-x-3">
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
                        {user.isVerified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Posts */}
              {filteredPosts.length > 0 && (
                <div>
                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 flex items-center">
                      <Hash size={14} className="mr-2" />
                      Posts
                    </h3>
                  </div>
                  {filteredPosts.slice(0, 5).map((post) => {
                    const author = users.find(u => u.id === post.authorId);
                    if (!author) return null;

                    return (
                      <div key={post.id} className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0">
                            {author.avatar ? (
                              <img
                                src={author.avatar}
                                alt={author.displayName}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              getInitials(author.displayName)
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 mb-1">
                              {author.displayName} • {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-700 line-clamp-2">
                              {post.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* No Results */}
              {filteredUsers.length === 0 && filteredPosts.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                  <Search className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">No results found for "{query}"</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
