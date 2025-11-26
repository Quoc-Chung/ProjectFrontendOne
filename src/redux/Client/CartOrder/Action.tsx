import { Dispatch } from "react";
import { CartOrderRequest, CartOrderResponse } from "../../../types/Client/CartOrder/cartorder";
import { ADD_PRODUCT_TO_CART, ADD_PRODUCT_TO_CART_FAILURE, ADD_PRODUCT_TO_CART_SUCCESS, UPDATE_PRODUCT_IN_CART, DELETE_PRODUCT_FROM_CART, DELETE_PRODUCT_FROM_CART_SUCCESS, DELETE_PRODUCT_FROM_CART_FAILURE } from "./ActionType";
import { BASE_API_CART_URL } from "../../../utils/configAPI";
import { ApiResponse } from "../../../types/Common/common";
import { GET_ALL_CART } from "./ActionType";
import { GET_ALL_CART_SUCCESS } from "./ActionType";
import { GET_ALL_CART_FAILURE } from "./ActionType";
import { AppDispatch } from "../../store";
// Thêm sản phẩm vào giỏ hàng 
export const addProductToCartAction = (
    request: CartOrderRequest,
    token: string,
    onSuccess?: (res: ApiResponse<CartOrderResponse>) => void,
    onError?: (error: string) => void
  ) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: ADD_PRODUCT_TO_CART });
  
    try {
      const res = await fetch(`${BASE_API_CART_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
      });
  
      // Kiểm tra status code trước khi parse JSON
      if (res.status === 403) {
        // Token hết hạn hoặc không có quyền truy cập
        dispatch({ type: ADD_PRODUCT_TO_CART_FAILURE, payload: "Token hết hạn" });
        onError?.("Token hết hạn");
        return;
      }

      const resData: ApiResponse<CartOrderResponse> = await res.json();
  
      if (resData.status.code === "200") {
        dispatch({ type: ADD_PRODUCT_TO_CART_SUCCESS, payload: resData.data });
        onSuccess?.(resData);
      } else {
        dispatch({ type: ADD_PRODUCT_TO_CART_FAILURE, payload: resData.status.message });
        onError?.(resData.status.message);
      }
    } catch (error: any) {
      dispatch({ type: ADD_PRODUCT_TO_CART_FAILURE, payload: error.message });
      onError?.(error.message);
    }
  };

  export const getAllCartAction = (
    token: string,
    onSuccess?: (res: ApiResponse<CartOrderResponse[]>) => void,
    onError?: (error: string) => void
  ) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: GET_ALL_CART });
  
    try {
      const res = await fetch(`${BASE_API_CART_URL}/api/cart/my-cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      
      });
  
      if (res.status === 403) {
        dispatch({ type: GET_ALL_CART_FAILURE, payload: "Token hết hạn" });
        onError?.("Token hết hạn");
        return;
      }

      const resData: ApiResponse<CartOrderResponse[]> = await res.json();
  
      if (resData.status.code === "200") {
        dispatch({ type: GET_ALL_CART_SUCCESS, payload: resData.data });
        onSuccess?.(resData);
      } else {
        dispatch({ type: GET_ALL_CART_FAILURE, payload: resData.status.message });
        onError?.(resData.status.message);
      }
    } catch (error: any) {
      dispatch({ type: GET_ALL_CART_FAILURE, payload: error.message });
      onError?.(error.message);
    }
  };

  export const updateProductQuantityAction = (
    productId: string,
    newQuantity: number
  ) => (dispatch: Dispatch<any>) => {
    dispatch({ 
      type: UPDATE_PRODUCT_IN_CART, 
      payload: { productId, quantity: newQuantity } 
    });
  };

  export const removeProductFromCartAction = (
    productId: string,
    skuId: string,
    token: string,
    onSuccess?: (res: ApiResponse<any>) => void,
    onError?: (error: string) => void
  ) => async (dispatch: AppDispatch) => {
    dispatch({ type: DELETE_PRODUCT_FROM_CART });

    try {
      // Gửi productId và skuId trong path variables
      const res = await fetch(`${BASE_API_CART_URL}/api/cart/remove/${productId}/${skuId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 403) {
        dispatch({ type: DELETE_PRODUCT_FROM_CART_FAILURE, payload: "Token hết hạn" });
        onError?.("Token hết hạn");
        return;
      }

      if (res.status === 404) {
        dispatch({ type: DELETE_PRODUCT_FROM_CART_FAILURE, payload: "Không tìm thấy sản phẩm trong giỏ hàng" });
        onError?.("Không tìm thấy sản phẩm trong giỏ hàng");
        return;
      }

      if (!res.ok) {
        const errorText = await res.text();
        dispatch({ type: DELETE_PRODUCT_FROM_CART_FAILURE, payload: errorText || "Lỗi khi xóa sản phẩm" });
        onError?.(errorText || "Lỗi khi xóa sản phẩm");
        return;
      }

      const resData: ApiResponse<any> = await res.json();

      if (resData.status?.code === "200") {
        // Truyền cả productId và skuId vào payload để reducer có thể filter đúng
        dispatch({ type: DELETE_PRODUCT_FROM_CART_SUCCESS, payload: { productId, skuId } });
        // Không cần refresh cart ngay - state đã được cập nhật tức thì
        onSuccess?.(resData);
      } else {
        dispatch({ type: DELETE_PRODUCT_FROM_CART_FAILURE, payload: resData.status?.message || "Lỗi khi xóa sản phẩm" });
        onError?.(resData.status?.message || "Lỗi khi xóa sản phẩm");
      }
    } catch (error: any) {
      dispatch({ type: DELETE_PRODUCT_FROM_CART_FAILURE, payload: error.message });
      onError?.(error.message);
    }
  };

