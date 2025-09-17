"use client";

import React, { useState } from "react";
import { Product } from "../../../../../types/Admin";
import ProductManagement from "../../../../../components/server/ProductManagement";
import { mockProducts } from "../../../../../utils/mockData";

const ProductPage = () => {
    const [products, setProducts] = useState<Product[]>(mockProducts);

  const handleDelete = (id: string) => {
    
  };

  return (
    <ProductManagement
      products={products}
      onDeleteProduct={handleDelete}
    />
  );
};

export default ProductPage;
