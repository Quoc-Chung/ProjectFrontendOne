import Signin from "@/components/client/Auth/Signin";
import React from "react";
import { Metadata } from "next";
import VarifierOTp from "../../../../components/client/Auth/VerifyOtp";
export const metadata: Metadata = {
  title: "Xác thực OTP | NextCommerce",
  description: "Trang xác thực OTP NextCommerce",
};

/* /verifyotp */
const VerifyOTP = () => {
  return (
    <main>
      <VarifierOTp />
    </main>
  );
};

export default VerifyOTP;
