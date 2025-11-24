import { OrderState } from "../../../types/Client/Order/order";
import {
  CREATE_ORDER,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  GET_ALL_ORDERS,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAILURE,
  GET_ORDER_BY_ID,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  RESET_ORDER_STATE,
} from "./ActionType";

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  success: false,
};

export const orderReducer = (state = initialState, action: any): OrderState => {
  switch (action.type) {
    // Create Order
    case CREATE_ORDER:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentOrder: action.payload,
        orders: [action.payload, ...state.orders],
        success: true,
        error: null,
      };
    case CREATE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    // Get All Orders
    case GET_ALL_ORDERS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
        error: null,
      };
    case GET_ALL_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Get Order By ID
    case GET_ORDER_BY_ID:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        currentOrder: action.payload,
        error: null,
      };
    case GET_ORDER_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Reset Order State
    case RESET_ORDER_STATE:
      return {
        ...state,
        currentOrder: null,
        loading: false,
        error: null,
        success: false,
      };

    default:
      return state;
  }
};
