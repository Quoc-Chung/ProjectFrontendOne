
import { CartOrderResponse } from "../../../types/Client/CartOrder/cartorder";
import { ADD_PRODUCT_TO_CART, ADD_PRODUCT_TO_CART_SUCCESS, ADD_PRODUCT_TO_CART_FAILURE, GET_ALL_CART, GET_ALL_CART_FAILURE, GET_ALL_CART_SUCCESS, UPDATE_PRODUCT_IN_CART, DELETE_PRODUCT_FROM_CART, DELETE_PRODUCT_FROM_CART_SUCCESS, DELETE_PRODUCT_FROM_CART_FAILURE } from "./ActionType";

interface CartState {
  loading: boolean;
  cart: CartOrderResponse[];
  error?: string;
}

const initialState: CartState = {
  loading: false,
  cart: [],
  error: undefined,
};

export const cartReducer = (state = initialState, action: any): CartState => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return { ...state, loading: true, error: undefined };
    case ADD_PRODUCT_TO_CART_SUCCESS:
      const existingItemIndex = state.cart.findIndex(
        item => item.productId === action.payload.productId
      );
      
      if (existingItemIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + (action.payload.quantity || 1)
        };
        return { ...state, loading: false, cart: updatedCart };
      } else {
        // Nếu chưa có, thêm mới
        return { ...state, loading: false, cart: [...state.cart, action.payload] };
      }
    case ADD_PRODUCT_TO_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };


    case GET_ALL_CART:
      return { ...state, loading: true, error: undefined };
    case GET_ALL_CART_SUCCESS:
        return { ...state, loading: false, cart: action.payload };
      case GET_ALL_CART_FAILURE:
      return { ...state, loading: false, error: "Lỗi khi lấy danh sách giỏ hàng", cart: [] };

    case UPDATE_PRODUCT_IN_CART:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case DELETE_PRODUCT_FROM_CART:
      return { ...state, loading: true, error: undefined };
    case DELETE_PRODUCT_FROM_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        // Filter theo productId thay vì id
        cart: state.cart.filter(item => item.productId !== action.payload)
      };
    case DELETE_PRODUCT_FROM_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
