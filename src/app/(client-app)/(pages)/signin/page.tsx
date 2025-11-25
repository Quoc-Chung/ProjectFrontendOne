import Signin from "@/components/client/Auth/Signin";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Đăng nhập | NextCommerce",
  description: "Trang đăng nhập NextCommerce",
};

const SigninPage = () => {
  return (
    <main>
      <Signin />
    </main>
  );
};

export default SigninPage;
