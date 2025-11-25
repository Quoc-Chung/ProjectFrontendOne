import { FETCH_BRANDS_REQUEST, FETCH_BRANDS_SUCCESS, FETCH_BRANDS_FAILURE } from "./ActionType";
import { BrandService } from "@/services/BrandService";
import { Brand } from "@/types/Admin/BrandAPI";

export const fetchBrandsAction = (onSuccess?: (brands: Brand[]) => void, onError?: (error: string) => void) => {
  return async (dispatch: any) => {
    dispatch({ type: FETCH_BRANDS_REQUEST });
    try {
      const brands = await BrandService.getAllBrands();
      dispatch({ type: FETCH_BRANDS_SUCCESS, payload: brands });
      if (onSuccess) onSuccess(brands);
    } catch (error: any) {
      const errorMessage = error.message || "Lỗi khi tải danh sách thương hiệu";
      dispatch({ type: FETCH_BRANDS_FAILURE, payload: errorMessage });
      if (onError) onError(errorMessage);
    }
  };
};

