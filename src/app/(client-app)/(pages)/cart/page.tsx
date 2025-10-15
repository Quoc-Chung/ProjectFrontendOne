import React from "react";
import Cart from "@/components/client/Cart";
import ProtectedRoute from "../../../../components/client/Auth/ProtectedRoute";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart Page | NextCommerce Nextjs E-commerce template",
  description: "This is Cart Page for NextCommerce Template",
};

const CartPage = () => {
  return (
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>
  );
};

export default CartPage;
