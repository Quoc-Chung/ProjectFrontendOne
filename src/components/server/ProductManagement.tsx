"use client"
import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Trash2,
  Eye,
  ArrowUpDown,
} from "lucide-react";
import { Product as AdminProduct, ProductDetail, SortConfig } from "@/types/Admin";
import { Product } from "@/types/Admin/ProductAPI";
import { ProductService } from "@/services/ProductService";
import { BrandService } from "@/services/BrandService";
import { CategoryService } from "@/services/CategoryService";
import { Brand } from "@/types/Admin/BrandAPI";
import { Category } from "@/types/Client/Category/Category";
import { formatPrice } from '../../utils/helpers';
import Image from "next/image";
import { ProductDetails } from "./ProductDetails"; 
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

// Component riêng để xử lý image với error handling
const ProductImageCell: React.FC<{ product: Product }> = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!product.thumbnailUrl) {
    return (
      <div className="w-14 h-10 bg-gray-200 rounded-md flex items-center justify-center">
        <span className="text-xs text-gray-400">N/A</span>
      </div>
    );
  }

  if (imageError) {
    return (
      <div className="w-14 h-10 bg-gray-200 rounded-md flex items-center justify-center">
        <span className="text-xs text-gray-400">N/A</span>
      </div>
    );
  }

  return (
    <div className="relative w-14 h-10">
      {!imageLoaded && (
        <div className="absolute inset-0 w-14 h-10 bg-gray-200 rounded-md flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <Image
        src={product.thumbnailUrl}
        alt={product.name}
        width={56}
        height={40}
        className={`object-cover rounded-md ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity`}
        onError={() => {
          setImageError(true);
          setImageLoaded(false);
        }}
        onLoad={() => {
          setImageLoaded(true);
        }}
        unoptimized
      />
    </div>
  );
};

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loadingFilters, setLoadingFilters] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const router = useRouter();
  
  // Get token from Redux
  const { token } = useSelector((state: RootState) => state.auth);

  // Phân trang từ API
  const [currentPage, setCurrentPage] = useState<number>(0); 
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [hasPrevious, setHasPrevious] = useState<boolean>(false);
  const itemsPerPage = 6;

  const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({
    min: "",
    max: "",
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: "",
    direction: "asc",
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);


  const loadProducts = async () => {
    try {
      setLoading(true);
      const result = await ProductService.getAllProducts(currentPage, itemsPerPage);
      setProducts(result.products);
      setTotalPages(result.totalPages);
      setTotalElements(result.totalElements);
      setHasNext(result.hasNext);
      setHasPrevious(result.hasPrevious);
    } catch (error) {
      toast.error("Không thể tải danh sách sản phẩm!", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Load categories and brands for filters
  const loadFilters = async () => {
    try {
      setLoadingFilters(true);
      const [categoriesData, brandsData] = await Promise.all([
        CategoryService.getAllCategories(),
        BrandService.getAllBrandsSimple(),
      ]);
      setCategories(categoriesData);
      setBrands(brandsData);
    } catch (error) {
      console.error("Error loading filters:", error);
      toast.error("Không thể tải danh mục và thương hiệu!", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoadingFilters(false);
    }
  };

  useEffect(() => {
    loadProducts();
    loadFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      loadProducts();
      return;
    }

    try {
      setLoading(true);
      const result = await ProductService.searchProducts(
        searchTerm,
        currentPage,
        itemsPerPage
      );
      setProducts(result.products);
      setTotalPages(result.totalPages);
      setTotalElements(result.totalElements);
      setHasNext(result.hasNext);
      setHasPrevious(result.hasPrevious);
    } catch (error) {
      toast.error("Không thể tìm kiếm sản phẩm!", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Client-side filtering (category, brand, price)
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !selectedCategory || product.categoryName === selectedCategory;
    const matchesBrand = !selectedBrand || product.brandName === selectedBrand;
    const matchesPrice =
      (!priceRange.min || product.price >= parseInt(priceRange.min)) &&
      (!priceRange.max || product.price <= parseInt(priceRange.max));

    return matchesCategory && matchesBrand && matchesPrice;
  });

  // --- Sắp xếp ---
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortConfig.field) return 0;
    let aValue: any = a[sortConfig.field as keyof Product];
    let bValue: any = b[sortConfig.field as keyof Product];
    if (typeof aValue === "string") aValue = aValue.toLowerCase();
    if (typeof bValue === "string") bValue = bValue.toLowerCase();

    if (sortConfig.direction === "asc") {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

  // Display products (already paginated from API, but we show filtered/sorted results)
  const displayProducts = sortedProducts;

  const handleSort = (field: string) => {
    setSortConfig((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedBrand("");
    setPriceRange({ min: "", max: "" });
    setSortConfig({ field: "", direction: "asc" });
    setCurrentPage(0);
    loadProducts();
  };


  const handleViewProductDetails = async (product: Product) => {
    try {
      setLoadingDetail(true);
      // Lấy chi tiết sản phẩm từ API
      const productDetail = await ProductService.getProductById(product.id);
      
      // Lưu trực tiếp Product từ API
      setSelectedProduct(productDetail);
      toast.success("Đã tải chi tiết sản phẩm!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error fetching product detail:", error);
      toast.error("Không thể tải chi tiết sản phẩm!", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!token) {
      toast.error("Bạn cần đăng nhập với quyền Administrator!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      return;
    }

    try {
      await ProductService.deleteProductById(productId, token);
      toast.success("Xóa sản phẩm thành công!", {
        position: "top-right",
        autoClose: 2000,
      });
      // Reload products
      await loadProducts();
    } catch (error: any) {
      console.error("Error deleting product:", error);
      
      let errorMessage = "Không thể xóa sản phẩm!";
      if (error.message?.includes("500")) {
        errorMessage += " Lỗi server. Vui lòng kiểm tra quyền admin hoặc liên hệ IT.";
      } else if (error.message?.includes("403")) {
        errorMessage += " Bạn không có quyền thực hiện thao tác này.";
      } else if (error.message?.includes("401")) {
        errorMessage += " Token hết hạn. Vui lòng đăng nhập lại.";
      } else if (error.message?.includes("400")) {
        errorMessage += " Dữ liệu không hợp lệ.";
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  // --- Pagination handlers ---
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (hasPrevious) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNext) {
      setCurrentPage(currentPage + 1);
    }
  };

  // --- Pagination render ---
  const renderPagination = () => {
    const pages = [];
    // API sử dụng page từ 0, nhưng UI hiển thị từ 1
    const displayPage = currentPage + 1;
    
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i - 1)} // Convert to 0-based
          className={`px-3 py-1 border rounded-md text-sm ${
            displayPage === i
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };


  // --- Nếu đang xem chi tiết sản phẩm ---
  if (selectedProduct) {
    // Tìm brandId và categoryId từ name
    const matchedBrand = brands.find(b => b.name === selectedProduct.brandName);
    const matchedCategory = categories.find(c => c.name === selectedProduct.categoryName);
    
    // Convert Product (from API) to ProductDetail (for ProductDetails component)
    const productDetail: ProductDetail = {
      id: selectedProduct.id,
      name: selectedProduct.name,
      description: selectedProduct.description || "",
      brandId: matchedBrand?.id || selectedProduct.brandName || "", // Use ID if found, otherwise use name
      categoryId: matchedCategory?.id || selectedProduct.categoryName || "", // Use ID if found, otherwise use name
      specs: selectedProduct.specs || {},
    };

    // Convert brands và categories to format expected by ProductDetails
    const brandsForDetails = brands.map(b => ({ id: b.id, name: b.name }));
    const categoriesForDetails = categories.map(c => ({ 
      id: c.id, 
      name: c.displayName || c.name 
    }));
    
    return (
      <ProductDetails
        product={productDetail}
        brandName={selectedProduct.brandName}
        categoryName={selectedProduct.categoryName}
        price={selectedProduct.price}
        thumbnailUrl={selectedProduct.thumbnailUrl}
        brands={brandsForDetails}
        categories={categoriesForDetails}
        onSave={async (updatedProduct) => {
          if (!token) {
            toast.error("Bạn cần đăng nhập với quyền Administrator!", {
              position: "top-right",
              autoClose: 3000,
            });
            return;
          }

          try {
            setUpdating(true);

            // Clean specs
            const cleanedSpecs: Record<string, string> = {};
            Object.entries(updatedProduct.specs || {}).forEach(([key, value]) => {
              if (value && typeof value === 'string' && value.trim() !== '') {
                cleanedSpecs[key.trim()] = value.trim();
              }
            });

            // Prepare product data
            const productUpdateData = {
              name: updatedProduct.name.trim(),
              description: updatedProduct.description.trim(),
              brandId: updatedProduct.brandId.trim(),
              categoryId: updatedProduct.categoryId.trim(),
              specs: cleanedSpecs,
              imageUrls: [], // Not used when updating with files
            };

            // Update product (không có file ảnh mới, chỉ update thông tin)
            const updated = await ProductService.updateProductWithFiles(
              updatedProduct.id,
              productUpdateData,
              [], // Không có file ảnh mới
              token
            );

            toast.success("Cập nhật sản phẩm thành công!", {
              position: "top-right",
              autoClose: 2000,
            });

            // Reload products và quay lại danh sách
            await loadProducts();
            setSelectedProduct(null);
          } catch (error: any) {
            console.error("❌ Update product failed:", error);
            
            let errorMessage = "Cập nhật sản phẩm thất bại!";
            if (error.message?.includes("500")) {
              errorMessage += " Lỗi server. Vui lòng kiểm tra quyền admin hoặc liên hệ IT.";
            } else if (error.message?.includes("403")) {
              errorMessage += " Bạn không có quyền thực hiện thao tác này.";
            } else if (error.message?.includes("401")) {
              errorMessage += " Token hết hạn. Vui lòng đăng nhập lại.";
            } else if (error.message?.includes("400")) {
              errorMessage += " Dữ liệu không hợp lệ.";
            }

            toast.error(errorMessage, {
              position: "top-right",
              autoClose: 5000,
            });
          } finally {
            setUpdating(false);
          }
        }}
        onCancel={() => setSelectedProduct(null)}
        updating={updating}
      />
    );
  }
  const handleAddProduct = () =>{
     router.push("/admin-app/products/create")
  }

  // --- Giao diện danh sách sản phẩm ---
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Quản Lý Sản Phẩm
        </h2>
        <button 

        onClick={handleAddProduct}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm">
          <Plus size={18} />
          <span>Thêm Sản Phẩm</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-md border border-gray-300">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, thương hiệu..."
              className="pl-9 pr-3 py-2 w-full border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleSearchKeyPress}
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <Search size={18} />
            <span>Tìm kiếm</span>
          </button>

          <select
            className="px-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-gray-800"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            disabled={loadingFilters}
          >
            <option value="">Tất cả danh mục</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.displayName || category.name}
              </option>
            ))}
          </select>

          <select
            className="px-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-gray-800"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            disabled={loadingFilters}
          >
            <option value="">Tất cả thương hiệu</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>

          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Giá từ"
              className="px-3 py-2 border border-gray-400 rounded-lg w-full focus:ring-2 focus:ring-blue-500 text-sm text-gray-800"
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange({ ...priceRange, min: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Đến"
              className="px-3 py-2 border border-gray-400 rounded-lg w-full focus:ring-2 focus:ring-blue-500 text-sm text-gray-800"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({ ...priceRange, max: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-300">
          <span>Tìm thấy {displayProducts.length} sản phẩm / Tổng {totalElements} sản phẩm</span>
          <button
            onClick={clearFilters}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm"
          >
            Xóa bộ lọc
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col min-h-[495px]">
        {loading ? (
          <div className="flex items-center justify-center min-h-[495px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Đang tải danh sách sản phẩm...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto">
              <table className="w-full table-fixed">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="w-20 px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                      ID
                    </th>
                    <th className="w-24 px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                      Ảnh
                    </th>
                    <th
                      className="w-1/4 px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Tên</span>
                        <ArrowUpDown size={14} />
                      </div>
                    </th>
                    <th className="w-32 px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                      Thương Hiệu
                    </th>
                    <th className="w-32 px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                      Danh Mục
                    </th>
                    <th
                      className="w-28 px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase cursor-pointer"
                      onClick={() => handleSort("price")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Giá</span>
                        <ArrowUpDown size={14} />
                      </div>
                    </th>
                    <th className="w-28 px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                      Thao Tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {displayProducts.length > 0 ? (
                    displayProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-2 text-sm text-gray-900 truncate">
                          {product.id.substring(0, 8)}...
                        </td>
                        <td className="px-4 py-2">
                          <ProductImageCell product={product} />
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900 truncate">
                          {product.name}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600">
                          {product.brandName}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600">
                          {product.categoryName}
                        </td>
                        <td className="px-4 py-2 text-sm font-semibold text-gray-900">
                          {formatPrice(product.price)}
                        </td>
                        <td className="px-4 py-2 text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              className="text-green-600 hover:text-green-900 disabled:opacity-50"
                              title="Xem chi tiết"
                              onClick={() => handleViewProductDetails(product)}
                              disabled={loadingDetail}
                            >
                              {loadingDetail ? (
                                <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <Eye size={16} />
                              )}
                            </button>

                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Xóa"
                            >
                              <Trash2 size={16} />
                            </button>


                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-6 text-center text-sm text-gray-500"
                      >
                        Không có sản phẩm nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-3 border-t border-gray-200 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Trang {currentPage + 1}/{totalPages || 1} — Tổng{" "}
                {totalElements} sản phẩm
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={handlePreviousPage}
                  disabled={!hasPrevious}
                  className="px-3 py-1 border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed text-black"
                >
                  Trước
                </button>
                {renderPagination()}
                <button
                  onClick={handleNextPage}
                  disabled={!hasNext}
                  className="px-3 py-1 border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed text-black"
                >
                  Sau
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
