"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "../Common/Breadcrumb";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types/Client/Blog/BlogPost";

import { getAllBlogPosts } from "@/services/BlogService";

const Blog = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(getAllBlogPosts());
  
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    date: new Date().toISOString().split('T')[0],
    image: "",
    category: "CPU",
    readTime: "5 phút"
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Load blogs from localStorage on mount (client-side only)
  useEffect(() => {
    // getAllBlogPosts() already includes custom blogs from localStorage
    setBlogPosts(getAllBlogPosts());
  }, []);
  
  // Prefetch blog detail page khi hover
  const handleBlogHover = (postId: number | string) => {
    router.prefetch(`/blog/${postId}`);
  };

  const categories = ["all", "CPU", "GPU", "RAM", "Storage", "Build", "Comparison"];

  const filteredPosts = selectedCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert("Vui lòng chọn file ảnh!");
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Kích thước ảnh không được vượt quá 5MB!");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData(prev => ({ ...prev, image: base64String }));
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateReadTime = (content: string): string => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} phút`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.excerpt || !formData.content || !formData.author) {
      alert("Vui lòng điền đầy đủ các trường bắt buộc!");
      return;
    }

    // Create new blog post
    const newBlog: BlogPost = {
      id: Date.now(), // Simple ID generation
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      author: formData.author,
      date: formData.date,
      image: formData.image || "/images/item_blog/inter_core_i9.png", // Default image
      category: formData.category,
      views: 0,
      readTime: calculateReadTime(formData.content)
    };

    // Save to localStorage
    const savedBlogs = localStorage.getItem('customBlogs');
    const customBlogs = savedBlogs ? JSON.parse(savedBlogs) : [];
    customBlogs.push(newBlog);
    localStorage.setItem('customBlogs', JSON.stringify(customBlogs));

    // Reset form
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      date: new Date().toISOString().split('T')[0],
      image: "",
      category: "CPU",
      readTime: "5 phút"
    });
    setImagePreview(null);
    
    // Đóng form và reload danh sách blog
    setShowCreateForm(false);
    
    // Reload blogs từ service để đảm bảo đồng bộ
    setBlogPosts(getAllBlogPosts());
    
    alert("Tạo blog mới thành công!");
  };

  return (
    <>
      <Breadcrumb title={"Blog"} pages={["Blog"]} />

      {/* Create Blog Button - Top of page */}
      <div className="bg-gray-2 py-4">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex justify-end">
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 shadow-lg text-sm md:text-base whitespace-nowrap"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 md:h-5 md:w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline">Tạo blog mới</span>
              <span className="sm:hidden">Tạo mới</span>
            </button>
          </div>
        </div>
      </div>

      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-semibold text-3xl md:text-4xl text-dark mb-4">
              Blog Công Nghệ
            </h1>
            {/* Description */}
            <p className="text-gray-600 text-lg max-w-2xl">
              Khám phá thế giới công nghệ với những bài đánh giá chi tiết, hướng dẫn chọn lựa và so sánh hiệu năng của các sản phẩm máy tính hàng đầu
            </p>
          </div>

          {/* Category Filter */}
          {!showCreateForm && (
            <div className="flex flex-wrap gap-3 mb-10 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-lg border transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-dark border-gray-3 hover:border-blue-600 hover:text-blue-600"
                  }`}
                >
                  {category === "all" ? "Tất cả" : category}
                </button>
              ))}
            </div>
          )}

          {/* Blog Grid - Ẩn khi form đang hiển thị */}
          {!showCreateForm && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
                onMouseEnter={() => handleBlogHover(post.id)}
              >
                {/* Image */}
                <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{post.views} lượt xem</span>
                  </div>

                  <h2 className="font-semibold text-xl text-dark mb-3 group-hover:text-blue-600 transition-none line-clamp-2">
                    <Link 
                      href={`/blog/${post.id}`} 
                      prefetch={true}
                      scroll={false}
                      className="block"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                        {post.author.charAt(0)}
                      </div>
                      <span className="text-sm text-gray-600">{post.author}</span>
                    </div>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-none"
                      prefetch={true}
                      scroll={false}
                    >
                      Đọc thêm →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
            </div>
          )}

          {/* Empty State */}
          {!showCreateForm && filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Không tìm thấy bài viết nào trong danh mục này</p>
            </div>
          )}

          {/* Create Blog Form Modal Overlay */}
          {showCreateForm && (
            <div 
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-8 overflow-y-auto"
              onClick={(e) => {
                // Đóng form khi click vào overlay (không phải form content)
                if (e.target === e.currentTarget) {
                  setShowCreateForm(false);
                  setFormData({
                    title: "",
                    excerpt: "",
                    content: "",
                    author: "",
                    date: new Date().toISOString().split('T')[0],
                    image: "",
                    category: "CPU",
                    readTime: "5 phút"
                  });
                  setImagePreview(null);
                }
              }}
            >
              <div 
                className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => {
                    setShowCreateForm(false);
                    setFormData({
                      title: "",
                      excerpt: "",
                      content: "",
                      author: "",
                      date: new Date().toISOString().split('T')[0],
                      image: "",
                      category: "CPU",
                      readTime: "5 phút"
                    });
                    setImagePreview(null);
                  }}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <h2 className="text-2xl font-semibold text-dark mb-6">Tạo blog mới</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-dark font-medium mb-2">Tiêu đề blog *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-3 rounded-lg focus:outline-none focus:border-blue-600"
                    placeholder="Nhập tiêu đề blog..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-dark font-medium mb-2">Tóm tắt (Excerpt) *</label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-3 rounded-lg focus:outline-none focus:border-blue-600 resize-none"
                    placeholder="Nhập tóm tắt ngắn gọn về blog..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-dark font-medium mb-2">Nội dung blog *</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={10}
                    className="w-full px-4 py-3 border border-gray-3 rounded-lg focus:outline-none focus:border-blue-600 resize-none"
                    placeholder="Nhập nội dung chi tiết của blog..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-dark font-medium mb-2">Tác giả *</label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-3 rounded-lg focus:outline-none focus:border-blue-600"
                      placeholder="Nhập tên tác giả..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-dark font-medium mb-2">Danh mục</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-3 rounded-lg focus:outline-none focus:border-blue-600"
                    >
                      {categories.filter(cat => cat !== "all").map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-dark font-medium mb-2">Ngày đăng</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-3 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-dark font-medium mb-2">Ảnh blog</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-4 py-3 border border-gray-3 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                    <p className="text-sm text-gray-500 mt-1">Chọn ảnh từ máy tính (tối đa 5MB). Để trống để sử dụng ảnh mặc định</p>
                    {imagePreview && (
                      <div className="mt-4 relative w-full h-48 rounded-lg overflow-hidden border border-gray-3">
                        <Image 
                          src={imagePreview} 
                          alt="Preview" 
                          fill 
                          className="object-cover" 
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setFormData(prev => ({ ...prev, image: "" }));
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Tạo blog
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateForm(false);
                      setFormData({
                        title: "",
                        excerpt: "",
                        content: "",
                        author: "",
                        date: new Date().toISOString().split('T')[0],
                        image: "",
                        category: "CPU",
                        readTime: "5 phút"
                      });
                      setImagePreview(null);
                    }}
                    className="bg-gray-200 text-dark px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    Hủy
                  </button>
                </div>
              </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;

