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

  /**
 * Tạo category mới
 * @param categoryData Object chứa name, slug, parentId
 * @param imageFile File ảnh category (tùy chọn)
 */
static async createCategory(
  categoryData: { name: string; slug: string; parentId?: string | null },
  imageFile?: File
): Promise<Category> {
  try {
    const formData = new FormData();
    formData.append("category", new Blob([JSON.stringify(categoryData)], { type: "application/json" }));
    
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await fetch(`${API_BASE_URL}/category`, {
      method: "POST",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsImlhdCI6MTc2MjU1NjgxNSwiZXhwIjoxNzYyNTYwNDE1LCJ1c2VyX2NvZGUiOiJVMSIsInJvbGVzIjpbIkFETUlOIl0sInVzZXJJZCI6MSwiZW1haWwiOiJ1c2VyMUBleGFtcGxlLmNvbSJ9.TPWNk3CV85bKj_TzI3q9qHIZdc3-PkL6T6OWPKp1UYhOfWdOgz5YcoC7ycwSnEWBSyQrnkMLvkQrzDPKrzppBaPGp2lZbreZkhgcrN-I7_NaHXtpsdn7vdK3QaOXtUQ1Lm_5uBwSFQkAZc9bpRzPZb8fTCVB8CF9RHS2Z09Fy7rOlQVMIhkp8gQZ2N2cH24wwXo9Lt8HcCNyV7Gg9_PmG5ICXbfC8ChZvMq4iTwA-VLj5p9v34_sTesUQmWU0UsisFLI2qNYU2nKR3qGkzBV4Pilx_JrFHuAWvPuDK3RNqZw1FgJ4Ip31z7t33NwuZzEb0WomHaPJJLYb2cFqBy1hg",
      },
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const data: CategoryDetailResponse = await response.json();

    if (data.status.code !== "200") {
      throw new Error(data.status.message || "Failed to create category");
    }

    return data.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}
}
