import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  LOGIN_GOOGLE_REQUEST,
  LOGIN_GOOGLE_SUCCESS,
  LOGIN_GOOGLE_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from "./ActionType";
import { setCookie, deleteCookie, getCookie } from "../../../utils/cookies";


const initialState = {
  loading: false,
  user: null,
  isLogin: false,
  token: null,
  roleNames: [],
  error: null,

  forgotPassword: {
    loading: false,
    data: null,
    error: null,
  },

  verifyOtp: {
    loading: false,
    data: null,
    error: null,
  },

  resetPassword: {
    loading: false,
    data: null,
    error: null,
  },
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {

    case 'persist/REHYDRATE':
      const rehydratedAuthState = action.payload?.auth || action.payload;
      if (rehydratedAuthState?.token && typeof window !== 'undefined') {
        const cookieToken = getCookie('token');
        if (!cookieToken && rehydratedAuthState.token) {
          setCookie('token', rehydratedAuthState.token, 7);
        }
      }
      return {
        ...state,
        ...rehydratedAuthState,
        isLogin: rehydratedAuthState?.token ? true : (rehydratedAuthState?.isLogin ?? false),
      };
    
    // ============== REGISTER ==============
    case REGISTER_REQUEST:
      return { ...state, loading: true, error: null };
    case REGISTER_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // ============== LOGIN ==============
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      // Lưu token vào cookie để middleware có thể kiểm tra
      if (action.payload?.token && typeof window !== 'undefined') {
        setCookie('token', action.payload.token, 7); // Lưu 7 ngày
      }
      return {
        ...state,
        loading: false,
        user: action.payload,
        token: action.payload.token,
        isLogin: true,
        roleNames: action.payload.roleNames
      };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // ============== LOGIN WITH GOOGLE ==============  
    case LOGIN_GOOGLE_REQUEST:
      return {
        ...state,
        loading: false,
        error: null
      }

    case LOGIN_GOOGLE_SUCCESS:
      // Lưu token vào cookie để middleware có thể kiểm tra
      if (action.payload?.token && typeof window !== 'undefined') {
        setCookie('token', action.payload.token, 7); // Lưu 7 ngày
      }
      return {
        ...state,
        loading: false,
        user: action.payload,
        token: action.payload.token,
        isLogin: true,
        roleNames: action.payload.roleNames || []
      }

    case LOGIN_GOOGLE_FAILURE:
      return { ...state, loading: false, error: action.payload };


    // ============== UPDATE USER ==============
    case UPDATE_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case UPDATE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // ============== LOGOUT ==============
    case LOGOUT_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGOUT_SUCCESS:
      // Xóa token khỏi cookie khi logout
      if (typeof window !== 'undefined') {
        deleteCookie('token');
      }
      return { ...state, loading: false, user: null, token: null, isLogin: false, roleNames: [] };
    case LOGOUT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // ============== CHANGE PASSWORD ==============
    case CHANGE_PASSWORD_REQUEST:
      return { ...state, loading: true, error: null };
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state, loading: false };
    case CHANGE_PASSWORD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // ----- FORGOT PASSWORD -----
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        forgotPassword: { loading: true, data: null, error: null },
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPassword: { loading: false, data: action.payload, error: null },
      };

    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        forgotPassword: { loading: false, data: null, error: action.payload },
      };

    // ----- VERIFY OTP -----
    case VERIFY_OTP_REQUEST:
      return {
        ...state,
        verifyOtp: { loading: true, data: null, error: null },
      };

    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        verifyOtp: { loading: false, data: action.payload, error: null },
      };

    case VERIFY_OTP_FAILURE:
      return {
        ...state,
        verifyOtp: { loading: false, data: null, error: action.payload },
      };

    // ----- RESET PASSWORD -----
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        resetPassword: { loading: true, data: null, error: null },
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPassword: { loading: false, data: action.payload, error: null },
      };

    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        resetPassword: { loading: false, data: null, error: action.payload },
      };

    default:
      return state;
  }
};
