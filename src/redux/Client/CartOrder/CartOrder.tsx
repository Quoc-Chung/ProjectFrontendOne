// redux/cart/reducer.timport { CartOrderResponse } from "../../types/cart";
import { CartOrderResponse } from "../../../types/Client/CartOrder/cartorder";
import { ADD_PRODUCT_TO_CART, ADD_PRODUCT_TO_CART_SUCCESS, ADD_PRODUCT_TO_CART_FAILURE, GET_ALL_CART, GET_ALL_CART_FAILURE, GET_ALL_CART_SUCCESS, UPDATE_PRODUCT_IN_CART } from "./ActionType";

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
      return { ...state, loading: false, cart: [...state.cart, action.payload] };
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

    default:
      return state;
  }
};
