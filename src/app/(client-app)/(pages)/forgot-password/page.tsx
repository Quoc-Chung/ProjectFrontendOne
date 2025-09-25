import Signin from "@/components/client/Auth/Signin";
import React from "react";
import { Metadata } from "next";
import ForgetPassword from "../../../../components/client/Auth/ForgotPassword";
export const metadata: Metadata = {
  title: "Import email use forget password Page | NextCommerce Nextjs E-commerce template",
  description: "This is Import Email Page for NextCommerce Template",
};

const ForgetPasswordPage = () => {
  return (
    <main>
      <ForgetPassword />
    </main>
  );
};

export default ForgetPasswordPage;
