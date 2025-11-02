
export interface ProductSpec {
  processor?: string;
  ram?: string;
  storage?: string;
  gpu?: string;
  display?: string;
  weight?: string;
  battery?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  brandName: string;
  categoryName: string;
  specs: ProductSpec;
  price: number;
  thumbnailUrl: string;
  stock?: number;
  soldCount?: number;
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
}


export interface ProductDetail {
  id: string; 
  name: string;
  description: string;
  brandId: string;
  categoryId: string;
  specs: ProductSpec | { [key: string]: string | undefined };
}

// Customer Types
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  createdAt: string;
  isActive: boolean;
}

export interface CustomerPurchase {
  date: string;
  products: Product[];
  totalAmount: number;
  orderId: string;
}

// Employee Types
export interface Employee {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Sales' | 'Warehouse';
  department: string;
  joinDate: string;
  salary?: number;
  isActive: boolean;
  permissions: string[];
}

// Order Types
export interface OrderProduct {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  thumbnailUrl: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  products: OrderProduct[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  paymentMethod: 'cash' | 'credit_card' | 'bank_transfer';
  shippingAddress: string;
}

// Dashboard Types
export interface DashboardStats {
  totalRevenue: number;
  revenueGrowth: number;
  totalCustomers: number;
  customerGrowth: number;
  totalOrders: number;
  orderGrowth: number;
  totalProducts: number;
}

// Utility Types
export interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}