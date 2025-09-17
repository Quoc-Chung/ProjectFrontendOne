import React from "react";
import { Wishlist } from "@/components/client/Wishlist";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist Page | NextCommerce Nextjs E-commerce template",
  description: "This is Wishlist Page for NextCommerce Template",
};

const WishlistPage = () => {
  return (
    <main>
      <Wishlist />
    </main>
  );
};

export default WishlistPage;
