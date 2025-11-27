
import {
  Brand,
  BrandCreateRequest,
  BrandUpdateRequest,
  BrandListResponse,
  BrandDetailResponse,
} from "../types/Admin/BrandAPI";

const API_BASE_URL = "http://103.90.225.90:8080/services/product-service/api";

export class BrandService {
  /**
   * Lấy danh sách tất cả brands từ API /brand (không phân trang)
   * Dùng cho dropdown/filter
   */
  static async getAllBrandsSimple(): Promise<Brand[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/brand`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data: BrandListResponse = await response.json();

      if (data.status.code !== "200") {
        throw new Error(data.status.message || "Failed to fetch brands");
      }

      return data.data.content || [];
    } catch (error) {
      console.error("Error fetching brands:", error);
      throw error;
    }
  }

  /**
   * Lấy danh sách tất cả brands (tự động fetch tất cả các trang)
   */
  static async getAllBrands(): Promise<Brand[]> {
    try {
      const allBrands: Brand[] = [];
      let currentPage = 0;
      let totalPages = 1;

      // Fetch tất cả các trang
      do {
        const response = await fetch(`${API_BASE_URL}/brand?page=${currentPage}&size=100`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
        });

        if (!response.ok) {
          const errorText = await response.text().catch(() => 'Unknown error');
          throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        const data: BrandListResponse = await response.json();

        if (data.status.code !== "200") {
          throw new Error(data.status.message || "Failed to fetch brands");
        }


        allBrands.push(...data.data.content);
        
        // Cập nhật thông tin pagination
        totalPages = data.data.totalPages;
        
        console.log(`📦 Fetched page ${currentPage + 1}/${totalPages}, items: ${data.data.content.length}, total: ${allBrands.length}`);

        // Tăng page để fetch trang tiếp theo
        currentPage++;
      } while (currentPage < totalPages);

      console.log(`✅ Fetched all brands: ${allBrands.length} brands from ${totalPages} pages`);
      return allBrands;
    } catch (error) {
      console.error("Error fetching brands:", error);
      throw error;
    }
  }

  /**
   * Lấy brand theo ID
   */
  static async getBrandById(id: string): Promise<Brand> {
    try {
      const response = await fetch(`${API_BASE_URL}/brand/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: BrandDetailResponse = await response.json();

      if (data.status.code !== "200") {
        throw new Error(data.status.message || "Failed to fetch brand");
      }

      return data.data;
    } catch (error) {
      console.error("Error fetching brand by ID:", error);
      throw error;
    }
  }

  /**
   * Tìm kiếm brand theo tên
   */
  static async searchBrandByName(name: string): Promise<Brand[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/brand/search?name=${encodeURIComponent(name)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: BrandListResponse = await response.json();

      if (data.status.code !== "200") {
        throw new Error(data.status.message || "Failed to search brands");
      }

      return data.data.content;
    } catch (error) {
      console.error("Error searching brands:", error);
      throw error;
    }
  }

  /**
   * Tạo brand mới (backend yêu cầu multipart với "brand" JSON + "image" file)
   */
  static async createBrand(
    brandData: BrandCreateRequest,
    imageFile: File,
    token: string
  ): Promise<Brand> {
    try {
      if (!imageFile) {
        throw new Error("Logo file is required when creating a brand");
      }

      const formData = new FormData();
      formData.append(
        "brand",
        JSON.stringify({
          name: brandData.name.trim(),
          slug: brandData.slug.trim(),
        })
      );
      formData.append("image", imageFile);

      const response = await fetch(`${API_BASE_URL}/brand`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data: BrandDetailResponse = await response.json();

      if (data.status.code !== "200" && data.status.code !== "201") {
        throw new Error(data.status.message || "Failed to create brand");
      }

      return data.data;
    } catch (error) {
      console.error("Error creating brand:", error);
      throw error;
    }
  }

  /**
   * Cập nhật brand
   */
  static async updateBrand(
    brandId: string,
    brandData: BrandUpdateRequest,
    imageFile: File | undefined,
    token: string
  ): Promise<Brand> {
    try {
      const name = brandData.name?.trim();
      const slug = brandData.slug?.trim();

      if (!name) {
        throw new Error("Brand name is required");
      }

      if (!slug) {
        throw new Error("Brand slug is required");
      }

      const payload: BrandUpdateRequest = {
        name,
        slug,
        ...(brandData.logoUrl ? { logoUrl: brandData.logoUrl } : {}),
      };

      const formData = new FormData();
      formData.append("brand", JSON.stringify(payload));

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await fetch(`${API_BASE_URL}/brand/${brandId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error");
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data: BrandDetailResponse = await response.json();

      if (data.status.code !== "200") {
        throw new Error(data.status.message || "Failed to update brand");
      }

      return data.data;
    } catch (error) {
      console.error("Error updating brand:", error);
      throw error;
    }
  }

  /**
   * Xóa brand
   */
  static async deleteBrand(id: string, token: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/brand/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${responseText}`);
      }

      // Nếu response có body, parse JSON để kiểm tra status
      if (responseText) {
        try {
          const data = JSON.parse(responseText);
          if (data.status && data.status.code !== "200") {
            throw new Error(data.status.message || "Failed to delete brand");
          }
        } catch (parseError) {
          // Nếu không parse được JSON nhưng status OK thì coi như thành công
        }
      }
    } catch (error) {
      console.error("Error deleting brand:", error);
      throw error;
    }
  }
}

