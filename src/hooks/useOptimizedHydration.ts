"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

/**
 * Hook tối ưu hóa hydration để giảm thời gian loading
 * @param delay - Thời gian delay trước khi set hydrated (ms)
 * @returns {boolean} isHydrated - Trạng thái hydration
 */
export const useOptimizedHydration = (delay: number = 50) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Sử dụng requestIdleCallback nếu có, fallback về setTimeout
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const handleIdle = () => {
        setIsHydrated(true);
      };
      
      const id = requestIdleCallback(handleIdle, { timeout: delay });
      return () => cancelIdleCallback(id);
    } else {
      const timer = setTimeout(() => {
        setIsHydrated(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [delay]);

  return isHydrated;
};

/**
 * Hook để kiểm tra trạng thái đăng nhập với hydration
 * @returns {object} - { isHydrated, isLogin, user, token }
 */
export const useAuthWithHydration = () => {
  const isHydrated = useOptimizedHydration(30); // Giảm xuống 30ms
  const { isLogin, user, token } = useSelector((state: RootState) => state.auth);
  
  return {
    isHydrated,
    isLogin,
    user,
    token
  };
};
