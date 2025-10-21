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
