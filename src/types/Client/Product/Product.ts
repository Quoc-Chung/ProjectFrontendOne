export interface Product {
  id: string;
  name: string;
  description: string;
  brandName: string;
  categoryName: string;
  specs: { [key: string]: string };
  price: number;
  thumbnailUrl: string | null;
}

export interface ProductsResponse {
  status: {
    code: string;
    message: string;
    label: string;
  };
  data: {
    content: Product[];
    total_pages: number;
    has_next: boolean;
    has_previous: boolean;
    current_page: number;
    total_elements: number;
  };
  extraData: any;
}

export interface SKU {
  id: string;
  productId: string;
  skuCode: string;
  specs: { [key: string]: string | number };
  price: number;
  discountPrice: number | null;
  salePrice: number | null;
  saleId: string | null;
  stock: number;
  barcode: string;
  isActive: boolean;
}

export interface SKUResponse {
  status: {
    code: string;
    message: string;
    label: string;
  };
  data: SKU[];
  extraData: any;
}
