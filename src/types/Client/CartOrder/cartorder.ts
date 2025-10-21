export interface CartOrderRequest {
    productId: string;
    quantity: number;
  }
  

  export interface CartOrderResponse {
    id: string;
    productId: string;
    productName: string;
    productPrice: number;
    quantity: number;
    createdAt: string;
    updatedAt: string;
}