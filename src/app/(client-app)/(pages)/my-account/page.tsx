
import React from "react";

import { Metadata } from "next";
import UserDashboard from "../../../../components/client/MyAccount";
export const metadata: Metadata = {
  title: "My Account | NextCommerce Nextjs E-commerce template",
  description: "This is My Account page for NextCommerce Template",
};

const MyAccountPage = () => {
  return (
    <main>
      <UserDashboard />
    </main>
  );
};

export default MyAccountPage;
