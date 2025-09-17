import Home from "@/components/client/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextCommerce | Nextjs E-commerce template",
  description: "This is Home for NextCommerce Template",
};

export default function HomePageClient() {
  return (
    <>
      <Home />
    </>
  );
}
