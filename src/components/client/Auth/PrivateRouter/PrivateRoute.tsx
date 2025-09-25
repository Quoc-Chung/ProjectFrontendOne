"use client"
import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation"; 
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const router = useRouter();
  const pathname = usePathname(); 
  const { token } = useSelector((state: RootState) => state.auth);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (!token) {
      // Lưu lại đường dẫn user đang đứng
      localStorage.setItem("redirectUrl", pathname);

      // Hiện dialog
      setShowDialog(true);
    }
  }, [token, pathname]);

  if (!token) {
    return (
      <>
        {showDialog && (
          <div className="fixed inset-0 z-99999 flex items-center justify-center">
            {/* Overlay mờ */}
      <div 
              className="absolute inset-0 backdrop-blur-md bg-gradient-to-br from-slate-900/60 via-purple-900/40 to-slate-900/60 animate-fade-in"
              style={{
                animation: 'fadeIn 0.3s ease-out forwards'
              }}
            ></div>

            {/* Dialog */}
            <div className="relative bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center z-10 animate-fade-in">
              <h2 className="text-lg font-bold text-red-600 mb-3">
                Bạn chưa đăng nhập
              </h2>
              <p className="text-gray-600 mb-6">
                Vui lòng đăng nhập để tiếp tục truy cập trang này.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => router.back()}
                  className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
                >
                  Quay lại
                </button>
                <button
                  onClick={() => {
                    setShowDialog(false);
                    router.replace("/signin");
                  }}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Đăng nhập
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
