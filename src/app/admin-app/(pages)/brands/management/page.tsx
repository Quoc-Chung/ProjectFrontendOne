"use client";

import React, { useEffect } from "react";
import BrandManagement from "../../../../../components/admin/BrandManagement";

const BrandManagementPage = () => {
  useEffect(() => {
    document.title = "NextCommerce | Quản lý thương hiệu";
  }, []);

  return <BrandManagement />;
};

export default BrandManagementPage;

