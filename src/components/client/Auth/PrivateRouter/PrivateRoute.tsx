"use client"
import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation"; 
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

let globalToastShown = false;

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { token } = useSelector((state: RootState) => state.auth);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Giảm thời gian checking
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 100); // Giảm từ default xuống 100ms

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!token && !globalToastShown) {
      localStorage.setItem("redirectUrl", pathname);
      globalToastShown = true;
      router.replace("/signin");
      return;
    }
    if (token) {
      setIsChecking(false);
      globalToastShown = false;
    }
  }, [token, pathname, router]);

  if (isChecking) {
    return (
      <div className="fixed inset-0 z-99999 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col items-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-solid border-blue border-t-transparent"></div>
          <p className="mt-2 text-gray-600 text-sm">Đang kiểm tra...</p>
        </div>
      </div>
    );
  }
  if (!token) {
    return null;
  }
  return <>{children}</>;
};

export default PrivateRoute;
