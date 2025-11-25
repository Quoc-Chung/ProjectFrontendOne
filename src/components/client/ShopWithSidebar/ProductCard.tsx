"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/Client/Product/Product";

interface ProductCardProps {
  product: Product;
  style: "grid" | "list";
}

const ProductCard: React.FC<ProductCardProps> = ({ product, style }) => {

  const getImageSrc = () => {
    if (product.thumbnailUrl && product.thumbnailUrl !== null && product.thumbnailUrl.trim() !== "") {
      // If it's a full URL (starts with http:// or https://), use it directly
      if (product.thumbnailUrl.startsWith('http://') || product.thumbnailUrl.startsWith('https://')) {
        return product.thumbnailUrl;
      }
      
      // Otherwise, it's a local path - map API image names to actual file names
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

  const isExternalUrl = (url: string) => {
    return url.startsWith('http://') || url.startsWith('https://'); 
  };

  // Validate productId
  if (!product.id || product.id === 'undefined' || product.id === 'null') {
    console.error('Invalid product ID:', product.id, product);
    return null;
  }

  const productUrl = `/shop-details/${String(product.id)}`;

  if (style === "grid") {
    return (
      <Link 
        href={productUrl}
        prefetch={true}
        scroll={true}
        className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group transform hover:-translate-y-1"
        role="button"
        tabIndex={0}
        aria-label={`Xem chi tiết sản phẩm ${product.name}`}
      >
        {/* Image */}
        <div className="relative w-full h-64 bg-gray-100">
          <Image
            src={getImageSrc()}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized={isExternalUrl(getImageSrc())}
            onError={(e) => {
              console.error('Image error:', getImageSrc());
              (e.target as HTMLImageElement).src = "/images/products/image 156.png";
            }}
          />
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-2">{product.brandName}</p>
          <p className="text-blue-600 font-bold text-xl">
            {product.price ? `${product.price.toLocaleString('vi-VN')} VNĐ` : 'Liên hệ'}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={productUrl}
      prefetch={true}
      scroll={true}
      className="flex items-center gap-4 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
      role="button"
      tabIndex={0}
      aria-label={`Xem chi tiết sản phẩm ${product.name}`}
    >
      {/* Image */}
      <div className="relative w-32 h-24 flex-shrink-0">
        <Image
          src={getImageSrc()}
          alt={product.name}
          fill
          className="object-cover rounded transition-transform duration-300 group-hover:scale-105"
          unoptimized={isExternalUrl(getImageSrc())}
          onError={(e) => {
            console.error('Image error:', getImageSrc());
            (e.target as HTMLImageElement).src = "/images/products/image 156.png";
          }}
        />
      </div>
      
      {/* Content */}
      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        <p className="text-blue-600 font-bold text-xl">
          {product.price ? `${product.price.toLocaleString('vi-VN')} VNĐ` : 'Liên hệ'}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
