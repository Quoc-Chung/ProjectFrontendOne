import Blog from "@/components/client/Blog";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog | NextCommerce Nextjs E-commerce template",
  description: "Blog về sản phẩm công nghệ, hiệu năng máy tính",
};

const BlogPage = () => {
  return (
    <main>
      <Blog />
    </main>
  );
};

export default BlogPage;

