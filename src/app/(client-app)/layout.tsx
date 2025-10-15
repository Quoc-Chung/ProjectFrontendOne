"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import Header from "@/components/client/Header";
import Footer from "@/components/client/Footer";
import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { ChatAIModalProvider } from "../context/ChatAIModalContext";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import ScrollToTop from "@/components/client/Common/ScrollToTop";
import PreLoader from "@/components/client/Common/PreLoader";
import ReduxProvider from "../../utils/Provider/ReduxProvider";

// Lazy load CSS and heavy components
const ToastContainer = dynamic(() => import("react-toastify").then(mod => ({ default: mod.ToastContainer })), {
  ssr: false,
  loading: () => null,
});

// Lazy load heavy components
const QuickViewModal = dynamic(() => import("@/components/client/Common/QuickViewModal"), {
  ssr: false,
  loading: () => null,
});

const CartSidebarModal = dynamic(() => import("@/components/client/Common/CartSidebarModal"), {
  ssr: false,
  loading: () => null,
});

const ChatAIModal = dynamic(() => import("@/components/client/ChatAIModal"), {
  ssr: false,
  loading: () => null,
});

const FloatingChatButton = dynamic(() => import("@/components/client/ChatAIModal/FloatingButton"), {
  ssr: false,
  loading: () => null,
});

const PreviewSliderModal = dynamic(() => import("@/components/client/Common/PreviewSlider"), {
  ssr: false,
  loading: () => null,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load react-toastify CSS dynamically
    const loadToastifyCSS = () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/react-toastify@11.0.5/dist/ReactToastify.css';
      document.head.appendChild(link);
    };

    // Load CSS after initial render
    setTimeout(() => {
      loadToastifyCSS();
      setLoading(false);
    }, 300);
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
                <ChatAIModalProvider>
                  <ModalProvider>
                    <PreviewSliderProvider>
                      <Header />
                      <Suspense fallback={<div>Loading...</div>}>
                        {children}
                      </Suspense>
                      
                      {/* Lazy loaded modals */}
                      <Suspense fallback={null}>
                        <QuickViewModal />
                        <CartSidebarModal />
                        <ChatAIModal />
                        <FloatingChatButton />
                        <PreviewSliderModal />
                      </Suspense>
                    </PreviewSliderProvider>
                  </ModalProvider>
                </ChatAIModalProvider>
              </CartModalProvider>
              <ScrollToTop />
              <Footer />
            </>
          )}

          {/* ToastContainer - lazy loaded */}
          <Suspense fallback={null}>
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
          </Suspense>
        </ReduxProvider>
      </body>
    </html>
  );
}
