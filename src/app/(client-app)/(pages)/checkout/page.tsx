import React from "react";
import Checkout from "@/components/client/Checkout";
import ProtectedRoute from "../../../../components/client/Auth/ProtectedRoute";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout Page | NextCommerce Nextjs E-commerce template",
  description: "This is Checkout Page for NextCommerce Template",
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
