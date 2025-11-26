"use client";
/**
 * Example usage of CheckoutDialog component
 * 
 * This file demonstrates how to use the CheckoutDialog component
 * in your application. You can integrate this into your Cart page
 * or any other page where you want to show the checkout dialog.
 */

import React, { useState } from "react";
import CheckoutDialog from "./CheckoutDialog";

const CheckoutDialogExample = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Checkout Dialog Example</h1>
      
      {/* Button to open checkout dialog */}
      <button
        onClick={() => setIsCheckoutOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
      >
        Process to Checkout
      </button>

      {/* Checkout Dialog */}
      <CheckoutDialog
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
};

export default CheckoutDialogExample;

