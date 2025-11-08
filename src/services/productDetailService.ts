// API service for product details
import { BASE_API_PRODUCT_URL } from '@/utils/configAPI';
const API_BASE_URL = `${BASE_API_PRODUCT_URL}/api`;

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
    } | null;
    price: number;
    thumbnailUrl: string;
    images: string[];
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
          id: productId || 'unknown',
          name: `Sản phẩm ${productId || 'Không xác định'}`,
          description: `Đây là mô tả chi tiết cho sản phẩm ${productId || 'này'}. Sản phẩm có chất lượng cao và thiết kế hiện đại.`,
          brandName: "Thương hiệu",
          categoryName: "Điện tử",
          specs: {
            "Material": "Chất lượng cao",
            "Color": "Đen",
            "Weight": "1.2kg",
            "Dimensions": "30x20x10cm"
          },
          price: 999000,
          thumbnailUrl: "/images/products/product-1-1.png",
          images: []
        },
        extraData: null
      };

      // Thử gọi API thực trước với timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 giây timeout
      
      try {
        const response = await fetch(`${API_BASE_URL}/product/${productId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          console.warn(`API not available (${response.status}), using mock data for product ${productId}`);
          return mockProductData;
        }

        const data: ProductDetailResponse = await response.json();
        return data;
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        if (fetchError.name === 'AbortError') {
          console.warn(`API request timeout, using mock data for product ${productId}`);
          return mockProductData;
        }
        // Nếu là lỗi khác, throw lại để catch block bên ngoài xử lý
        throw fetchError;
      }
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
          id: productId || 'unknown',
          name: `Sản phẩm ${productId || 'Không xác định'}`,
          description: `Đây là mô tả chi tiết cho sản phẩm ${productId || 'này'}. Sản phẩm có chất lượng cao và thiết kế hiện đại.`,
          brandName: "Thương hiệu",
          categoryName: "Điện tử",
          specs: {
            "Material": "Chất lượng cao",
            "Color": "Đen",
            "Weight": "1.2kg",
            "Dimensions": "30x20x10cm"
          },
          price: 999000,
          thumbnailUrl: "/images/products/product-1-1.png",
          images: []
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
