"use client";

import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface CommentFormProps {
  postId: string;
  onSubmit: (postId: string, content: string) => Promise<void>;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, onSubmit }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast.error('Vui lòng nhập nội dung bình luận!');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(postId, content.trim());
      setContent('');
      toast.success('Bình luận thành công!');
    } catch (error) {
      toast.error('Có lỗi xảy ra khi bình luận!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-3">
      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
        U
      </div>
      <div className="flex-1">
        <div className="relative">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Viết bình luận..."
            className="w-full px-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Gửi'
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
