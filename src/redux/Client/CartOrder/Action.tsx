import { Dispatch } from "react";
import { CartOrderRequest, CartOrderResponse } from "../../../types/Client/CartOrder/cartorder";
import { ADD_PRODUCT_TO_CART, ADD_PRODUCT_TO_CART_FAILURE, ADD_PRODUCT_TO_CART_SUCCESS, UPDATE_PRODUCT_IN_CART } from "./ActionType";
import { BASE_API_URL } from "../../../utils/configAPI";
import { ApiResponse } from "../../../types/Common/common";
import { GET_ALL_CART } from "./ActionType";
import { GET_ALL_CART_SUCCESS } from "./ActionType";
import { GET_ALL_CART_FAILURE } from "./ActionType";
// Thêm sản phẩm vào giỏ hàng 
export const addProductToCartAction = (
    request: CartOrderRequest,
    token: string,
    onSuccess?: (res: ApiResponse<CartOrderResponse>) => void,
    onError?: (error: string) => void
  ) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: ADD_PRODUCT_TO_CART });
  
    try {
      const res = await fetch(`http://localhost:8080/services/order-service/api/carts/add`, {
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
        // Refresh lại danh sách giỏ hàng sau khi thêm thành công
        dispatch(getAllCartAction(token));
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
      const res = await fetch(`http://localhost:8080/services/order-service/api/carts/my-cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      
      });
  
      // Kiểm tra status code trước khi parse JSON
      if (res.status === 403) {
        // Token hết hạn hoặc không có quyền truy cập
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

  // Cập nhật số lượng sản phẩm trong giỏ hàng (local state)
  export const updateProductQuantityAction = (
    productId: string,
    newQuantity: number
  ) => (dispatch: Dispatch<any>) => {
    dispatch({ 
      type: UPDATE_PRODUCT_IN_CART, 
      payload: { productId, quantity: newQuantity } 
    });
  };

