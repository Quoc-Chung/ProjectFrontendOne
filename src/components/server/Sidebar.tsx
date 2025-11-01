"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch, persistor } from "../../redux/store";
import { logoutAction } from "../../redux/Client/Auth/Action";
import { toast } from "react-toastify";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isHydrated, setIsHydrated] = useState(false);
   
  const { user, token, isLogin, roleNames } = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleLogout = () => {
    if (!token) {
      toast.error("Bạn chưa đăng nhập!", {
        autoClose: 2000,
        position: "top-right"
      });
      router.push("/signin");
      return;
    }

    dispatch(
      logoutAction(
        { token },
        async () => {
          // Purge redux-persist để xóa sạch dữ liệu đã persist
          try {
            await persistor.purge();
          } catch (error) {
            console.error('Error purging persistor:', error);
          }
          
          // Đảm bảo xóa hết localStorage liên quan đến auth
          if (typeof window !== 'undefined') {
            localStorage.removeItem('persist:auth');
            localStorage.removeItem('persist:root');
            // Xóa thêm các key có thể có
            Object.keys(localStorage).forEach(key => {
              if (key.startsWith('persist:')) {
                localStorage.removeItem(key);
              }
            });
          }
          
          toast.success("🎉 Đăng xuất thành công!", {
            autoClose: 2000,
            position: "top-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          
          setTimeout(() => {
            router.push("/signin");
          }, 2000);
        },
        (err) => {
          toast.error(`Đăng xuất thất bại: ${err}`, {
            autoClose: 3000,
            position: "top-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      )
    );
  };
  
  const menuItems = [
    { href: "/admin-app/dashboard", icon: BarChart3, label: "Dashboard Tổng Quan" },
    { href: "/admin-app/products/management", icon: Package, label: "Quản Lý Sản Phẩm" },
    { href: "/admin-app/inventorys/management", icon: Package, label: "Quản Lý Kho Hàng" },
    { href: "/admin-app/orders", icon: ShoppingCart, label: "Quản Lý Đơn Hàng" },
    { href: "/admin-app/customers/management", icon: Users, label: "Quản Lý Khách Hàng" },
    { href: "/admin-app/employees", icon: Users, label: "Quản Lý Nhân Viên" },
  ];

  return (
    <div className="w-72 mt-5 h-[730px] bg-gradient-to-b from-gray-50 to-white shadow-xl flex flex-col relative overflow-hidden transition-all duration-500">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse-slow pointer-events-none" />

      {/* User Profile */}
      <div className="relative z-10 p-4 border-b border-gray-200/30">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center transition-transform duration-300 rounded-full shadow-md w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:scale-105">
            <User size={24} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 truncate">
              {isHydrated ? (user?.fullName || 'Admin User') : 'Admin User'}
            </h3>
            <p className="text-xs text-gray-500 truncate">
              {isHydrated ? (user?.email || 'admin@company.com') : 'admin@company.com'}
            </p>
            <span className="inline-block mt-1 px-3 py-1 text-[11px] font-medium rounded-full bg-purple-100 text-purple-700 transition-colors duration-200">
              {isHydrated ? (roleNames?.includes('Administrator') ? 'Administrator' : roleNames?.join(', ') || 'User') : 'User'}
            </span>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 text-gray-400 transition-all duration-200 hover:text-red-500 hover:scale-110 hover:bg-red-50 rounded-lg cursor-pointer"
            title="Đăng xuất"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex-1 p-4 overflow-y-auto">
        <ul className="pb-6 space-y-2">
          {menuItems.map((item) => {
            const isActive = isHydrated ? pathname === item.href : false;

            return (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  prefetch={true}
                  scroll={true}
                  className={`w-full px-4 py-2.5 rounded-xl flex items-center space-x-3 transition-all duration-200 cursor-pointer select-none relative z-10 ${isActive
                    ? "bg-blue-600 text-white shadow-lg border-r-4 border-blue-400"
                    : "text-gray-600 hover:bg-gray-100/70 hover:text-gray-900 active:bg-gray-200/70"
                    }`}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <div className="transition-transform duration-150 group-hover:scale-110 flex-shrink-0 pointer-events-none">
                    <item.icon size={20} />
                  </div>
                  <span className="text-sm font-medium tracking-tight flex-1 pointer-events-none">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="relative z-10 p-4 border-t border-gray-200/50">
        <div className="text-[11px] text-gray-500 text-center leading-snug opacity-0 animate-fade-in delay-500">
          <p className="font-medium">Laptop Store Admin v2.0</p>
          <p>© 2024 All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
