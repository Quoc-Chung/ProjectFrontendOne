import React from "react";
import ToastTest from "@/components/client/ToastTest";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toast Test | NextCommerce",
  description: "Test toast functionality",
};

const ToastTestPage = () => {
  return (
    <main>
      <ToastTest />
    </main>
  );
};

export default ToastTestPage;
