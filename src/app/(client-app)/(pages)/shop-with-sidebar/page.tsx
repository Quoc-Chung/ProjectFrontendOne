import React from "react";
import ShopWithSidebar from "@/components/client/ShopWithSidebar";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Cửa hàng | NextCommerce",
  description: "Trang cửa hàng NextCommerce - Xem tất cả sản phẩm",
};

const ShopWithSidebarPage = () => {
  return (
    <main>
      <ShopWithSidebar />
    </main>
  );
};

export default ShopWithSidebarPage;
