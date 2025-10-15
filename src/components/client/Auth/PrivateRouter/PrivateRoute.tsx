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
    if (!token && !globalToastShown) {
      localStorage.setItem("redirectUrl", pathname);
      globalToastShown = true;
      toast.warning("Bạn chưa đăng nhập. Vui lòng đăng nhập!");
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
      <div className="fixed inset-0 z-99999 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Đang kiểm tra quyền truy cập...</p>
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
