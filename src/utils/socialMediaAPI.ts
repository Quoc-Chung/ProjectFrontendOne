import {
  Post,
  Notification,
  CreatePostRequest,
  CreateCommentRequest,
  CreateReactionRequest,
} from '@/types/SocialMedia/Post';

// TODO: Update với API base URL thực tế khi backend sẵn sàng
const API_BASE_URL = "http://103.90.225.90:8080/services/social-service/api";

/**
 * Social Media API Service
 * Xử lý các API calls liên quan đến social media features
 */
export const socialMediaAPI = {
  /**
   * Lấy danh sách bài viết
   */
  async getPosts(): Promise<Post[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Return empty array để app không crash khi build
      return [];
    }
  },

  /**
   * Tạo bài viết mới
   */
  async createPost(postData: CreatePostRequest): Promise<Post> {
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

      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  /**
   * Toggle reaction (like, love, etc.)
   */
  async toggleReaction(reactionData: CreateReactionRequest): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${reactionData.postId}/reactions`, {
        method: reactionData.postId ? 'POST' : 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: reactionData.type,
          postId: reactionData.postId,
          commentId: reactionData.commentId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error toggling reaction:', error);
      throw error;
    }
  },

  /**
   * Tạo comment cho bài viết
   */
  async createComment(commentData: CreateCommentRequest): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${commentData.postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: commentData.content,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  },

  /**
   * Lấy danh sách thông báo
   */
  async getNotifications(): Promise<Notification[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Return empty array để app không crash khi build
      return [];
    }
  },

  /**
   * Đánh dấu thông báo đã đọc
   */
  async markNotificationAsRead(notificationId: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  /**
   * Đánh dấu tất cả thông báo đã đọc
   */
  async markAllNotificationsAsRead(): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/read-all`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  },
};

