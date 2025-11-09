import Image from "next/image";
import React from "react";

const OrderAccount = () => {
  const orders = [
    { 
      id: "#12345", 
      date: "15/09/2024",
      time: "14:30",
      status: "Delivered", 
      total: 12599000, 
      items: [
        { name: "Wireless Headphones", price: 8999000, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop" },
        { name: "Phone Case", price: 2599000, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&h=150&fit=crop" },
        { name: "USB-C Cable", price: 1001000, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop" }
      ]
    },
    { 
      id: "#12346", 
      date: "10/09/2024",
      time: "09:15",
      status: "Processing", 
      total: 8950000, 
      items: [
        { name: "Smart Watch", price: 7999000, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop" },
        { name: "Screen Protector", price: 951000, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=150&h=150&fit=crop" }
      ]
    },
    { 
      id: "#12347", 
      date: "05/09/2024",
      time: "16:45",
      status: "Shipped", 
      total: 19999000, 
      items: [
        { name: "Bluetooth Speaker", price: 19999000, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=150&h=150&fit=crop" }
      ]
    },
  ];

  // Hàm format giá tiền VNĐ
  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + ' VNĐ';
  };

  // Hàm lấy màu sắc và icon cho trạng thái đơn hàng
  const getStatusConfig = (status: string) => {
    switch(status) {
      case "Delivered":
        return { 
          bg: "bg-gradient-to-r from-green-500 to-emerald-600", 
          text: "text-white", 
          dot: "bg-green-500",
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ),
          label: "Đã giao hàng"
        };
      case "Processing":
        return { 
          bg: "bg-gradient-to-r from-yellow-500 to-orange-500", 
          text: "text-white", 
          dot: "bg-yellow-500",
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          ),
          label: "Đang xử lý"
        };
      case "Shipped":
        return { 
          bg: "bg-gradient-to-r from-blue-500 to-cyan-500", 
          text: "text-white", 
          dot: "bg-blue-500",
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
            </svg>
          ),
          label: "Đã gửi hàng"
        };
      default:
        return { 
          bg: "bg-gradient-to-r from-gray-500 to-gray-600", 
          text: "text-white", 
          dot: "bg-gray-500",
          icon: null,
          label: status
        };
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Lịch sử đơn hàng</h2>
        <p className="text-gray-600">Xem và theo dõi tất cả đơn hàng của bạn</p>
      </div>
      
      <div className="space-y-6">
        {orders.map((order) => {
          const statusConfig = getStatusConfig(order.status);
          
          return (
            <div key={order.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:border-blue-300">
              {/* Header với thông tin đơn hàng - Nổi bật hơn */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b-2 border-gray-200">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-2xl text-gray-900">{order.id}</h3>
                      <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${statusConfig.bg} ${statusConfig.text} flex items-center gap-2 shadow-md`}>
                        {statusConfig.icon}
                        {statusConfig.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium">Ngày đặt: {order.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">Giờ: {order.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Danh sách sản phẩm - Cải thiện layout */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-5">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <h4 className="font-bold text-lg text-gray-900">Sản phẩm ({order.items.length})</h4>
                </div>
                
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md">
                      <div className="flex-shrink-0">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200">
                          <Image
                            src={item.image} 
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-grow min-w-0">
                        <h5 className="font-semibold text-gray-900 mb-1 truncate">{item.name}</h5>
                        <p className="text-blue-600 font-bold text-lg">{formatPrice(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Footer với tổng tiền - Nổi bật hơn */}
              <div className="px-6 py-5 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-t-2 border-blue-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-700 font-semibold text-lg">Tổng cộng</p>
                  </div>
                  <p className="font-bold text-2xl sm:text-3xl text-blue-600">{formatPrice(order.total)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderAccount;