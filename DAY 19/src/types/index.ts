export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar?: string;
  bio?: string;
  followers: string[];
  following: string[];
  posts: string[];
  createdAt: Date;
  isVerified?: boolean;
  location?: string;
  website?: string;
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  images?: string[];
  likes: string[];
  comments: Comment[];
  shares: number;
  createdAt: Date;
  updatedAt: Date;
  isEdited?: boolean;
  tags?: string[];
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  likes: string[];
  replies: Comment[];
  createdAt: Date;
  updatedAt: Date;
  parentId?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  fromUserId: string;
  postId?: string;
  commentId?: string;
  isRead: boolean;
  createdAt: Date;
}

export interface FeedItem {
  id: string;
  type: 'post' | 'follow' | 'like';
  user: User;
  post?: Post;
  timestamp: Date;
}

export interface TrendingTopic {
  id: string;
  tag: string;
  postsCount: number;
  trend: 'up' | 'down' | 'stable';
}

export interface DashboardStats {
  totalPosts: number;
  totalLikes: number;
  totalComments: number;
  totalFollowers: number;
  engagementRate: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface SocialState {
  posts: Post[];
  users: User[];
  notifications: Notification[];
  trendingTopics: TrendingTopic[];
  currentUser: User | null;
  feed: FeedItem[];
}
