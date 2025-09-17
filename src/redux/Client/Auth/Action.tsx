import { BASE_API_URL } from "@/utils/configAPI";
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
} from "./ActionType";
import { Register } from "@/types/Client/Auth/Register";

// ============== REGISTER ==============
export const register = (data: Register, onSuccess?: any, onError?: any) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
      const res = await fetch(`${BASE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resData = await res.json();

      if (resData.status?.code !== "200") {
        throw new Error(resData.status?.message || "Đăng ký thất bại");
      }

      dispatch({ type: REGISTER_SUCCESS, payload: resData.data });
      onSuccess?.(resData);
    } catch (error: any) {
      dispatch({ type: REGISTER_FAILURE, payload: error.message });
      onError?.(error.message);
    }
  };
};

// ============== LOGIN ==============
export const login = (data: any, onSuccess?: any, onError?: any) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const res = await fetch(`${BASE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (resData.status?.code !== "200") {
        throw new Error(resData.status?.message || "Đăng nhập thất bại");
      }

      if (resData.data?.token) {
        localStorage.setItem("token", resData.data.token);
        dispatch({ type: LOGIN_SUCCESS, payload: resData.data });
        onSuccess?.(resData);
      } else {
        throw new Error("Tài khoản hoặc mật khẩu sai");
      }
    } catch (error: any) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
      onError?.(error.message);
    }
  };
};
export const updateUser = (formData: FormData, onSuccess?: any, onError?: any) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_API_URL}/api/users/update`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const resData = await res.json();

      if (resData.status?.code !== "200") {
        throw new Error(resData.status?.message || "Cập nhật user thất bại");
      }

      dispatch({ type: UPDATE_USER_SUCCESS, payload: resData.data });
      onSuccess?.(resData);
    } catch (error: any) {
      dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
      onError?.(error.message);
    }
  };
};
export const logoutAction = (onSuccess?: any, onError?: any) => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  try {

     const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_API_URL}/api/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    const resData = await res.json();
    if(resData.status.code === 200){
      console.log("LOGOUT THÀNH CÔNG.");
      localStorage.removeItem("token");
      sessionStorage.clear();
    }
    dispatch({ type: LOGOUT_SUCCESS });
    onSuccess?.(resData);
  } catch (error: any) {
    dispatch({ type: LOGOUT_FAILURE, payload: error.message });
    onError?.(error.message);
  }
};

// ============== CHANGE PASSWORD ==============
export const changePassword = (data: any, onSuccess?: any, onError?: any) => {
  return async (dispatch) => {
    dispatch({ type: CHANGE_PASSWORD_REQUEST });
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_API_URL}/api/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (resData.status?.code !== "200") {
        throw new Error(resData.status?.message || "Đổi mật khẩu thất bại");
      }

      dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: resData.data });
      onSuccess?.(resData);
    } catch (error: any) {
      dispatch({ type: CHANGE_PASSWORD_FAILURE, payload: error.message });
      onError?.(error.message);

    }
  };
};
