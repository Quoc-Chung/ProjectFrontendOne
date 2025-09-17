
import { Metadata } from "next";
import { mockCustomers, mockOrders, mockProducts } from "../../utils/mockData";
import { DashboardOverview } from "../../components/server/DashboardOverview";
export const metadata: Metadata = {
  title: "NextCommerce | Home",
  description: "This is the main dashboard of NextCommerce Admin",
};

export default function HomePage() {
  const stats = {
    totalRevenue: mockProducts.reduce((sum, p) => sum + p.price * (p.soldCount || 0), 0),
    revenueGrowth: 12.5,
    totalCustomers: mockCustomers.length,
    customerGrowth: 8.2,
    totalOrders: mockOrders.length,
    orderGrowth: 15.3,
    totalProducts: mockProducts.filter(p => p.isActive).length
  };

  return (
    <main className="p-8">
      <DashboardOverview stats={stats} products={mockProducts} />
    </main>
  );
}
