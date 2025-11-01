"use client";
import React, { useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Image from "next/image";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  views: number;
  readTime: string;
}

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Fake data về sản phẩm máy tính và hiệu năng
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Đánh giá hiệu năng CPU Intel Core i9-14900K: Sức mạnh vượt trội",
      excerpt: "Intel Core i9-14900K với 24 lõi và tốc độ xung nhịp lên đến 6.0GHz mang lại hiệu năng xử lý đa nhiệm xuất sắc...",
      content: "Intel Core i9-14900K là flagship mới nhất của Intel với kiến trúc Raptor Lake Refresh. Với 8 Performance Cores và 16 Efficiency Cores, CPU này đạt được hiệu năng đa lõi vượt trội trong các tác vụ như render video, streaming, và gaming đồng thời. Trong bài test Cinebench R23, i9-14900K đạt điểm đa lõi hơn 38,000 điểm, cao hơn đáng kể so với thế hệ trước.",
      author: "Nguyễn Văn A",
      date: "2024-01-15",
      image: "/images/item_blog/inter_core_i9.png",
      category: "CPU",
      views: 1250,
      readTime: "5 phút"
    },
    {
      id: 2,
      title: "RTX 4090 vs RTX 4080: So sánh chi tiết hiệu năng gaming",
      excerpt: "RTX 4090 với 24GB VRAM và hiệu năng cao hơn 70% so với RTX 4080, nhưng liệu sự khác biệt có đáng giá?...",
      content: "RTX 4090 sử dụng kiến trúc Ada Lovelace với 16,384 CUDA cores và bộ nhớ GDDR6X 24GB. Trong các game AAA như Cyberpunk 2077 với ray tracing bật, RTX 4090 đạt trung bình 85 FPS ở 4K, trong khi RTX 4080 chỉ đạt 62 FPS. Sự khác biệt rõ rệt nhất ở độ phân giải 4K và khi bật DLSS 3.0.",
      author: "Trần Thị B",
      date: "2024-01-12",
      image: "/images/item_blog/rtx_4090.png",
      category: "GPU",
      views: 980,
      readTime: "7 phút"
    },
    {
      id: 3,
      title: "DDR5 vs DDR4: Lựa chọn RAM tốt nhất cho build PC 2024",
      excerpt: "RAM DDR5 với tốc độ lên đến 6400MHz mang lại hiệu năng tăng 15-20% so với DDR4 trong các tác vụ đa nhiệm...",
      content: "DDR5 không chỉ có tốc độ cao hơn mà còn tiêu thụ điện năng hiệu quả hơn với điện áp 1.1V so với 1.2V của DDR4. Trong bài test với 32GB DDR5-6000MHz, hệ thống hoàn thành render video Premiere Pro nhanh hơn 18% so với DDR4-3600MHz. Tuy nhiên, giá thành DDR5 vẫn cao hơn đáng kể.",
      author: "Lê Văn C",
      date: "2024-01-10",
      image: "/images/item_blog/ramddr5.png",
      category: "RAM",
      views: 1560,
      readTime: "6 phút"
    },
    {
      id: 4,
      title: "SSD NVMe Gen4 vs Gen3: Tốc độ đọc ghi thực tế",
      excerpt: "SSD NVMe PCIe 4.0 với tốc độ đọc 7,000MB/s gấp đôi so với Gen3, nhưng liệu có đáng nâng cấp?...",
      content: "SSD NVMe Gen4 như Samsung 990 Pro đạt tốc độ đọc tuần tự 7,450MB/s và ghi 6,900MB/s, trong khi Gen3 chỉ đạt khoảng 3,500MB/s. Sự khác biệt rõ rệt nhất khi khởi động hệ thống, load game, và xử lý file lớn. Thời gian boot từ 15 giây giảm xuống còn 8 giây với Gen4.",
      author: "Phạm Thị D",
      date: "2024-01-08",
      image: "/images/item_blog/ssd.png",
      category: "Storage",
      views: 2100,
      readTime: "4 phút"
    },
    {
      id: 5,
      title: "Cấu hình PC tối ưu cho Content Creator: Build giá dưới 50 triệu",
      excerpt: "Build PC với Ryzen 9 7900X, RTX 4070, và 32GB RAM để xử lý mượt mà các tác vụ video editing và streaming...",
      content: "Cấu hình tối ưu bao gồm: CPU Ryzen 9 7900X (12 lõi/24 luồng) - 12.5 triệu, GPU RTX 4070 12GB - 18 triệu, RAM DDR5-5600 32GB - 6 triệu, SSD NVMe 1TB - 3.5 triệu, Mainboard B650 - 5 triệu, và các linh kiện khác. Tổng giá khoảng 48 triệu, đủ sức xử lý 4K video editing và streaming đồng thời.",
      author: "Hoàng Văn E",
      date: "2024-01-05",
      image: "/images/item_blog/ryzen9.png",
      category: "Build",
      views: 3200,
      readTime: "8 phút"
    },
    {
      id: 6,
      title: "Laptop Gaming vs Desktop: Hiệu năng và tính di động",
      excerpt: "Laptop gaming RTX 4080 có hiệu năng bằng 80% desktop tương ứng, nhưng giá cao hơn và khó nâng cấp...",
      content: "Laptop RTX 4080 Mobile có hiệu năng tương đương RTX 4070 Desktop do bị giới hạn về TDP (175W vs 285W). Trong game, laptop thường chạy chậm hơn 15-25% so với desktop cùng cấp. Tuy nhiên, laptop mang lại tính di động và không cần màn hình ngoài. Desktop dễ nâng cấp và có hiệu năng tốt hơn về lâu dài.",
      author: "Đỗ Thị F",
      date: "2024-01-03",
      image: "/images/item_blog/laptop gameing.png",
      category: "Comparison",
      views: 890,
      readTime: "6 phút"
    }
  ];

  const categories = ["all", "CPU", "GPU", "RAM", "Storage", "Build", "Comparison"];

  const filteredPosts = selectedCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <>
      <Breadcrumb title={"Blog"} pages={["Blog"]} />

      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-semibold text-3xl md:text-4xl text-dark mb-4">
              Blog Công Nghệ
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Khám phá thế giới công nghệ với những bài đánh giá chi tiết, hướng dẫn chọn lựa và so sánh hiệu năng của các sản phẩm máy tính hàng đầu
            </p>
          </div>

          {/* Category Filter */}
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

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
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

                  <h2 className="font-semibold text-xl text-dark mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    <Link href={`/blog/${post.id}`} prefetch={true}>
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
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      prefetch={true}
                    >
                      Đọc thêm →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Không tìm thấy bài viết nào trong danh mục này</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;

