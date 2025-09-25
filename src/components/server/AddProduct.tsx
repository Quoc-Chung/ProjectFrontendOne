"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Category } from "../../types/Client/Category/Category";
import { Branch } from "../../types/Client/Branch/Branch";


const AddProduct = () => {
  const router = useRouter();


  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brandId: "",
    categoryId: "",
  });


  const [lstBrand, setListBrand] = useState<Branch[]>([]);
  const [lstCategory, setListCategory] = useState<Category[]>([]);


  const [specs, setSpecs] = useState([
    { key: "CPU", value: "" },
    { key: "RAM", value: "" },
    { key: "SSD", value: "" },
  ]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCategory = await fetch(
          "http://localhost:8080/services/product-service/api/categories"
        );
        const dataCategory = await resCategory.json();
        setListCategory(dataCategory.data || []);

        const resBrand = await fetch(
          "http://localhost:8080/services/product-service/api/brands"
        );
        const dataBrand = await resBrand.json();
        setListBrand(dataBrand.data?.content || []);
      } catch (error) {
        console.error("Lỗi khi load dữ liệu:", error);
      }
    };

    fetchData();
  }, []);


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const addSpec = () => {
    setSpecs([...specs, { key: "", value: "" }]);
  };

  const removeSpec = (index: number) => {
    if (specs.length > 1) {
      const newSpecs = specs.filter((_, i) => i !== index);
      setSpecs(newSpecs);
    }
  };

  const handleSpecChange = (index: number, field: string, value: string) => {
    const newSpecs = [...specs];
    (newSpecs[index] as any)[field] = value;
    setSpecs(newSpecs);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const specsObject: Record<string, string> = {};
    specs.forEach((spec) => {
      if (spec.key && spec.value) {
        specsObject[spec.key] = spec.value;
      }
    });

    const productPayload = {
      ...formData,
      specs: specsObject,
    };

    console.log("Payload gửi lên server:", productPayload);

  };

  const QuayLai = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={QuayLai}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-4 group"
          >
            <svg
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Quay lại
          </button>
          <h1 className="text-center text-3xl font-bold">
            Thêm sản phẩm mới
          </h1>
          <p className="text-gray-600 mt-2">
            Điền thông tin chi tiết để thêm sản phẩm vào hệ thống
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Thông tin cơ bản */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Thông tin cơ bản
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên sản phẩm <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Nhập tên sản phẩm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="brandId"
                    value={formData.brandId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-gray-800"
                    required
                  >
                    <option value=""> Chọn Brand </option>
                    {lstBrand.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả sản phẩm <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Nhập mô tả chi tiết về sản phẩm"
                  required
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-gray-800"
                  required
                >
                  <option value=""> Chọn Category</option>
                  {lstCategory.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Thông số kỹ thuật
                </h2>
                <button
                  type="button"
                  onClick={addSpec}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 flex items-center text-sm"
                >
                  + Thêm thông số
                </button>
              </div>

              <div className="space-y-4">
                {specs.map((spec, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-center p-4 bg-gray-50 rounded-lg"
                  >
                    <input
                      type="text"
                      value={spec.key}
                      onChange={(e) =>
                        handleSpecChange(index, "key", e.target.value)
                      }
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="Tên thông số (VD: CPU, GPU...)"
                      required
                    />
                    <input
                      type="text"
                      value={spec.value}
                      onChange={(e) =>
                        handleSpecChange(index, "value", e.target.value)
                      }
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="Giá trị (VD: Intel i7, 16GB...)"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeSpec(index)}
                      disabled={specs.length <= 1}
                      className={`p-3 rounded-lg ${
                        specs.length <= 1
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-red-100 text-red-600 hover:bg-red-200"
                      }`}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700"
              >
                Thêm sản phẩm
              </button>
              <button
                type="button"
                onClick={QuayLai}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-red-500"
              >
                Hủy bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
