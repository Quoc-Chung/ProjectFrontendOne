import React from "react";
import ToastTest from "@/components/client/ToastTest";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kiểm tra Toast | NextCommerce",
  description: "Trang kiểm tra chức năng toast",
};

const ToastTestPage = () => {
  return (
    <main>
      <ToastTest />
    </main>
  );
};

export default ToastTestPage;
