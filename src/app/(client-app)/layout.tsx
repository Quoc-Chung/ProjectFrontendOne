"use client";

import { useState, useEffect } from "react";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import "react-toastify/dist/ReactToastify.css"; // 👈 thêm dòng này
import Header from "@/components/client/Header";
import Footer from "@/components/client/Footer";
import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import QuickViewModal from "@/components/client/Common/QuickViewModal";
import CartSidebarModal from "@/components/client/Common/CartSidebarModal";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import PreviewSliderModal from "@/components/client/Common/PreviewSlider";
import ScrollToTop from "@/components/client/Common/ScrollToTop";
import PreLoader from "@/components/client/Common/PreLoader";
import ReduxProvider from "../../utils/Provider/ReduxProvider";
import { ToastContainer } from "react-toastify"; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <ReduxProvider>
          {loading ? (
            <PreLoader />
          ) : (
            <>
              <CartModalProvider>
                <ModalProvider>
                  <PreviewSliderProvider>
                    <Header />
                    {children}

                    <QuickViewModal />
                    <CartSidebarModal />
                    <PreviewSliderModal />
                  </PreviewSliderProvider>
                </ModalProvider>
              </CartModalProvider>
              <ScrollToTop />
              <Footer />
            </>
          )}

          {/* 👇 Thêm ToastContainer ở đây */}
          <ToastContainer
            position="top-right" 
            autoClose={1000}       
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"       
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
