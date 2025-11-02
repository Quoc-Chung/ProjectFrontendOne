"use client";

import { useEffect } from "react";

/**
 * Hook để preload các trang quan trọng khi app đã load
 * Giúp navigation mượt mà hơn
 */
export const usePreloadImportantPages = () => {
  useEffect(() => {
    // Chỉ preload khi đã ở client side
    if (typeof window === "undefined") return;

    // Danh sách các trang quan trọng cần preload
    const importantPages = [
      "/",
      "/shop-with-sidebar",
      "/cart",
      "/contact",
      "/signin",
      "/signup",
    ];

    // Preload sau một delay nhỏ để không ảnh hưởng đến initial load
    const preloadTimer = setTimeout(() => {
      importantPages.forEach((path) => {
        // Tạo link element để prefetch
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = path;
        link.as = "document";
        document.head.appendChild(link);
      });
    }, 2000); // Preload sau 2 giây

    return () => {
      clearTimeout(preloadTimer);
    };
  }, []);
};
