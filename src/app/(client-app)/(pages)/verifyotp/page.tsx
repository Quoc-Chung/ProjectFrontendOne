import Signin from "@/components/client/Auth/Signin";
import React from "react";
import { Metadata } from "next";
import VarifierOTp from "../../../../components/client/Auth/VerifyOtp";
export const metadata: Metadata = {
  title: "Verify Otp Page | NextCommerce Nextjs E-commerce template",
  description: "Verify forget password NextCommerce Template",
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
