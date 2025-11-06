
import React from "react";
import { Metadata } from "next";
import ResetForgetPassword from "../../../../components/client/Auth/ResetPassword";
export const metadata: Metadata = {
  title: "Đặt lại mật khẩu | NextCommerce",
  description: "Trang đặt lại mật khẩu NextCommerce",
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
