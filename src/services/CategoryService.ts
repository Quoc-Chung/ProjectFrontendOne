import {
  Category,
  CategoriesResponse,
  CategoryDetailResponse,
} from "../types/Client/Category/Category";

const API_BASE_URL = "http://103.90.225.90:8080/services/product-service/api";

export class CategoryService {
  /**
   * Lấy danh sách tất cả categories
   */
  static async getAllCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`, {
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

      const data: CategoriesResponse = await response.json();

      if (data.status.code !== "200") {
        throw new Error(data.status.message || "Failed to fetch categories");
      }

      return data.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  /**
   * Lấy category theo ID
   */
  static async getCategoryById(id: string): Promise<Category> {
    try {
      const response = await fetch(`${API_BASE_URL}/category/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CategoryDetailResponse = await response.json();

      if (data.status.code !== "200") {
        throw new Error(data.status.message || "Failed to fetch category");
      }

      return data.data;
    } catch (error) {
      console.error("Error fetching category by ID:", error);
      throw error;
    }
  }

  /**
   * Tìm kiếm category theo tên
   */
  static async searchCategoryByName(name: string): Promise<Category[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/category/search?name=${encodeURIComponent(name)}`,
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

      const data: CategoriesResponse = await response.json();

      if (data.status.code !== "200") {
        throw new Error(data.status.message || "Failed to search categories");
      }

      return data.data;
    } catch (error) {
      console.error("Error searching categories:", error);
      throw error;
    }
  }
}
