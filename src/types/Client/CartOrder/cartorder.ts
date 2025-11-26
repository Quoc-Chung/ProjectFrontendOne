export interface CartOrderRequest {
    productId: string;
    skuId: string;
    quantity: number;
  }


  export interface CartOrderResponse {
    id: string;
    productId: string;
    skuId: string;
    productName: string;
    productPrice: number;
    quantity: number;
    productImage?: string;
    thumbnailUrl?: string;
    createdAt: string;
    updatedAt: string;
}