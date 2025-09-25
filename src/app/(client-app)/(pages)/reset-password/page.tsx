
import React from "react";
import { Metadata } from "next";
import ResetForgetPassword from "../../../../components/client/Auth/ResetPassword";
export const metadata: Metadata = {
  title: "Import email use forget password Page | NextCommerce Nextjs E-commerce template",
  description: "This is Import Email Page for NextCommerce Template",
};
/* /reset-password */ 
const ResetPassword = () => {
  return (
    <main>
      <ResetForgetPassword />
    </main>
  );
};
export default ResetPassword;
