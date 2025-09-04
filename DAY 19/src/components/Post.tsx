import React, { useState } from 'react';
import { Post as PostType, User } from '../types';
import { useStore } from '../store/useStore';
import { Heart, MessageCircle, Share, MoreHorizontal, Edit, Trash2, Flag } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

interface PostProps {
  post: PostType;
  author: User;
  showActions?: boolean;
}

export function Post({ post, author, showActions = true }: PostProps) {
  const { currentUser, likePost, unlikePost, deletePost, addComment } = useStore();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(
    currentUser ? post.likes.includes(currentUser.id) : false
  );

  const handleLike = () => {
    if (!currentUser) return;
    
    if (isLiked) {
      unlikePost(post.id, currentUser.id);
      setIsLiked(false);
    } else {
      likePost(post.id, currentUser.id);
      setIsLiked(true);
    }
  };

  const handleComment = () => {
    if (!currentUser || !newComment.trim()) return;

    const comment = {
      id: Date.now().toString(),
      postId: post.id,
      authorId: currentUser.id,
      content: newComment.trim(),
      likes: [],
      replies: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addComment(comment);
    setNewComment('');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(post.id);
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

  const isOwnPost = currentUser?.id === post.authorId;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
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
          <div>
            <div className="flex items-center space-x-1">
              <h3 className="font-semibold text-gray-900">{author.displayName}</h3>
              {author.isVerified && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600">@{author.username}</p>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              {post.isEdited && ' • Edited'}
            </p>
          </div>
        </div>
        
        {isOwnPost && (
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
              <Edit size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full"
            >
              <Trash2 size={16} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
              <MoreHorizontal size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-gray-900 whitespace-pre-wrap">{post.content}</p>
        
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Post Actions */}
      {showActions && (
        <>
          <div className="flex items-center justify-between py-3 border-t border-gray-100">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all ${
                isLiked
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              <Heart size={18} className={isLiked ? 'fill-current' : ''} />
              <span className="text-sm font-medium">{post.likes.length}</span>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
            >
              <MessageCircle size={18} />
              <span className="text-sm font-medium">{post.comments.length}</span>
            </button>

            <button className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all">
              <Share size={18} />
              <span className="text-sm font-medium">{post.shares}</span>
            </button>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="border-t border-gray-100 pt-4">
              {/* Add Comment */}
              {currentUser && (
                <div className="flex space-x-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0">
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
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={2}
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={handleComment}
                        disabled={!newComment.trim()}
                        className="px-4 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-4">
                {post.comments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

interface CommentItemProps {
  comment: any;
}

function CommentItem({ comment }: CommentItemProps) {
  const { users, currentUser, likeComment, unlikeComment } = useStore();
  const author = users.find(u => u.id === comment.authorId);
  const [isLiked, setIsLiked] = useState(
    currentUser ? comment.likes.includes(currentUser.id) : false
  );

  if (!author) return null;

  const handleLike = () => {
    if (!currentUser) return;
    
    if (isLiked) {
      unlikeComment(comment.id, currentUser.id);
      setIsLiked(false);
    } else {
      likeComment(comment.id, currentUser.id);
      setIsLiked(true);
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
    <div className="flex space-x-3">
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
      <div className="flex-1">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium text-gray-900">{author.displayName}</span>
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </span>
          </div>
          <p className="text-gray-700 text-sm">{comment.content}</p>
        </div>
        <div className="flex items-center space-x-4 mt-2 ml-3">
          <button
            onClick={handleLike}
            className={`text-xs transition-all ${
              isLiked
                ? 'text-red-600'
                : 'text-gray-500 hover:text-red-600'
            }`}
          >
            {isLiked ? '❤️' : '🤍'} {comment.likes.length}
          </button>
          <button className="text-xs text-gray-500 hover:text-gray-700">
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}
