"use client";

import React, { useEffect } from "react";
import CreateProduct from "../../../../../components/admin/CreateProduct";

const CreateProductPage = () => {
  useEffect(() => {
    document.title = "NextCommerce | Tạo sản phẩm mới";
  }, []);

  return <CreateProduct />;
};

export default CreateProductPage;