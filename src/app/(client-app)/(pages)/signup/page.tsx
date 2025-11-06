import Signup from "@/components/client/Auth/Signup";
import React from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Đăng ký | NextCommerce",
  description: "Trang đăng ký NextCommerce",
};

const SignupPage = () => {
  return (
    <main>
      <Signup />
    </main>
  );
};

export default SignupPage;
