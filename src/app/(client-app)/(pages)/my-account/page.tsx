
import React from "react";
import ProtectedRoute from "../../../../components/client/Auth/ProtectedRoute";
import { Metadata } from "next";
import UserDashboard from "../../../../components/client/MyAccount";

export const metadata: Metadata = {
  title: "My Account | NextCommerce Nextjs E-commerce template",
  description: "This is My Account page for NextCommerce Template",
};

const MyAccountPage = () => {
  return (
    <ProtectedRoute>
      <main>
        <UserDashboard />
      </main>
    </ProtectedRoute>
  );
};

export default MyAccountPage;
