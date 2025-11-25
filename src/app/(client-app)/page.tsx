import Home from "@/components/client/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextCommerce | Trang chủ",
  description: "Trang chủ NextCommerce - Mua sắm trực tuyến",
};

export default function HomePageClient() {
  return (
    <>
      <Home />
    </>
  );
}
