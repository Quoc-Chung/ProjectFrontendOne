"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/types/Client/Product/Product";

interface ProductCardProps {
  product: Product;
  style: "grid" | "list";
}

const ProductCard: React.FC<ProductCardProps> = ({ product, style }) => {
  const router = useRouter();

  const handleProductClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/shop-details/${product.id}`);
  };

  const getImageSrc = () => {
    if (product.thumbnailUrl && product.thumbnailUrl !== null) {
      // Map API image names to actual file names
      const imageMapping: { [key: string]: string } = {
        "/images/products/product-1-1.png": "/images/products/product-1-sm-1.png",
        "/images/products/product-2-1.png": "/images/products/product-2-sm-1.png",
        "/images/products/product-3-1.png": "/images/products/product-3-sm-1.png",
        "/images/products/product-4-1.png": "/images/products/product-4-sm-1.png",
        "/images/products/product-5-1.png": "/images/products/product-5-sm-1.png",
      };
      
      // Return mapped image or original if no mapping exists
      return imageMapping[product.thumbnailUrl] || product.thumbnailUrl;
    }
    return "/images/products/product-1-sm-1.png"; 
  };

  if (style === "grid") {
    return (
      <div 
        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
        onClick={handleProductClick}
      >
        {/* Image */}
        <div className="relative w-full h-64 bg-gray-100">
          <Image
            src={getImageSrc()}
            alt={product.name}
            fill
            className="object-cover"
            onError={(e) => {
              console.error('Image error:', getImageSrc());
              (e.target as HTMLImageElement).src = "/images/products/image 156.png";
            }}
          />
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-blue-600">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-2">{product.brandName}</p>
          <p className="text-blue-600 font-bold text-xl">
            {product.price.toLocaleString('vi-VN')} VNĐ
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="flex items-center gap-4 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleProductClick}
    >
      {/* Image */}
      <div className="relative w-32 h-24 flex-shrink-0">
        <Image
          src={getImageSrc()}
          alt={product.name}
          fill
          className="object-cover rounded"
          onError={(e) => {
            console.error('Image error:', getImageSrc());
            (e.target as HTMLImageElement).src = "/images/products/image 156.png";
          }}
        />
      </div>
      
      {/* Content */}
      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-1 hover:text-blue-600">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        <p className="text-blue-600 font-bold text-xl">
          {product.price.toLocaleString('vi-VN')} VNĐ
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
