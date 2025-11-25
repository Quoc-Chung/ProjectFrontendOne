import { FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE } from "./ActionType";
import { Category } from "@/types/Client/Category/Category";

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null; 
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
  lastFetched: null,
};

export const categoryReducer = (state = initialState, action: any): CategoryState => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
        error: null,
        lastFetched: Date.now(),
      };
    
    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    
    default:
      return state;
  }
};

