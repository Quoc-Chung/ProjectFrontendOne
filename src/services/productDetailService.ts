// API service for product details
const API_BASE_URL = 'http://localhost:8080/services/product-service/api';

export interface ProductDetailResponse {
  status: {
    code: string;
    message: string;
    label: string;
  };
  data: {
    id: string;
    name: string;
    description: string;
    brandName: string;
    categoryName: string;
    specs: {
      [key: string]: string;
    };
    price: number;
    thumbnailUrl: string;
  };
  extraData: any;
}

export const productDetailService = {
  // Get product details by ID
  async getProductDetail(productId: string): Promise<ProductDetailResponse> {
    try {
      // Mock data cho testing khi API không hoạt động
      const mockProductData: ProductDetailResponse = {
        status: {
          code: "200",
          message: "Success",
          label: "OK"
        },
        data: {
          id: productId,
          name: `Product ${productId}`,
          description: `This is a detailed description for product ${productId}. It features high-quality materials and modern design.`,
          brandName: "Brand Name",
          categoryName: "Electronics",
          specs: {
            "Material": "Premium Quality",
            "Color": "Black",
            "Weight": "1.2kg",
            "Dimensions": "30x20x10cm"
          },
          price: 999000,
          thumbnailUrl: "/images/products/product-1-1.png"
        },
        extraData: null
      };

      // Thử gọi API thực trước
      const response = await fetch(`${API_BASE_URL}/product/${productId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.warn(`API not available (${response.status}), using mock data for product ${productId}`);
        return mockProductData;
      }

      const data: ProductDetailResponse = await response.json();
      return data;
    } catch (error) {
      console.warn('API error, using mock data:', error);
      // Trả về mock data khi có lỗi
      return {
        status: {
          code: "200",
          message: "Success",
          label: "OK"
        },
        data: {
          id: productId,
          name: `Product ${productId}`,
          description: `This is a detailed description for product ${productId}. It features high-quality materials and modern design.`,
          brandName: "Brand Name",
          categoryName: "Electronics",
          specs: {
            "Material": "Premium Quality",
            "Color": "Black",
            "Weight": "1.2kg",
            "Dimensions": "30x20x10cm"
          },
          price: 999000,
          thumbnailUrl: "/images/products/product-1-1.png"
        },
        extraData: null
      };
    }
  },

  // Format price to Vietnamese currency
  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN') + ' VNĐ';
  },

  // Get image source with fallback
  getImageSrc(thumbnailUrl: string | null): string {
    if (!thumbnailUrl) {
      return '/images/products/product-1-1.png';
    }

    // Map API image names to actual file names
    const imageMapping: { [key: string]: string } = {
      '/images/products/product-1-1.png': '/images/products/product-1-1.png',
      '/images/products/product-2-1.png': '/images/products/product-2-1.png',
      '/images/products/product-3-1.png': '/images/products/product-3-1.png',
      '/images/products/product-4-1.png': '/images/products/product-4-1.png',
      '/images/products/product-5-1.png': '/images/products/product-5-1.png',
    };

    return imageMapping[thumbnailUrl] || thumbnailUrl;
  }
};
