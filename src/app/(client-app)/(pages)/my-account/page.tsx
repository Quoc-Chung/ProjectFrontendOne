
import React from "react";
import ProtectedRoute from "../../../../components/client/Auth/ProtectedRoute";
import { Metadata } from "next";
import UserDashboard from "../../../../components/client/MyAccount";

export const metadata: Metadata = {
  title: "Tài khoản của tôi | NextCommerce",
  description: "Trang tài khoản cá nhân NextCommerce",
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
