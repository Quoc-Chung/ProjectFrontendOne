"use client"
import React, { useState } from "react";
import {
  Search,
  Plus,
  Trash2,
  Eye,
  ArrowUpDown,
} from "lucide-react";
import { Product, ProductDetail, SortConfig } from "@/types/Admin";
import { formatPrice } from '../../utils/helpers';
import Image from "next/image";
import { ProductDetails } from "./ProductDetails"; 

interface ProductManagementProps {
  products: Product[];
  onDeleteProduct: (id: string) => void;
}

const ProductManagement: React.FC<ProductManagementProps> = ({
  products,
  onDeleteProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");

  const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({
    min: "",
    max: "",
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: "",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // để chuyển sang detail

  const itemsPerPage = 5;


  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brandName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.categoryName === selectedCategory;
    const matchesBrand = !selectedBrand || product.brandName === selectedBrand;
    const matchesPrice =
      (!priceRange.min || product.price >= parseInt(priceRange.min)) &&
      (!priceRange.max || product.price <= parseInt(priceRange.max));

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
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

  // --- Phân trang ---
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
    setCurrentPage(1);
  };

  // --- Hàm chuyển sang Product Detail ---
  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  // --- Pagination render ---
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 border rounded-md text-sm ${
            currentPage === i
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
    const productDetail: ProductDetail = {
      id: selectedProduct.id,
      name: selectedProduct.name,
      description: selectedProduct.description || "",
      brandId: selectedProduct.brandName || "",
      categoryId: selectedProduct.categoryName || "",
      specs: selectedProduct.specs || { ram: "", storage: "" },
    };

    
    return (
      <ProductDetails
        product={productDetail}
        brands={[
          { id: "1", name: "Apple" },
          { id: "2", name: "Dell" },
          { id: "3", name: "ASUS" },
        ]}
        categories={[
          { id: "1", name: "Laptop cao cấp" },
          { id: "2", name: "Laptop văn phòng" },
        ]}
        onSave={(updatedProduct) => {
          console.log("Updated product:", updatedProduct);
          setSelectedProduct(null); // quay lại danh sách
        }}
        onCancel={() => setSelectedProduct(null)}
      />
    );
  }

  // --- Giao diện danh sách sản phẩm ---
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Quản Lý Sản Phẩm
        </h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm">
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
            />
          </div>

          <select
            className="px-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-gray-800"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Tất cả danh mục</option>
            <option value="Laptop cao cấp">Laptop cao cấp</option>
            <option value="Laptop văn phòng">Laptop văn phòng</option>
          </select>

          <select
            className="px-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-gray-800"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">Tất cả thương hiệu</option>
            <option value="Apple">Apple</option>
            <option value="Dell">Dell</option>
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
          <span>Tìm thấy {filteredProducts.length} sản phẩm</span>
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
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2 text-sm text-gray-900 truncate">
                      {product.id}
                    </td>
                    <td className="px-4 py-2">
                      <Image
                        src={product.thumbnailUrl}
                        alt={product.name}
                        width={56}
                        height={40}
                        unoptimized
                        className="object-cover rounded-md"
                      />
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
                          className="text-green-600 hover:text-green-900"
                          title="Xem chi tiết"
                          onClick={() => handleViewProductDetails(product)}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => onDeleteProduct(product.id)}
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
            Trang {currentPage}/{totalPages || 1} — Tổng{" "}
            {sortedProducts.length} sản phẩm
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-md text-sm disabled:opacity-50 text-black"
            >
              Trước
            </button>
            {renderPagination()}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-md text-sm disabled:opacity-50 text-black"
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
