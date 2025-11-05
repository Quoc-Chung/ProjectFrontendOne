import BlogDetail from "@/components/client/Blog/BlogDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết Blog | NextCommerce",
  description: "Đọc bài viết chi tiết về công nghệ và sản phẩm máy tính",
};

interface BlogDetailPageProps {
  params: {
    id: string;
  };
}

const BlogDetailPage = ({ params }: BlogDetailPageProps) => {
  return <BlogDetail blogId={params.id} />;
};

export default BlogDetailPage;

