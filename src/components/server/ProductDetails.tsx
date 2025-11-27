"use client"
import React, { useState } from "react";
import { Edit, Save, X, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { ProductDetail } from "@/types/Admin";
import Image from "next/image";

// Danh sách tất cả các trường specs có thể có
const AVAILABLE_SPEC_KEYS = [
  "CPU",
  "Display",
  "RAM",
  "SSD",
  "Size",
  "Panel",
  "Resolution",
  "Refresh Rate",
  "Socket",
  "Chipset",
  "Form Factor",
  "Type",
  "Speed",
  "Bus",
  "Memory",
];

interface ProductDetailsProps {
  product: ProductDetail;
  brandName?: string;
  categoryName?: string;
  price?: number;
  thumbnailUrl?: string | null;
  brands: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  onSave: (updatedProduct: ProductDetail) => void;
  onCancel: () => void;
  updating?: boolean;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  brandName,
  categoryName,
  price,
  thumbnailUrl,
  brands,
  categories,
  onSave,
  onCancel,
  updating = false,
}) => {
  const [editableProduct, setEditableProduct] = useState<ProductDetail>({
    ...product,
    specs: product.specs ? { ...product.specs } : {},
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newSpecKey, setNewSpecKey] = useState<string>("");
  const [newSpecValue, setNewSpecValue] = useState<string>("");

  const handleChange = (field: string, value: string) => {
    if (field === "name" || field === "description" || field === "brandId" || field === "categoryId") {
      setEditableProduct({ ...editableProduct, [field]: value });
    } else {
      // Update specs
      setEditableProduct({
        ...editableProduct,
        specs: { ...editableProduct.specs, [field]: value },
      });
    }
  };

  const handleAddSpec = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setEditableProduct({
        ...editableProduct,
        specs: {
          ...editableProduct.specs,
          [newSpecKey.trim()]: newSpecValue.trim(),
        },
      });
      setNewSpecKey("");
      setNewSpecValue("");
    }
  };

  const handleRemoveSpec = (key: string) => {
    const newSpecs = { ...editableProduct.specs };
    delete newSpecs[key];
    setEditableProduct({
      ...editableProduct,
      specs: newSpecs,
    });
  };

  // Lấy tất cả các specs keys (có giá trị + chưa có giá trị)
  const getAllSpecKeys = (): string[] => {
    const existingKeys = Object.keys(editableProduct.specs || {});
    const allKeysSet = new Set([...AVAILABLE_SPEC_KEYS, ...existingKeys]);
    return Array.from(allKeysSet).sort();
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
                disabled={updating}
                className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></div>
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <Save size={16} className="mr-1" /> Lưu
                  </>
                )}
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

        {/* Thumbnail Image */}
        {thumbnailUrl && (
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
            <label className="w-36 font-semibold text-black text-sm">Hình ảnh:</label>
            <div className="flex-1">
              <Image
                src={thumbnailUrl}
                alt={product.name}
                width={200}
                height={200}
                className="rounded-lg object-cover border border-gray-300"
              />
            </div>
          </div>
        )}

        {/* Price */}
        {price !== undefined && (
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
            <label className="w-36 font-semibold text-black text-sm">Giá:</label>
            <span className="text-black font-medium text-lg">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(price)}
            </span>
          </div>
        )}

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
                <option value="">Chọn thương hiệu</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-black font-medium text-sm">
                {brandName || brands.find((b) => b.id === product.brandId)?.name || product.brandId || "Chưa có"}
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
                <option value="">Chọn danh mục</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-black font-medium text-sm">
                {categoryName || categories.find((c) => c.id === product.categoryId)?.name || product.categoryId || "Chưa có"}
              </span>
            )}
          </div>
        </div>

        {/* Specs - Display all available specs */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="w-full font-semibold text-black text-sm">Thông số kỹ thuật:</label>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  const key = prompt("Nhập tên thông số mới:");
                  if (key && key.trim()) {
                    setNewSpecKey(key.trim());
                  }
                }}
                className="flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs transition-colors"
              >
                <Plus size={14} className="mr-1" />
                Thêm thông số
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getAllSpecKeys().map((key) => {
              const value = editableProduct.specs?.[key] || "";
              const hasValue = value && value.trim() !== "";

              // Chỉ hiển thị nếu có giá trị hoặc đang edit
              if (!hasValue && !isEditing) {
                return null;
              }

              return (
                <div key={key} className="flex items-center space-x-4">
                  <label className="w-36 font-semibold text-black text-sm">{key}:</label>
                  {isEditing ? (
                    <div className="flex-1 flex items-center space-x-2">
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(key, e.target.value)}
                        placeholder="Nhập giá trị..."
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-black text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {hasValue && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSpec(key)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa thông số"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ) : (
                    <span className="px-2 py-1 bg-gray-200 rounded-md text-black text-sm font-medium">
                      {value || "-"}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Add new custom spec */}
          {isEditing && newSpecKey && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <label className="font-semibold text-black text-sm">Thêm thông số mới:</label>
                <span className="text-blue-700 font-medium">{newSpecKey}</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newSpecValue}
                  onChange={(e) => setNewSpecValue(e.target.value)}
                  placeholder="Nhập giá trị..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-black text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSpec();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddSpec}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  Thêm
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNewSpecKey("");
                    setNewSpecValue("");
                  }}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-lg text-sm transition-colors"
                >
                  Hủy
                </button>
              </div>
            </div>
          )}

          {/* Display custom specs (not in AVAILABLE_SPEC_KEYS) */}
          {Object.keys(editableProduct.specs || {})
            .filter((key) => !AVAILABLE_SPEC_KEYS.includes(key))
            .map((key) => {
              const value = editableProduct.specs?.[key] || "";
              if (!value || value.trim() === "") return null;

              return (
                <div key={key} className="flex items-center space-x-4 mt-2">
                  <label className="w-36 font-semibold text-black text-sm">{key}:</label>
                  {isEditing ? (
                    <div className="flex-1 flex items-center space-x-2">
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-black text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSpec(key)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa thông số"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ) : (
                    <span className="px-2 py-1 bg-gray-200 rounded-md text-black text-sm font-medium">
                      {value}
                    </span>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
