"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";


const PagePreloader = () => {
  const router = useRouter();

  useEffect(() => {
    // Preload các trang quan trọng khi component mount
    const preloadPages = [
      '/signin',
      '/signup', 
      '/shop-with-sidebar',
      '/cart',
      '/my-account'
    ];

    // Sử dụng requestIdleCallback để preload khi browser rảnh
    const preloadPage = (path: string) => {
      if (typeof window !== 'undefined') {
        // Preload bằng cách tạo link element
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = path;
        document.head.appendChild(link);
        
        // Cleanup sau 5 giây
        setTimeout(() => {
          if (link.parentNode) {
            link.parentNode.removeChild(link);
          }
        }, 5000);
      }
    };

    // Preload với delay để không ảnh hưởng đến performance ban đầu
    const timer = setTimeout(() => {
      preloadPages.forEach((page, index) => {
        setTimeout(() => preloadPage(page), index * 100); // Delay 100ms giữa mỗi page
      });
    }, 1000); // Delay 1s sau khi component mount

    return () => clearTimeout(timer);
  }, []);

  return null; // Component không render gì
};

export default PagePreloader;
