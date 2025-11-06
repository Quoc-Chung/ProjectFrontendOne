import Signin from "@/components/client/Auth/Signin";
import React from "react";
import { Metadata } from "next";
import ForgetPassword from "../../../../components/client/Auth/ForgotPassword";
export const metadata: Metadata = {
  title: "Quên mật khẩu | NextCommerce",
  description: "Trang quên mật khẩu NextCommerce",
};

const ForgetPasswordPage = () => {
  return (
    <main>
      <ForgetPassword />
    </main>
  );
};

export default ForgetPasswordPage;
