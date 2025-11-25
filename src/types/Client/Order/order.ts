export interface OrderItemRequest {
  productId: string;
  skuId: string;
  quantity: number;
}

export interface CreateOrderRequest {
  items: OrderItemRequest[];
  shippingAddress: string;
}

export interface OrderItemResponse {
  id: string;
  productId: string;
  skuId: string;
  productName?: string;
  productPrice?: number;
  quantity: number;
}

export interface OrderResponse {
  id: string;
  userId: string;
  items: OrderItemResponse[];
  shippingAddress: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderState {
  orders: OrderResponse[];
  currentOrder: OrderResponse | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}
