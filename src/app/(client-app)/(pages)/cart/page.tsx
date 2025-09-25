import React from "react";
import Cart from "@/components/client/Cart";

import { Metadata } from "next";
import PrivateRoute from "../../../../components/client/Auth/PrivateRouter/PrivateRoute";
export const metadata: Metadata = {
  title: "Cart Page | NextCommerce Nextjs E-commerce template",
  description: "This is Cart Page for NextCommerce Template",
};

const CartPage = () => {
  return (
    <>
       <PrivateRoute>
      <Cart />
      </PrivateRoute>
    </>
  );
};

export default CartPage;
