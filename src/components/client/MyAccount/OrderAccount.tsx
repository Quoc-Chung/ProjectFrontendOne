import Image from "next/image";
import React from "react";

const OrderAccount = () => {
  const orders = [
    { 
      id: "#12345", 
      date: "Sep 15, 2024", 
      status: "Delivered", 
      total: "$125.99", 
      items: [
        { name: "Wireless Headphones", price: "$89.99", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop" },
        { name: "Phone Case", price: "$25.99", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&h=150&fit=crop" },
        { name: "USB-C Cable", price: "$10.01", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop" }
      ]
    },
    { 
      id: "#12346", 
      date: "Sep 10, 2024", 
      status: "Processing", 
      total: "$89.50", 
      items: [
        { name: "Smart Watch", price: "$79.99", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop" },
        { name: "Screen Protector", price: "$9.51", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=150&h=150&fit=crop" }
      ]
    },
    { 
      id: "#12347", 
      date: "Sep 5, 2024", 
      status: "Shipped", 
      total: "$199.99", 
      items: [
        { name: "Bluetooth Speaker", price: "$199.99", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=150&h=150&fit=crop" }
      ]
    },
  ];

  // Hàm lấy màu sắc cho trạng thái đơn hàng
  const getStatusColor = (status) => {
    switch(status) {
      case "Delivered":
        return { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500" };
      case "Processing":
        return { bg: "bg-yellow-100", text: "text-yellow-800", dot: "bg-yellow-500" };
      case "Shipped":
        return { bg: "bg-blue-100", text: "text-blue-800", dot: "bg-blue-500" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-800", dot: "bg-gray-500" };
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">Lịch sử đơn hàng</h2>
      
      <div className="space-y-6">
        {orders.map((order) => {
          const statusColors = getStatusColor(order.status);
          
          return (
            <div key={order.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all hover:shadow-lg">
              {/* Header với thông tin đơn hàng */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">{order.id}</h3>
                    <p className="text-gray-500 mt-1">{order.date}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <span className={`w-2 h-2 rounded-full ${statusColors.dot} mr-2`}></span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors.bg} ${statusColors.text}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Danh sách sản phẩm */}
              <div className="p-6">
                <h4 className="font-semibold text-gray-700 mb-4">Sản phẩm ({order.items.length})</h4>
                
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <Image
                          src={item.image} 
                          alt={item.name}
                          width={100}
                          height={50}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <h5 className="font-medium text-gray-900">{item.name}</h5>
                        <p className="text-gray-600 text-sm">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Footer với tổng tiền */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Tổng cộng</p>
                  <p className="font-bold text-xl text-gray-900">{order.total}</p>
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