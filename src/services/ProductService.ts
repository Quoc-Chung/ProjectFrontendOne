import {
  Product,
  ProductListResponse,
  ProductDetailResponse,
  ProductCreateRequest,
  ProductDeleteResponse,
} from "../types/Admin/ProductAPI";

const API_BASE_URL = "http://103.90.225.90:8080/services/product-service/api";

export class ProductService {
  /**
   * Lấy danh sách sản phẩm với phân trang
   * @param page - Số trang (bắt đầu từ 0)
   * @param size - Số lượng sản phẩm mỗi trang
   */
  static async getAllProducts(
    page: number = 0,
    size: number = 6
  ): Promise<{
    products: Product[];
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
    currentPage: number;
    totalElements: number;
  }> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/product?page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ProductListResponse = await response.json();

      if (data.status.code !== "200") {
        throw new Error(data.status.message || "Failed to fetch products");
      }

      return {
        products: data.data.content,
        totalPages: data.data.total_pages,
        hasNext: data.data.has_next,
        hasPrevious: data.data.has_previous,
        currentPage: data.data.current_page,
        totalElements: data.data.total_elements,
      };
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  /**
   * Lấy sản phẩm theo ID
   * @param id - ID của sản phẩm
   */
  static async getProductById(id: string): Promise<Product> {
    try {
      const response = await fetch(`${API_BASE_URL}/product/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ProductDetailResponse = await response.json();

      if (data.status.code !== "200") {
        throw new Error(data.status.message || "Failed to fetch product");
      }

      return data.data;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
  }

  /**
   * Tìm kiếm sản phẩm
   * @param searchTerm - Từ khóa tìm kiếm
   * @param page - Số trang (bắt đầu từ 0)
   * @param size - Số lượng sản phẩm mỗi trang
   */
  static async searchProducts(
    searchTerm: string,
    page: number = 0,
    size: number = 10
  ): Promise<{
    products: Product[];
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
    currentPage: number;
    totalElements: number;
  }> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/product/search?keyword=${encodeURIComponent(
          searchTerm
        )}&page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ProductListResponse = await response.json();

      if (data.status.code !== "200") {
        throw new Error(data.status.message || "Failed to search products");
      }

      return {
        products: data.data.content,
        totalPages: data.data.total_pages,
        hasNext: data.data.has_next,
        hasPrevious: data.data.has_previous,
        currentPage: data.data.current_page,
        totalElements: data.data.total_elements,
      };
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  }


  /**
   * Tạo sản phẩm mới với file upload (form-data)
   * @param productData - Dữ liệu sản phẩm cần tạo
   * @param imageFiles - Mảng các file ảnh cần upload
   * @param token - JWT token để xác thực
   */
  static async createProductWithFiles(
    productData: ProductCreateRequest,
    imageFiles: File[],
    token: string
  ): Promise<Product> {
    try {
      // Tạo FormData
      const formData = new FormData();
      
      // Thêm product data dưới dạng JSON string
      const productJson = JSON.stringify({
        name: productData.name,
        description: productData.description,
        brandId: productData.brandId,
        categoryId: productData.categoryId,
        specs: productData.specs,
      });
      
      formData.append("product", productJson);
      
      // Thêm các file ảnh
      imageFiles.forEach((file) => {
        formData.append("images", file);
      });
      
      console.log("🚀 CREATE PRODUCT WITH FILES - Request:", {
        url: `${API_BASE_URL}/product/create`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        productData: productJson,
        imageCount: imageFiles.length,
        imageNames: imageFiles.map((f) => f.name),
      });

      const response = await fetch(`${API_BASE_URL}/product/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      console.log("📡 CREATE PRODUCT WITH FILES - Response:", {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ CREATE PRODUCT WITH FILES - Error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data: ProductDetailResponse = await response.json();
      console.log("✅ CREATE PRODUCT WITH FILES - Success data:", data);

      if (data.status.code !== "200" && data.status.code !== "201") {
        throw new Error(data.status.message || "Failed to create product");
      }

      return data.data;
    } catch (error) {
      console.error("Error creating product with files:", error);
      throw error;
    }
  }

  /**
   * Cập nhật sản phẩm với file upload (form-data)
   * @param productId - ID của sản phẩm cần cập nhật
   * @param productData - Dữ liệu sản phẩm cần cập nhật
   * @param imageFiles - Mảng các file ảnh cần upload (optional)
   * @param token - JWT token để xác thực
   */
  static async updateProductWithFiles(
    productId: string,
    productData: ProductCreateRequest,
    imageFiles: File[],
    token: string
  ): Promise<Product> {
    try {
      // Tạo FormData
      const formData = new FormData();
      
      // Thêm product data dưới dạng JSON string
      const productJson = JSON.stringify({
        name: productData.name,
        description: productData.description,
        brandId: productData.brandId,
        categoryId: productData.categoryId,
        specs: productData.specs,
      });
      
      formData.append("product", productJson);
      
      // Thêm các file ảnh (nếu có)
      if (imageFiles && imageFiles.length > 0) {
        imageFiles.forEach((file) => {
          formData.append("images", file);
        });
      }
      
      console.log("🚀 UPDATE PRODUCT WITH FILES - Request:", {
        url: `${API_BASE_URL}/product/${productId}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        productData: productJson,
        imageCount: imageFiles?.length || 0,
        imageNames: imageFiles?.map((f) => f.name) || [],
      });

      const response = await fetch(`${API_BASE_URL}/product/${productId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      console.log("📡 UPDATE PRODUCT WITH FILES - Response:", {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ UPDATE PRODUCT WITH FILES - Error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data: ProductDetailResponse = await response.json();
      console.log("✅ UPDATE PRODUCT WITH FILES - Success data:", data);

      if (data.status.code !== "200") {
        throw new Error(data.status.message || "Failed to update product");
      }

      return data.data;
    } catch (error) {
      console.error("Error updating product with files:", error);
      throw error;
    }
  }

  /**
   * Lấy danh sách sản phẩm mới nhất
   * @param limit - Số lượng sản phẩm cần lấy
   */
  static async getLatestProducts(limit: number = 10): Promise<Product[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/products/statistics/latest?limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status.code !== "200") {
        throw new Error(data.status.message || "Failed to fetch latest products");
      }

      return data.data || [];
    } catch (error) {
      console.error("Error fetching latest products:", error);
      throw error;
    }
  }


   static async deleteProductById(productId: string, token: string) : Promise<ProductDeleteResponse> {
      try{
        const response = await fetch(`${API_BASE_URL}/delete?id=${productId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        console.log("🗑️ DELETE PRODUCT - Request:", {
          url: `${API_BASE_URL}/delete?id=${productId}`,
          method: "DELETE",
          productId,
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("❌ DELETE PRODUCT - Error response:", errorText);
          throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }
        
        const data: ProductDeleteResponse = await response.json();
        console.log("✅ DELETE PRODUCT - Success data:", data);
        
        if (data.status.code !== "200") {
          throw new Error(data.status.message || "Failed to delete product");
        }
        return data;
      } catch (error) {
        console.error("Error deleting product by ID:", error);
        throw error;
      }
   }; 




}

