import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Image, Hash, Smile, Send } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export function CreatePost() {
  const { currentUser, addPost } = useStore();
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !currentUser) return;

    const post = {
      id: uuidv4(),
      authorId: currentUser.id,
      content: content.trim(),
      likes: [],
      comments: [],
      shares: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: extractTags(content),
    };

    addPost(post);
    setContent('');
    setIsExpanded(false);
  };

  const extractTags = (text: string): string[] => {
    const tagRegex = /#(\w+)/g;
    const matches = text.match(tagRegex);
    return matches ? matches.map(tag => tag.substring(1)) : [];
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!currentUser) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-3">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600 flex-shrink-0">
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
          
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="What's on your mind?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={isExpanded ? 4 : 2}
            />
            
            {isExpanded && (
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Image size={20} />
                    <span className="text-sm">Photo</span>
                  </button>
                  
                  <button
                    type="button"
                    className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <Hash size={20} />
                    <span className="text-sm">Tag</span>
                  </button>
                  
                  <button
                    type="button"
                    className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors"
                  >
                    <Smile size={20} />
                    <span className="text-sm">Emoji</span>
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setContent('');
                      setIsExpanded(false);
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!content.trim()}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send size={16} />
                    <span>Post</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
