import { FETCH_BRANDS_REQUEST, FETCH_BRANDS_SUCCESS, FETCH_BRANDS_FAILURE } from "./ActionType";
import { Brand } from "@/types/Admin/BrandAPI";

interface BrandState {
  brands: Brand[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null; // Timestamp để track khi nào fetch lần cuối
}

const initialState: BrandState = {
  brands: [],
  loading: false,
  error: null,
  lastFetched: null,
};

export const brandReducer = (state = initialState, action: any): BrandState => {
  switch (action.type) {
    case FETCH_BRANDS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    
    case FETCH_BRANDS_SUCCESS:
      return {
        ...state,
        loading: false,
        brands: action.payload,
        error: null,
        lastFetched: Date.now(),
      };
    
    case FETCH_BRANDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    
    default:
      return state;
  }
};

