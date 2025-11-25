import React from "react";
import Checkout from "@/components/client/Checkout";
import ProtectedRoute from "../../../../components/client/Auth/ProtectedRoute";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đặt hàng | NextCommerce",
  description: "Trang đặt hàng NextCommerce",
};

const CheckoutPage = () => {
  return (
    <ProtectedRoute>
      <main>
        <Checkout />
      </main>
    </ProtectedRoute>
  );
};

export default CheckoutPage;
