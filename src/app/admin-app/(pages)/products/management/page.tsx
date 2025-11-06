"use client";

import React, { useEffect } from "react";
import ProductManagement from "../../../../../components/server/ProductManagement";

const ProductPage = () => {
  useEffect(() => {
    document.title = "NextCommerce | Quản lý sản phẩm";
  }, []);

  return <ProductManagement />;
};

export default ProductPage;
