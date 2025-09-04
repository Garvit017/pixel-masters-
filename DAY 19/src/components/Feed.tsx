import React from 'react';
import { useStore } from '../store/useStore';
import { Post } from './Post';
import { CreatePost } from './CreatePost';

export function Feed() {
  const { getFeed, users } = useStore();
  const feedPosts = getFeed();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Create Post */}
      <CreatePost />

      {/* Feed Posts */}
      <div className="space-y-6">
        {feedPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600">Start following people to see their posts in your feed!</p>
          </div>
        ) : (
          feedPosts.map((post) => {
            const author = users.find(user => user.id === post.authorId);
            if (!author) return null;
            
            return (
              <Post
                key={post.id}
                post={post}
                author={author}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
