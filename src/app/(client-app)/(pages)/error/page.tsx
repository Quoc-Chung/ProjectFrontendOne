import React from "react";
import Error from "@/components/client/Error";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Lỗi | NextCommerce",
  description: "Trang lỗi NextCommerce",
};

const ErrorPage = () => {
  return (
    <main>
      <Error />
    </main>
  );
};

export default ErrorPage;
