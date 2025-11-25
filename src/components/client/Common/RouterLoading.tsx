"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Component hiển thị loading indicator khi đang chuyển trang
 * Tối ưu để navigation mượt mà hơn
 */
const RouterLoading = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear previous timers
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setLoading(false);
    setProgress(0);

    const showDelay = setTimeout(() => {
      setProgress(0);
      setLoading(true);
      
      // Progress animation cực nhanh
      let currentProgress = 0;
      intervalRef.current = setInterval(() => {
        currentProgress += 40;
        if (currentProgress >= 95) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          currentProgress = 95;
        }
        setProgress(currentProgress);
      }, 5);
      
      // Complete loading cực nhanh
      timeoutRef.current = setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setLoading(false);
          setProgress(0);
        }, 3);
      }, 30);
    }, 1000); // Chỉ hiển thị nếu navigation cực kỳ chậm (>1000ms = 1 giây)

    return () => {
      clearTimeout(showDelay);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      setLoading(false);
      setProgress(0);
    };
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[9999] pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transition-all duration-100 ease-linear"
        style={{ 
          width: `${progress}%`,
          boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
          transition: 'width 0.1s linear'
        }}
      />
    </div>
  );
};

export default RouterLoading;