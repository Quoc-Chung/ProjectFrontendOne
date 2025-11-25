"use client";

import React, { useEffect } from "react";
import CategoryManagement from "../../../../../components/admin/CategoryManagement";

const CategoryManagementPage = () => {
  useEffect(() => {
    document.title = "NextCommerce | Quản lý danh mục";
  }, []);

  return <CategoryManagement />;
};

export default CategoryManagementPage;

