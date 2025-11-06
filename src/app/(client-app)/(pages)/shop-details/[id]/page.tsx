import React from "react";
import ShopDetails from "@/components/client/ShopDetails";
import { Metadata } from "next";
import { productDetailService, ProductDetailResponse } from "@/services/productDetailService";

interface ShopDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ShopDetailsPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const productData = await productDetailService.getProductDetail(id);
    return {
      title: `${productData.data.name} | NextCommerce`,
      description: productData.data.description,
    };
  } catch (error) {
    return {
      title: "Chi tiết sản phẩm | NextCommerce",
      description: "Trang chi tiết sản phẩm NextCommerce",
    };
  }
}

const ShopDetailsPage = async ({ params }: ShopDetailsPageProps) => {
  const { id } = await params;
  let productData: ProductDetailResponse | null = null;
  
  try {
    productData = await productDetailService.getProductDetail(id);
  } catch (error) {
    console.error('Error fetching product data:', error);
  }

  return (
    <main>
      <ShopDetails productData={productData} />
    </main>
  );
};

export default ShopDetailsPage;
