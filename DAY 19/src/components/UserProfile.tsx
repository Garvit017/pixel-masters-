import React, { useState } from 'react';
import { User } from '../types';
import { useStore } from '../store/useStore';
import { Heart, MessageCircle, Share, MoreHorizontal, Edit, UserPlus, UserMinus, MapPin, Link, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface UserProfileProps {
  user: User;
  isOwnProfile?: boolean;
}

export function UserProfile({ user, isOwnProfile = false }: UserProfileProps) {
  const { currentUser, followUser, unfollowUser, getUserPosts } = useStore();
  const [isFollowing, setIsFollowing] = useState(
    currentUser?.following.includes(user.id) || false
  );
  const [showEditModal, setShowEditModal] = useState(false);

  const userPosts = getUserPosts(user.id);
  const isCurrentUserFollowing = currentUser?.following.includes(user.id) || false;

  const handleFollow = () => {
    if (!currentUser) return;
    
    if (isFollowing) {
      unfollowUser(user.id, currentUser.id);
      setIsFollowing(false);
    } else {
      followUser(user.id, currentUser.id);
      setIsFollowing(true);
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Cover Photo */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
        {isOwnProfile && (
          <button
            onClick={() => setShowEditModal(true)}
            className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white hover:bg-opacity-30 transition-all"
          >
            <Edit size={16} />
          </button>
        )}
      </div>

      {/* Profile Info */}
      <div className="px-6 pb-6 -mt-16 relative">
        {/* Avatar */}
        <div className="flex items-end space-x-4">
          <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600">
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
          
          {/* Follow Button */}
          {!isOwnProfile && currentUser && (
            <button
              onClick={handleFollow}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                isCurrentUserFollowing
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isCurrentUserFollowing ? (
                <>
                  <UserMinus size={16} className="inline mr-2" />
                  Following
                </>
              ) : (
                <>
                  <UserPlus size={16} className="inline mr-2" />
                  Follow
                </>
              )}
            </button>
          )}
        </div>

        {/* User Details */}
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-gray-900">{user.displayName}</h1>
            {user.isVerified && (
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          
          <p className="text-gray-600">@{user.username}</p>
          
          {user.bio && (
            <p className="mt-2 text-gray-700">{user.bio}</p>
          )}

          {/* Additional Info */}
          <div className="mt-3 space-y-1">
            {user.location && (
              <div className="flex items-center text-sm text-gray-600">
                <MapPin size={14} className="mr-2" />
                {user.location}
              </div>
            )}
            {user.website && (
              <div className="flex items-center text-sm text-gray-600">
                <Link size={14} className="mr-2" />
                <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {user.website}
                </a>
              </div>
            )}
            <div className="flex items-center text-sm text-gray-600">
              <Calendar size={14} className="mr-2" />
              Joined {format(user.createdAt, 'MMMM yyyy')}
            </div>
          </div>

          {/* Stats */}
          <div className="flex space-x-6 mt-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{userPosts.length}</div>
              <div className="text-sm text-gray-600">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{user.followers.length}</div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{user.following.length}</div>
              <div className="text-sm text-gray-600">Following</div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}

interface EditProfileModalProps {
  user: User;
  onClose: () => void;
}

function EditProfileModal({ user, onClose }: EditProfileModalProps) {
  const { updateUser } = useStore();
  const [formData, setFormData] = useState({
    displayName: user.displayName,
    bio: user.bio || '',
    location: user.location || '',
    website: user.website || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(user.id, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Profile</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us about yourself..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="City, Country"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
