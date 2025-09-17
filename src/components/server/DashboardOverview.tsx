"use client"
import React from "react";
import {
  Calendar,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  Package,
  BarChart3,
  XCircle,
} from "lucide-react";
import { DashboardStats, Product } from "@/types/Admin";
import { formatDate, formatPrice } from '../../utils/helpers';
import Image from "next/image";

interface DashboardOverviewProps {
  stats: DashboardStats;
  products: Product[];
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  stats,
  products,
}) => {
  return (
    <div className="mt-5 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Tổng Quan</h2>
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Calendar size={14} />
          <span>Cập nhật: {formatDate(new Date().toISOString())}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Tổng Doanh Thu",
            value: formatPrice(stats.totalRevenue),
            icon: <DollarSign size={28} className="opacity-80" />,
            trend: `+${stats.revenueGrowth}% so với tháng trước`,
            color: "bg-blue-600",
          },
          {
            title: "Khách Hàng",
            value: stats.totalCustomers.toLocaleString(),
            icon: <Users size={28} className="opacity-80" />,
            trend: `+${stats.customerGrowth}%`,
            color: "bg-green-600",
          },
          {
            title: "Đơn Hàng",
            value: stats.totalOrders.toLocaleString(),
            icon: <ShoppingCart size={28} className="opacity-80" />,
            trend: `+${stats.orderGrowth}%`,
            color: "bg-purple-600",
          },
          {
            title: "Sản Phẩm",
            value: stats.totalProducts,
            icon: <Package size={28} className="opacity-80" />,
            trend: `Đang hoạt động`,
            color: "bg-orange-600",
          },
        ].map((card, idx) => (
          <div key={idx} className={`${card.color} p-4 rounded-lg text-white shadow h-full`}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs opacity-80">{card.title}</p>
                <p className="text-xl font-bold">{card.value}</p>
                <p className="text-xs flex items-center mt-1">
                  <TrendingUp size={12} className="mr-1" />
                  {card.trend}
                </p>
              </div>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-white p-4 rounded-lg shadow border border-gray-200 h-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Biểu Đồ Doanh Thu</h3>
            <div className="flex space-x-1">
              <button className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">6 tháng</button>
              <button className="px-2 py-0.5 text-xs text-gray-500 rounded">12 tháng</button>
            </div>
          </div>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center border border-dashed border-gray-300">
            <div className="text-center text-gray-500">
              <BarChart3 size={40} className="mx-auto mb-2 text-gray-400" />
              <p className="text-sm font-medium">Biểu đồ cột doanh thu</p>
              <p className="text-xs">Dữ liệu sẽ hiển thị ở đây</p>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200 h-full">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Top Sản Phẩm Bán Chạy</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {products
              .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
              .slice(0, 5)
              .map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 transition"
                >
                  <div
                    className={`w-6 h-6 flex items-center justify-center text-xs font-bold text-white rounded-full ${
                      index === 0
                        ? "bg-yellow-500"
                        : index === 1
                        ? "bg-gray-400"
                        : index === 2
                        ? "bg-orange-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {index + 1}
                  </div>

                  <Image
                    src={product.thumbnailUrl}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="rounded object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.soldCount || 0} đã bán</p>
                  </div>

                  <p className="text-sm font-semibold text-gray-900">{formatPrice(product.price)}</p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200 h-full">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Thống Kê Kho Hàng</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Tổng sản phẩm:</span>
              <span className="font-semibold">{products.reduce((sum, p) => sum + (p.stock || 0), 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sắp hết hàng (&lt; 5):</span>
              <span className="font-semibold text-orange-600">{products.filter((p) => (p.stock || 0) < 5).length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Hết hàng:</span>
              <span className="font-semibold text-red-600">{products.filter((p) => (p.stock || 0) === 0).length}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border border-gray-200 h-full">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Thống Kê Đơn Hàng</h3>
          <div className="space-y-2 text-sm">
            {[{ label: "Hôm nay", value: 12 }, { label: "Đang xử lý", value: 5, color: "text-blue-600" }, { label: "Hoàn thành", value: 7, color: "text-green-600" }, { label: "Đơn huỷ", value: 2, color: "text-red-600", icon: <XCircle size={14} className="mr-1" /> }].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-gray-600">{item.label}:</span>
                <span className={`font-semibold flex items-center ${item.color || ""}`}>
                  {item.icon} {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
