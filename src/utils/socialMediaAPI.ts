import { BASE_API_URL } from './configAPI';
import type { Post, CreatePostRequest, CreateCommentRequest, CreateReactionRequest, Comment, Notification } from '@/types/SocialMedia/Post';
import { getCookie } from './cookies';

// Helper function to get auth token
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return getCookie('token');
  }
  return null;
};

// Helper function to make API calls
const apiCall = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.data || data;
};

export const socialMediaAPI = {
  // Get all posts
  getPosts: async (): Promise<Post[]> => {
    try {
      return await apiCall<Post[]>('/api/social/posts');
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },
  createPost: async (postData: CreatePostRequest): Promise<Post> => {
    try {
      const formData = new FormData();
      formData.append('content', postData.content);
      
      if (postData.images) {
        postData.images.forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });
      }
      
      if (postData.videos) {
        postData.videos.forEach((video, index) => {
          formData.append(`videos[${index}]`, video);
        });
      }

      const token = getAuthToken();
      const headers: HeadersInit = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${BASE_API_URL}/api/social/posts`, {
        method: 'POST',
        headers,
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  // Get post by ID
  getPostById: async (postId: string): Promise<Post> => {
    try {
      return await apiCall<Post>(`/api/social/posts/${postId}`);
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  },

  // Delete a post
  deletePost: async (postId: string): Promise<void> => {
    try {
      await apiCall(`/api/social/posts/${postId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  },

  // Create a comment
  createComment: async (commentData: CreateCommentRequest): Promise<Comment> => {
    try {
      return await apiCall<Comment>('/api/social/comments', {
        method: 'POST',
        body: JSON.stringify(commentData),
      });
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  },

  // Delete a comment
  deleteComment: async (commentId: string): Promise<void> => {
    try {
      await apiCall(`/api/social/comments/${commentId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  },

  // Toggle reaction (like/unlike)
  toggleReaction: async (reactionData: CreateReactionRequest): Promise<void> => {
    try {
      await apiCall('/api/social/reactions', {
        method: 'POST',
        body: JSON.stringify(reactionData),
      });
    } catch (error) {
      console.error('Error toggling reaction:', error);
      throw error;
    }
  },

  // Get notifications
  getNotifications: async (): Promise<Notification[]> => {
    try {
      return await apiCall<Notification[]>('/api/social/notifications');
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  // Mark notification as read
  markNotificationAsRead: async (notificationId: string): Promise<void> => {
    try {
      await apiCall(`/api/social/notifications/${notificationId}/read`, {
        method: 'PUT',
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },
  markAllNotificationsAsRead: async (): Promise<void> => {
    try {
      await apiCall('/api/social/notifications/read-all', {
        method: 'PUT',
      });
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  },
};

export default socialMediaAPI;

