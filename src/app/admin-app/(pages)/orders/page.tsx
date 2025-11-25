import { Metadata } from "next";
import { OrderManagement } from "../../../../components/server/OrderManagement";
import { mockOrders } from "../../../../utils/mockData";


export const metadata: Metadata = {
  title: "NextCommerce | Quản lý đơn hàng",
  description: "Quản lý đơn hàng khách hàng NextCommerce",
};

export default function OrdersPage() {
  return (
    <main className="p-8">
      <OrderManagement orders={mockOrders} />
    </main>
  );
}
