
import { Product, Customer, Employee, Order } from "../types/Admin/index"

export const mockProducts: Product[] = [
  {
    id: "PRD001",
    name: "MacBook Pro 14 inch M3 Pro",
    description: "MacBook Pro 14 inch với chip M3 Pro mạnh mẽ, 16GB RAM, 512GB SSD. Màn hình Liquid Retina XDR 14.2 inch",
    brandName: "Apple",
    categoryName: "Laptop cao cấp",
    specs: { 
      processor: "Apple M3 Pro", 
      ram: "16GB", 
      storage: "512GB SSD",
      display: "14.2 inch Liquid Retina XDR",
      weight: "1.6kg",
      battery: "70Wh"
    },
    price: 52990000,
    thumbnailUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=150&fit=crop",
    stock: 15,
    soldCount: 89,
    createdAt: "2024-01-15",
    updatedAt: "2024-09-10",
    isActive: true
  },
  {
    id: "PRD002", 
    name: "Dell XPS 13 Plus",
    description: "Laptop Dell XPS 13 Plus với Intel Core i7 thế hệ 13, 16GB RAM, 1TB SSD, màn hình OLED 13.4 inch",
    brandName: "Dell",
    categoryName: "Laptop văn phòng",
    specs: { 
      processor: "Intel Core i7-1360P", 
      ram: "16GB LPDDR5", 
      storage: "1TB SSD",
      display: "13.4 inch OLED Touch",
      weight: "1.26kg",
      battery: "55Wh"
    },
    price: 35990000,
    thumbnailUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=150&fit=crop",
    stock: 8,
    soldCount: 67,
    createdAt: "2024-02-20",
    updatedAt: "2024-09-12",
    isActive: true
  },
  {
    id: "PRD003",
    name: "ASUS ROG Strix G16",
    description: "Laptop gaming ASUS ROG Strix G16 với RTX 4070, AMD Ryzen 9 7940HS, 32GB RAM, 1TB SSD",
    brandName: "ASUS", 
    categoryName: "Laptop gaming",
    specs: { 
      processor: "AMD Ryzen 9 7940HS", 
      ram: "32GB DDR5", 
      storage: "1TB SSD",
      gpu: "NVIDIA RTX 4070 8GB",
      display: "16 inch QHD 165Hz",
      weight: "2.5kg"
    },
    price: 45990000,
    thumbnailUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=200&h=150&fit=crop",
    stock: 3,
    soldCount: 45,
    createdAt: "2024-03-10",
    updatedAt: "2024-09-14",
    isActive: true
  },
  {
    id: "PRD004",
    name: "Lenovo ThinkPad X1 Carbon Gen 11",
    description: "ThinkPad X1 Carbon Gen 11 với Intel Core i5 vPro, 16GB RAM, 512GB SSD, siêu nhẹ chỉ 1.12kg",
    brandName: "Lenovo",
    categoryName: "Laptop doanh nghiệp",
    specs: {
      processor: "Intel Core i5-1335U vPro",
      ram: "16GB LPDDR5",
      storage: "512GB SSD",
      display: "14 inch WUXGA IPS",
      weight: "1.12kg",
      battery: "57Wh"
    },
    price: 28990000,
    thumbnailUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200&h=150&fit=crop",
    stock: 12,
    soldCount: 78,
    createdAt: "2024-01-25",
    updatedAt: "2024-09-08",
    isActive: true
  },
  {
    id: "PRD005",
    name: "HP Envy 16",
    description: "HP Envy 16 cho sáng tạo nội dung với Intel Core i7, RTX 4060, 32GB RAM, màn hình 16 inch OLED 4K",
    brandName: "HP",
    categoryName: "Laptop sáng tạo",
    specs: {
      processor: "Intel Core i7-13700H",
      ram: "32GB DDR5",
      storage: "1TB SSD",
      gpu: "NVIDIA RTX 4060 8GB",
      display: "16 inch OLED 4K Touch",
      weight: "2.67kg"
    },
    price: 42990000,
    thumbnailUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200&h=150&fit=crop",
    stock: 6,
    soldCount: 34,
    createdAt: "2024-04-05",
    updatedAt: "2024-09-11",
    isActive: true
  },
   {
    id: "PRD006",
    name: "HP Envy 16",
    description: "HP Envy 16 cho sáng tạo nội dung với Intel Core i7, RTX 4060, 32GB RAM, màn hình 16 inch OLED 4K",
    brandName: "HP",
    categoryName: "Laptop sáng tạo",
    specs: {
      processor: "Intel Core i7-13700H",
      ram: "32GB DDR5",
      storage: "1TB SSD",
      gpu: "NVIDIA RTX 4060 8GB",
      display: "16 inch OLED 4K Touch",
      weight: "2.67kg"
    },
    price: 42990000,
    thumbnailUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200&h=150&fit=crop",
    stock: 6,
    soldCount: 34,
    createdAt: "2024-04-05",
    updatedAt: "2024-09-11",
    isActive: true
  },
   {
    id: "PRD007",
    name: "HP Envy 16",
    description: "HP Envy 16 cho sáng tạo nội dung với Intel Core i7, RTX 4060, 32GB RAM, màn hình 16 inch OLED 4K",
    brandName: "HP",
    categoryName: "Laptop sáng tạo",
    specs: {
      processor: "Intel Core i7-13700H",
      ram: "32GB DDR5",
      storage: "1TB SSD",
      gpu: "NVIDIA RTX 4060 8GB",
      display: "16 inch OLED 4K Touch",
      weight: "2.67kg"
    },
    price: 42990000,
    thumbnailUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200&h=150&fit=crop",
    stock: 6,
    soldCount: 34,
    createdAt: "2024-04-05",
    updatedAt: "2024-09-11",
    isActive: true
  },
   {
    id: "PRD005",
    name: "HP Envy 16",
    description: "HP Envy 16 cho sáng tạo nội dung với Intel Core i7, RTX 4060, 32GB RAM, màn hình 16 inch OLED 4K",
    brandName: "HP",
    categoryName: "Laptop sáng tạo",
    specs: {
      processor: "Intel Core i7-13700H",
      ram: "32GB DDR5",
      storage: "1TB SSD",
      gpu: "NVIDIA RTX 4060 8GB",
      display: "16 inch OLED 4K Touch",
      weight: "2.67kg"
    },
    price: 42990000,
    thumbnailUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200&h=150&fit=crop",
    stock: 6,
    soldCount: 34,
    createdAt: "2024-04-05",
    updatedAt: "2024-09-11",
    isActive: true
  },
   {
    id: "PRD0805",
    name: "HP Envy 16",
    description: "HP Envy 16 cho sáng tạo nội dung với Intel Core i7, RTX 4060, 32GB RAM, màn hình 16 inch OLED 4K",
    brandName: "HP",
    categoryName: "Laptop sáng tạo",
    specs: {
      processor: "Intel Core i7-13700H",
      ram: "32GB DDR5",
      storage: "1TB SSD",
      gpu: "NVIDIA RTX 4060 8GB",
      display: "16 inch OLED 4K Touch",
      weight: "2.67kg"
    },
    price: 42990000,
    thumbnailUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200&h=150&fit=crop",
    stock: 6,
    soldCount: 34,
    createdAt: "2024-04-05",
    updatedAt: "2024-09-11",
    isActive: true
  },
   {
    id: "PRD0055",
    name: "HP Envy 16",
    description: "HP Envy 16 cho sáng tạo nội dung với Intel Core i7, RTX 4060, 32GB RAM, màn hình 16 inch OLED 4K",
    brandName: "HP",
    categoryName: "Laptop sáng tạo",
    specs: {
      processor: "Intel Core i7-13700H",
      ram: "32GB DDR5",
      storage: "1TB SSD",
      gpu: "NVIDIA RTX 4060 8GB",
      display: "16 inch OLED 4K Touch",
      weight: "2.67kg"
    },
    price: 42990000,
    thumbnailUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200&h=150&fit=crop",
    stock: 6,
    soldCount: 34,
    createdAt: "2024-04-05",
    updatedAt: "2024-09-11",
    isActive: true
  },
   {
    id: "PRD05056",
    name: "HP Envy 16",
    description: "HP Envy 16 cho sáng tạo nội dung với Intel Core i7, RTX 4060, 32GB RAM, màn hình 16 inch OLED 4K",
    brandName: "HP",
    categoryName: "Laptop sáng tạo",
    specs: {
      processor: "Intel Core i7-13700H",
      ram: "32GB DDR5",
      storage: "1TB SSD",
      gpu: "NVIDIA RTX 4060 8GB",
      display: "16 inch OLED 4K Touch",
      weight: "2.67kg"
    },
    price: 42990000,
    thumbnailUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200&h=150&fit=crop",
    stock: 6,
    soldCount: 34,
    createdAt: "2024-04-05",
    updatedAt: "2024-09-11",
    isActive: true
  },
   {
    id: "PRD0505",
    name: "HP Envy 16",
    description: "HP Envy 16 cho sáng tạo nội dung với Intel Core i7, RTX 4060, 32GB RAM, màn hình 16 inch OLED 4K",
    brandName: "HP",
    categoryName: "Laptop sáng tạo",
    specs: {
      processor: "Intel Core i7-13700H",
      ram: "32GB DDR5",
      storage: "1TB SSD",
      gpu: "NVIDIA RTX 4060 8GB",
      display: "16 inch OLED 4K Touch",
      weight: "2.67kg"
    },
    price: 42990000,
    thumbnailUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200&h=150&fit=crop",
    stock: 6,
    soldCount: 34,
    createdAt: "2024-04-05",
    updatedAt: "2024-09-11",
    isActive: true
  },
   {
    id: "PRD0705",
    name: "HP Envy 16",
    description: "HP Envy 16 cho sáng tạo nội dung với Intel Core i7, RTX 4060, 32GB RAM, màn hình 16 inch OLED 4K",
    brandName: "HP",
    categoryName: "Laptop sáng tạo",
    specs: {
      processor: "Intel Core i7-13700H",
      ram: "32GB DDR5",
      storage: "1TB SSD",
      gpu: "NVIDIA RTX 4060 8GB",
      display: "16 inch OLED 4K Touch",
      weight: "2.67kg"
    },
    price: 42990000,
    thumbnailUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200&h=150&fit=crop",
    stock: 6,
    soldCount: 34,
    createdAt: "2024-04-05",
    updatedAt: "2024-09-11",
    isActive: true
  }
];

export const mockCustomers: Customer[] = [
  { 
    id: "CUST001", 
    name: "Nguyễn Văn Anh", 
    email: "nguyenvananh@email.com", 
    phone: "0123456789",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    totalOrders: 3, 
    totalSpent: 89970000,
    lastOrderDate: "2024-09-10",
    createdAt: "2024-01-15",
    isActive: true
  },
  { 
    id: "CUST002", 
    name: "Trần Thị Bình", 
    email: "tranthib@email.com", 
    phone: "0987654321",
    address: "456 Đường DEF, Quận 2, TP.HCM", 
    totalOrders: 1, 
    totalSpent: 52990000,
    lastOrderDate: "2024-09-05",
    createdAt: "2024-02-20",
    isActive: true
  },
  { 
    id: "CUST003", 
    name: "Lê Văn Cường", 
    email: "levanc@email.com", 
    phone: "0369852147",
    address: "789 Đường GHI, Quận 3, TP.HCM",
    totalOrders: 2, 
    totalSpent: 74980000,
    lastOrderDate: "2024-08-28",
    createdAt: "2024-03-10",
    isActive: true
  },
  {
    id: "CUST004",
    name: "Phạm Thị Dung",
    email: "phamthidung@email.com",
    phone: "0912345678",
    address: "321 Đường JKL, Quận 4, TP.HCM",
    totalOrders: 4,
    totalSpent: 156960000,
    lastOrderDate: "2024-09-15",
    createdAt: "2024-01-08",
    isActive: true
  },
  {
    id: "CUST005",
    name: "Phạm Thị Dung",
    email: "phamthidung@email.com",
    phone: "0912345678",
    address: "321 Đường JKL, Quận 4, TP.HCM",
    totalOrders: 4,
    totalSpent: 156960000,
    lastOrderDate: "2024-09-15",
    createdAt: "2024-01-08",
    isActive: true
  },
  {
    id: "CUST006",
    name: "Phạm Thị Dung",
    email: "phamthidung@email.com",
    phone: "0912345678",
    address: "321 Đường JKL, Quận 4, TP.HCM",
    totalOrders: 4,
    totalSpent: 156960000,
    lastOrderDate: "2024-09-15",
    createdAt: "2024-01-08",
    isActive: true
  },
  {
    id: "CUST007",
    name: "Phạm Thị Dung",
    email: "phamthidung@email.com",
    phone: "0912345678",
    address: "321 Đường JKL, Quận 4, TP.HCM",
    totalOrders: 4,
    totalSpent: 156960000,
    lastOrderDate: "2024-09-15",
    createdAt: "2024-01-08",
    isActive: true
  }
];

export const mockEmployees: Employee[] = [
  { 
    id: "EMP001", 
    name: "Hoàng Minh Quân", 
    email: "admin@company.com", 
    role: "Admin", 
    department: "IT", 
    joinDate: "2023-01-15",
    salary: 25000000,
    isActive: true,
    permissions: ["all"]
  },
  { 
    id: "EMP002", 
    name: "Lê Thị Mai", 
    email: "sales@company.com", 
    role: "Sales", 
    department: "Sales", 
    joinDate: "2023-03-20",
    salary: 15000000,
    isActive: true,
    permissions: ["products.read", "customers.read", "orders.all"]
  },
  { 
    id: "EMP003", 
    name: "Nguyễn Văn Bình", 
    email: "warehouse@company.com", 
    role: "Warehouse", 
    department: "Warehouse", 
    joinDate: "2023-05-10",
    salary: 12000000,
    isActive: true,
    permissions: ["products.read", "inventory.all"]
  },
  {
    id: "EMP004",
    name: "Võ Thị Lan",
    email: "manager@company.com",
    role: "Manager",
    department: "Sales",
    joinDate: "2023-02-01",
    salary: 20000000,
    isActive: true,
    permissions: ["products.all", "customers.all", "orders.all", "reports.read"]
  }
];

export const mockOrders: Order[] = [
  {
    id: "ORD001",
    customerId: "CUST001",
    customerName: "Nguyễn Văn Anh",
    products: [
      {
        productId: "PRD001",
        productName: "MacBook Pro 14 inch M3 Pro",
        quantity: 1,
        price: 52990000,
        thumbnailUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=150&fit=crop"
      }
    ],
    totalAmount: 52990000,
    status: "delivered",
    orderDate: "2024-09-10",
    deliveryDate: "2024-09-12",
    paymentMethod: "bank_transfer",
    shippingAddress: "123 Đường ABC, Quận 1, TP.HCM"
  },
  {
    id: "ORD0602",
    customerId: "CUST002",
    customerName: "Trần Thị Bình",
    products: [
      {
        productId: "PRD002",
        productName: "Dell XPS 13 Plus",
        quantity: 1,
        price: 35990000,
        thumbnailUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=150&fit=crop"
      }
    ],
    totalAmount: 35990000,
    status: "shipped",
    orderDate: "2024-09-14",
    paymentMethod: "credit_card",
    shippingAddress: "456 Đường DEF, Quận 2, TP.HCM"
  },

    {
    id: "ORD05502",
    customerId: "CUST002",
    customerName: "Trần Thị Bình",
    products: [
      {
        productId: "PRD002",
        productName: "Dell XPS 13 Plus",
        quantity: 1,
        price: 35990000,
        thumbnailUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=150&fit=crop"
      }
    ],
    totalAmount: 35990000,
    status: "shipped",
    orderDate: "2024-09-14",
    paymentMethod: "credit_card",
    shippingAddress: "456 Đường DEF, Quận 2, TP.HCM"
  },

    {
    id: "ORD04402",
    customerId: "CUST002",
    customerName: "Trần Thị Bình",
    products: [
      {
        productId: "PRD002",
        productName: "Dell XPS 13 Plus",
        quantity: 1,
        price: 35990000,
        thumbnailUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=150&fit=crop"
      }
    ],
    totalAmount: 35990000,
    status: "shipped",
    orderDate: "2024-09-14",
    paymentMethod: "credit_card",
    shippingAddress: "456 Đường DEF, Quận 2, TP.HCM"
  },
    {
    id: "ORD44002",
    customerId: "CUST002",
    customerName: "Trần Thị Bình",
    products: [
      {
        productId: "PRD002",
        productName: "Dell XPS 13 Plus",
        quantity: 1,
        price: 35990000,
        thumbnailUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=150&fit=crop"
      }
    ],
    totalAmount: 35990000,
    status: "shipped",
    orderDate: "2024-09-14",
    paymentMethod: "credit_card",
    shippingAddress: "456 Đường DEF, Quận 2, TP.HCM"
  },

    {
    id: "ORD02302",
    customerId: "CUST002",
    customerName: "Trần Thị Bình",
    products: [
      {
        productId: "PRD002",
        productName: "Dell XPS 13 Plus",
        quantity: 1,
        price: 35990000,
        thumbnailUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=150&fit=crop"
      }
    ],
    totalAmount: 35990000,
    status: "shipped",
    orderDate: "2024-09-14",
    paymentMethod: "credit_card",
    shippingAddress: "456 Đường DEF, Quận 2, TP.HCM"
  },
    {
    id: "ORD0012",
    customerId: "CUST002",
    customerName: "Trần Thị Bình",
    products: [
      {
        productId: "PRD002",
        productName: "Dell XPS 13 Plus",
        quantity: 1,
        price: 35990000,
        thumbnailUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=150&fit=crop"
      }
    ],
    totalAmount: 35990000,
    status: "shipped",
    orderDate: "2024-09-14",
    paymentMethod: "credit_card",
    shippingAddress: "456 Đường DEF, Quận 2, TP.HCM"
  },
    {
    id: "ORD0022",
    customerId: "CUST002",
    customerName: "Trần Thị Bình",
    products: [
      {
        productId: "PRD002",
        productName: "Dell XPS 13 Plus",
        quantity: 1,
        price: 35990000,
        thumbnailUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=150&fit=crop"
      }
    ],
    totalAmount: 35990000,
    status: "shipped",
    orderDate: "2024-09-14",
    paymentMethod: "credit_card",
    shippingAddress: "456 Đường DEF, Quận 2, TP.HCM"
  },
  
];