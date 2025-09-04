import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Post, Comment, Notification, TrendingTopic, SocialState } from '../types';
import { mockUsers, mockPosts, mockComments, mockNotifications, mockTrendingTopics } from '../data/mockData';

interface SocialStore extends SocialState {
  // Actions
  setCurrentUser: (user: User | null) => void;
  addPost: (post: Post) => void;
  updatePost: (postId: string, updates: Partial<Post>) => void;
  deletePost: (postId: string) => void;
  likePost: (postId: string, userId: string) => void;
  unlikePost: (postId: string, userId: string) => void;
  addComment: (comment: Comment) => void;
  likeComment: (commentId: string, userId: string) => void;
  unlikeComment: (commentId: string, userId: string) => void;
  followUser: (userId: string, followerId: string) => void;
  unfollowUser: (userId: string, followerId: string) => void;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (notificationId: string) => void;
  updateUser: (userId: string, updates: Partial<User>) => void;
  getFeed: () => Post[];
  getTrendingPosts: () => Post[];
  getUserPosts: (userId: string) => Post[];
  getPostComments: (postId: string) => Comment[];
  getUserNotifications: (userId: string) => Notification[];
}

export const useStore = create<SocialStore>()(
  persist(
    (set, get) => ({
      // Initial state
      posts: mockPosts,
      users: mockUsers,
      notifications: mockNotifications,
      trendingTopics: mockTrendingTopics,
      currentUser: mockUsers[0], // Default to first user
      feed: [],

      // Actions
      setCurrentUser: (user) => set({ currentUser: user }),

      addPost: (post) => set((state) => ({
        posts: [post, ...state.posts],
        users: state.users.map(user =>
          user.id === post.authorId
            ? { ...user, posts: [...user.posts, post.id] }
            : user
        ),
      })),

      updatePost: (postId, updates) => set((state) => ({
        posts: state.posts.map(post =>
          post.id === postId
            ? { ...post, ...updates, updatedAt: new Date() }
            : post
        ),
      })),

      deletePost: (postId) => set((state) => ({
        posts: state.posts.filter(post => post.id !== postId),
        users: state.users.map(user =>
          user.id === state.currentUser?.id
            ? { ...user, posts: user.posts.filter(id => id !== postId) }
            : user
        ),
      })),

      likePost: (postId, userId) => set((state) => ({
        posts: state.posts.map(post =>
          post.id === postId
            ? {
                ...post,
                likes: post.likes.includes(userId)
                  ? post.likes
                  : [...post.likes, userId]
              }
            : post
        ),
      })),

      unlikePost: (postId, userId) => set((state) => ({
        posts: state.posts.map(post =>
          post.id === postId
            ? {
                ...post,
                likes: post.likes.filter(id => id !== userId)
              }
            : post
        ),
      })),

      addComment: (comment) => set((state) => ({
        posts: state.posts.map(post =>
          post.id === comment.postId
            ? { ...post, comments: [...post.comments, comment] }
            : post
        ),
      })),

      likeComment: (commentId, userId) => set((state) => ({
        posts: state.posts.map(post => ({
          ...post,
          comments: post.comments.map(comment =>
            comment.id === commentId
              ? {
                  ...comment,
                  likes: comment.likes.includes(userId)
                    ? comment.likes
                    : [...comment.likes, userId]
                }
              : comment
          ),
        })),
      })),

      unlikeComment: (commentId, userId) => set((state) => ({
        posts: state.posts.map(post => ({
          ...post,
          comments: post.comments.map(comment =>
            comment.id === commentId
              ? {
                  ...comment,
                  likes: comment.likes.filter(id => id !== userId)
                }
              : comment
          ),
        })),
      })),

      followUser: (userId, followerId) => set((state) => ({
        users: state.users.map(user => {
          if (user.id === userId) {
            return { ...user, followers: [...user.followers, followerId] };
          }
          if (user.id === followerId) {
            return { ...user, following: [...user.following, userId] };
          }
          return user;
        }),
      })),

      unfollowUser: (userId, followerId) => set((state) => ({
        users: state.users.map(user => {
          if (user.id === userId) {
            return { ...user, followers: user.followers.filter(id => id !== followerId) };
          }
          if (user.id === followerId) {
            return { ...user, following: user.following.filter(id => id !== userId) };
          }
          return user;
        }),
      })),

      addNotification: (notification) => set((state) => ({
        notifications: [notification, ...state.notifications],
      })),

      markNotificationAsRead: (notificationId) => set((state) => ({
        notifications: state.notifications.map(notification =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
        ),
      })),

      updateUser: (userId, updates) => set((state) => ({
        users: state.users.map(user =>
          user.id === userId ? { ...user, ...updates } : user
        ),
        currentUser: state.currentUser?.id === userId
          ? { ...state.currentUser, ...updates }
          : state.currentUser,
      })),

      // Getters
      getFeed: () => {
        const state = get();
        const currentUser = state.currentUser;
        if (!currentUser) return [];

        const followingIds = currentUser.following;
        return state.posts
          .filter(post => followingIds.includes(post.authorId) || post.authorId === currentUser.id)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      },

      getTrendingPosts: () => {
        const state = get();
        return state.posts
          .sort((a, b) => (b.likes.length + b.shares) - (a.likes.length + a.shares))
          .slice(0, 10);
      },

      getUserPosts: (userId) => {
        const state = get();
        return state.posts
          .filter(post => post.authorId === userId)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      },

      getPostComments: (postId) => {
        const state = get();
        const post = state.posts.find(p => p.id === postId);
        return post ? post.comments : [];
      },

      getUserNotifications: (userId) => {
        const state = get();
        return state.notifications
          .filter(notification => notification.userId === userId)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      },
    }),
    {
      name: 'social-media-storage',
      partialize: (state) => ({
        currentUser: state.currentUser,
        posts: state.posts,
        users: state.users,
        notifications: state.notifications,
      }),
    }
  )
);
