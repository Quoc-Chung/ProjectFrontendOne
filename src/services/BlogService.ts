import { BlogPost } from "@/types/Client/Blog/BlogPost";

// Helper function to get custom blogs from localStorage (client-side only)
const getCustomBlogs = (): BlogPost[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const savedBlogs = localStorage.getItem('customBlogs');
    return savedBlogs ? JSON.parse(savedBlogs) : [];
  } catch (e) {
    console.error('Error loading custom blogs:', e);
    return [];
  }
};

// Fake data - trong thực tế sẽ fetch từ API
const getDefaultBlogPosts = (): BlogPost[] => {
  return [
    {
      id: 1,
      title: "Đánh giá hiệu năng CPU Intel Core i9-14900K: Sức mạnh vượt trội",
      excerpt: "Intel Core i9-14900K với 24 lõi và tốc độ xung nhịp lên đến 6.0GHz mang lại hiệu năng xử lý đa nhiệm xuất sắc...",
      content: `Intel Core i9-14900K là flagship mới nhất của Intel với kiến trúc Raptor Lake Refresh. Với 8 Performance Cores và 16 Efficiency Cores, CPU này đạt được hiệu năng đa lõi vượt trội trong các tác vụ như render video, streaming, và gaming đồng thời.

Trong bài test Cinebench R23, i9-14900K đạt điểm đa lõi hơn 38,000 điểm, cao hơn đáng kể so với thế hệ trước. Điểm đơn lõi cũng vượt 2,100 điểm, cho thấy hiệu năng gaming tuyệt vời.

Về nhiệt độ và tiêu thụ điện, khi chạy full load, CPU có thể tiêu thụ tới 250W và nhiệt độ lên đến 95°C. Tuy nhiên, với một bộ tản nhiệt AIO 240mm chất lượng tốt, bạn có thể giữ nhiệt độ ở mức 85°C trong các tác vụ nặng.

Hiệu năng gaming của i9-14900K là xuất sắc, đặc biệt ở 1080p và 1440p. Trong các game như Cyberpunk 2077, CPU đạt trung bình 180 FPS ở 1080p Ultra, cao hơn 15% so với i9-13900K.

Kết luận: Intel Core i9-14900K là lựa chọn tuyệt vời cho những người dùng cần hiệu năng tối đa trong cả gaming và content creation. Tuy giá thành cao, nhưng hiệu năng mà nó mang lại là xứng đáng.`,
      author: "Nguyễn Minh Tuấn",
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
      content: `RTX 4090 sử dụng kiến trúc Ada Lovelace với 16,384 CUDA cores và bộ nhớ GDDR6X 24GB. Trong các game AAA như Cyberpunk 2077 với ray tracing bật, RTX 4090 đạt trung bình 85 FPS ở 4K, trong khi RTX 4080 chỉ đạt 62 FPS. Sự khác biệt rõ rệt nhất ở độ phân giải 4K và khi bật DLSS 3.0.

Về hiệu năng, RTX 4090 nhanh hơn RTX 4080 khoảng 30-40% ở 4K, và 20-25% ở 1440p. Tuy nhiên, giá thành của RTX 4090 cao hơn gần gấp đôi.

Kết luận: Nếu bạn chơi game ở 4K và muốn hiệu năng tối đa, RTX 4090 là lựa chọn tốt. Còn nếu bạn chơi ở 1440p hoặc muốn tiết kiệm chi phí, RTX 4080 vẫn là lựa chọn hợp lý.`,
      author: "Trần Thị Hương",
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
      content: `DDR5 không chỉ có tốc độ cao hơn mà còn tiêu thụ điện năng hiệu quả hơn với điện áp 1.1V so với 1.2V của DDR4. Trong bài test với 32GB DDR5-6000MHz, hệ thống hoàn thành render video Premiere Pro nhanh hơn 18% so với DDR4-3600MHz. Tuy nhiên, giá thành DDR5 vẫn cao hơn đáng kể.

Về gaming, sự khác biệt không quá lớn, chỉ khoảng 5-10% FPS. Nhưng trong các tác vụ content creation, DDR5 thể hiện rõ ưu thế.

Kết luận: Nếu bạn là content creator hoặc làm việc với các ứng dụng nặng, DDR5 là lựa chọn tốt. Còn nếu chỉ gaming, DDR4 vẫn đủ dùng và tiết kiệm chi phí.`,
      author: "Lê Đức Anh",
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
      content: `SSD NVMe Gen4 như Samsung 990 Pro đạt tốc độ đọc tuần tự 7,450MB/s và ghi 6,900MB/s, trong khi Gen3 chỉ đạt khoảng 3,500MB/s. Sự khác biệt rõ rệt nhất khi khởi động hệ thống, load game, và xử lý file lớn. Thời gian boot từ 15 giây giảm xuống còn 8 giây với Gen4.

Trong gaming, thời gian load game giảm khoảng 20-30% so với Gen3. Tuy nhiên, trong các tác vụ hàng ngày, sự khác biệt không quá lớn.

Kết luận: Gen4 mang lại trải nghiệm tốt hơn rõ rệt, đặc biệt khi làm việc với file lớn. Nếu budget cho phép, nên đầu tư Gen4.`,
      author: "Phạm Thị Lan",
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
      content: `Cấu hình tối ưu bao gồm: CPU Ryzen 9 7900X (12 lõi/24 luồng) - 12.5 triệu, GPU RTX 4070 12GB - 18 triệu, RAM DDR5-5600 32GB - 6 triệu, SSD NVMe 1TB - 3.5 triệu, Mainboard B650 - 5 triệu, và các linh kiện khác. Tổng giá khoảng 48 triệu, đủ sức xử lý 4K video editing và streaming đồng thời.

Với cấu hình này, bạn có thể render video 4K trong Premiere Pro với thời gian hợp lý, stream game ở 1080p 60fps, và chạy nhiều ứng dụng cùng lúc mà không lag.

Kết luận: Đây là build PC giá trị tốt cho content creator, cân bằng giữa hiệu năng và giá thành.`,
      author: "Hoàng Văn Đức",
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
      content: `Laptop RTX 4080 Mobile có hiệu năng tương đương RTX 4070 Desktop do bị giới hạn về TDP (175W vs 285W). Trong game, laptop thường chạy chậm hơn 15-25% so với desktop cùng cấp. Tuy nhiên, laptop mang lại tính di động và không cần màn hình ngoài. Desktop dễ nâng cấp và có hiệu năng tốt hơn về lâu dài.

Về giá thành, laptop gaming thường đắt hơn desktop tương đương khoảng 20-30%. Nhưng nếu bạn cần tính di động, laptop là lựa chọn duy nhất.

Kết luận: Chọn desktop nếu bạn chủ yếu chơi game ở nhà và muốn hiệu năng tối đa. Chọn laptop nếu bạn cần tính di động.`,
      author: "Đỗ Thị Mai",
      date: "2024-01-03",
      image: "/images/item_blog/laptop gameing.png",
      category: "Comparison",
      views: 890,
      readTime: "6 phút"
    }
  ];
};

// Get all blog posts including custom ones from localStorage
export const getAllBlogPosts = (): BlogPost[] => {
  const defaultPosts = getDefaultBlogPosts();
  const customPosts = getCustomBlogs();
  return [...defaultPosts, ...customPosts];
};

export const getBlogPostById = (id: number): BlogPost | undefined => {
  return getAllBlogPosts().find(post => post.id === id);
};

export const getRelatedPosts = (category: string, excludeId: number, limit: number = 3): BlogPost[] => {
  const allPosts = getAllBlogPosts();
  const related = allPosts
    .filter(post => post.category === category && post.id !== excludeId)
    .slice(0, limit);
  
  if (related.length < limit) {
    const otherPosts = allPosts
      .filter(post => post.id !== excludeId && !related.includes(post))
      .slice(0, limit - related.length);
    return [...related, ...otherPosts];
  }
  
  return related;
};

