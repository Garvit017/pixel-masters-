import React from 'react';
import { useStore } from '../store/useStore';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function TrendingPosts() {
  const { getTrendingPosts, users } = useStore();
  const trendingPosts = getTrendingPosts().slice(0, 5);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-4">
      {trendingPosts.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">
            <TrendingUp className="w-8 h-8 mx-auto" />
          </div>
          <p className="text-sm text-gray-600">No trending posts yet</p>
        </div>
      ) : (
        trendingPosts.map((post) => {
          const author = users.find(user => user.id === post.authorId);
          if (!author) return null;

          return (
            <div key={post.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0">
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
                  <div className="flex items-center space-x-1 mb-1">
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {author.displayName}
                    </span>
                    {author.isVerified && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                    {post.content}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{post.likes.length} likes</span>
                    <span>{post.comments.length} comments</span>
                    <span>{post.shares} shares</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
