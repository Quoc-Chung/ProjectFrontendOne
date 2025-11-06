import React from "react";
import MailSuccess from "@/components/client/MailSuccess";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Gửi email thành công | NextCommerce",
  description: "Trang xác nhận gửi email thành công NextCommerce",
};

const MailSuccessPage = () => {
  return (
    <main>
      <MailSuccess />
    </main>
  );
};

export default MailSuccessPage;
