"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const RouterLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Bắt đầu loading khi pathname thay đổi
    setIsLoading(true);
    
    // Dừng loading sau một khoảng thời gian ngắn
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 bg-blue-600 animate-pulse">
        <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 animate-pulse"></div>
      </div>
    </div>
  );
};

export default RouterLoading;
