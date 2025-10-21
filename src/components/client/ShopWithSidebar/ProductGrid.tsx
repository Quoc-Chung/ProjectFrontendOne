"use client";
import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/Client/Product/Product";

interface ProductGridProps {
  products: Product[];
  productStyle: "grid" | "list";
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, productStyle }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-gray-500 text-lg">
          Không có sản phẩm nào được tìm thấy
        </div>
      </div>
    );
  }

  return (
    <div className={productStyle === "grid" 
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
      : "flex flex-col gap-4"
    }>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} style={productStyle} />
      ))}
    </div>
  );
};

export default ProductGrid;
