import { FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE } from "./ActionType";
import { CategoryService } from "@/services/CategoryService";
import { Category } from "@/types/Client/Category/Category";

export const fetchCategoriesAction = (onSuccess?: (categories: Category[]) => void, onError?: (error: string) => void) => {
  return async (dispatch: any) => {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });
    try {
      const categories = await CategoryService.getAllCategories();
      dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: categories });
      if (onSuccess) onSuccess(categories);
    } catch (error: any) {
      const errorMessage = error.message || "Lỗi khi tải danh sách danh mục";
      dispatch({ type: FETCH_CATEGORIES_FAILURE, payload: errorMessage });
      if (onError) onError(errorMessage);
    }
  };
};

