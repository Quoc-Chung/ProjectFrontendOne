import Contact from "@/components/client/Contact";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Liên hệ | NextCommerce",
  description: "Trang liên hệ NextCommerce",
};

const ContactPage = () => {
  return (
    <main>
      <Contact />
    </main>
  );
};

export default ContactPage;
