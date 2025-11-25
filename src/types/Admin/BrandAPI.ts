// ===========================
// Brand API Types
// ===========================

export interface Brand {
  id: string;
  name: string;
  logoUrl: string;
  slug: string;
}

export interface BrandCreateRequest {
  name: string;
  slug: string;
  logoUrl?: string;
}

export interface BrandUpdateRequest {
  name: string;
  slug: string;
  logoUrl?: string;
}

// API Response Types
export interface ApiStatus {
  code: string;
  message: string;
  label: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface BrandListResponse {
  status: ApiStatus;
  data: {
    content: Brand[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  };
  extraData: null;
}

export interface BrandDetailResponse {
  status: ApiStatus;
  data: Brand;
  extraData: null;
}

