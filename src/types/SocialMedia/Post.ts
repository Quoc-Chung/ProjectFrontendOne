export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface Post {
  id: string;
  content: string;
  images?: string[];
  videos?: string[];
  author: User;
  createdAt: string;
  updatedAt: string;
  reactions: Reaction[];
  comments: Comment[];
  shares: number;
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  postId: string;
  createdAt: string;
  updatedAt: string;
  reactions: Reaction[];
}

export interface Reaction {
  id: string;
  type: 'like' | 'love' | 'haha' | 'sad' | 'angry';
  user: User;
  postId?: string;
  commentId?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'share' | 'mention';
  title: string;
  content: string;
  user: User;
  postId?: string;
  commentId?: string;
  isRead: boolean;
  createdAt: string;
}

export interface CreatePostRequest {
  content: string;
  images?: File[];
  videos?: File[];
}

export interface CreateCommentRequest {
  content: string;
  postId: string;
}

export interface CreateReactionRequest {
  type: 'like' | 'love' | 'haha' | 'sad' | 'angry';
  postId?: string;
  commentId?: string;
}
