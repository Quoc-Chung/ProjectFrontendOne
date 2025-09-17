"use client"
import React, { useState } from "react";
import { Edit, Save, X, ArrowLeft } from "lucide-react";
import { ProductDetail } from "@/types/Admin";

interface ProductDetailsProps {
  product: ProductDetail;
  brands: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  onSave: (updatedProduct: ProductDetail) => void;
  onCancel: () => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  brands,
  categories,
  onSave,
  onCancel,
}) => {
  const [editableProduct, setEditableProduct] = useState<ProductDetail>({
    ...product,
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleChange = (field: string, value: string) => {
    if (field in editableProduct.specs) {
      setEditableProduct({
        ...editableProduct,
        specs: { ...editableProduct.specs, [field]: value },
      });
    } else {
      setEditableProduct({ ...editableProduct, [field]: value });
    }
  };

  const handleSave = () => {
    onSave(editableProduct);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onCancel}
          className="flex items-center px-3 py-1 text-gray-800 hover:text-black text-sm font-medium transition-colors"
        >
          <ArrowLeft size={18} className="mr-1" /> Quay lại
        </button>
        <h2 className="text-3xl font-bold text-black">Chi Tiết Sản Phẩm</h2>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm transition-colors"
              >
                <Save size={16} className="mr-1" /> Lưu
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditableProduct(product);
                }}
                className="flex items-center px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-lg font-medium text-sm transition-colors"
              >
                <X size={16} className="mr-1" /> Hủy
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
            >
              <Edit size={16} className="mr-1" /> Chỉnh sửa
            </button>
          )}
        </div>
      </div>

      {/* Product Card */}
      <div className="bg-gray-50 p-6 rounded-xl shadow-md space-y-6">
        {/* Name */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
          <label className="w-36 font-semibold text-black text-sm">Tên sản phẩm:</label>
          {isEditing ? (
            <input
              type="text"
              value={editableProduct.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-black text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <span className="text-black font-medium text-sm">{product.name}</span>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
          <label className="w-36 font-semibold text-black text-sm">Mô tả:</label>
          {isEditing ? (
            <textarea
              value={editableProduct.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-black text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          ) : (
            <p className="text-black text-sm">{product.description}</p>
          )}
        </div>

        {/* Brand & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
            <label className="w-36 font-semibold text-black text-sm">Thương hiệu:</label>
            {isEditing ? (
              <select
                value={editableProduct.brandId}
                onChange={(e) => handleChange("brandId", e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-black text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-black font-medium text-sm">
                {brands.find((b) => b.id === product.brandId)?.name}
              </span>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
            <label className="w-36 font-semibold text-black text-sm">Danh mục:</label>
            {isEditing ? (
              <select
                value={editableProduct.categoryId}
                onChange={(e) => handleChange("categoryId", e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-black text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-black font-medium text-sm">
                {categories.find((c) => c.id === product.categoryId)?.name}
              </span>
            )}
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-4">
            <label className="w-36 font-semibold text-black text-sm">RAM:</label>
            {isEditing ? (
              <input
                type="text"
                value={editableProduct.specs.ram}
                onChange={(e) => handleChange("ram", e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-black text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <span className="px-2 py-1 bg-gray-200 rounded-md text-black text-sm font-medium">
                {product.specs.ram}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <label className="w-36 font-semibold text-black text-sm">Dung lượng:</label>
            {isEditing ? (
              <input
                type="text"
                value={editableProduct.specs.storage}
                onChange={(e) => handleChange("storage", e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-black text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <span className="px-2 py-1 bg-gray-200 rounded-md text-black text-sm font-medium">
                {product.specs.storage}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
