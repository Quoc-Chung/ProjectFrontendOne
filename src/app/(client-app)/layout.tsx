"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { usePreloadImportantPages } from "@/hooks/usePreloadImportantPages";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import "../css/hydration-fix.css";
import Header from "@/components/client/Header";
import Footer from "@/components/client/Footer";
import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { ChatAIModalProvider } from "../context/ChatAIModalContext";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import ScrollToTop from "@/components/client/Common/ScrollToTop";
import RouterLoading from "@/components/client/Common/RouterLoading";
import PagePreloader from "@/components/client/Common/PagePreloader";
import ReduxProvider from "../../utils/Provider/ReduxProvider";
import ChunkErrorBoundary from "@/components/client/Common/ChunkErrorBoundary";
import { ChunkLoader } from "../../utils/chunkLoader";

const ToastContainer = dynamic(() => 
  ChunkLoader.loadChunk(() => import("react-toastify").then(mod => ({ default: mod.ToastContainer })), 'toastify')
    .catch(() => ({ default: () => null })), 
  {
    ssr: false,
    loading: () => null,
  }
);

const QuickViewModal = dynamic(() => 
  ChunkLoader.loadChunk(() => import("@/components/client/Common/QuickViewModal"), 'quickview')
    .catch(() => ({ default: () => null })), 
  {
    ssr: false,
    loading: () => null,
  }
);

const CartSidebarModal = dynamic(() => 
  ChunkLoader.loadChunk(() => import("@/components/client/Common/CartSidebarModal"), 'cartsidebar')
    .catch(() => ({ default: () => null })), 
  {
    ssr: false,
    loading: () => null,
  }
);

const ChatAIModal = dynamic(() => 
  ChunkLoader.loadChunk(() => import("@/components/client/ChatAIModal"), 'chatai')
    .catch(() => ({ default: () => null })),
  {
    ssr: false,
    loading: () => null,
  }
);

const FloatingChatButton = dynamic(() => 
  ChunkLoader.loadChunk(() => import("@/components/client/ChatAIModal/FloatingButton"), 'floatingchat')
    .catch(() => ({ default: () => null })), 
  {
    ssr: false,
    loading: () => null,
  }
);

const PreviewSliderModal = dynamic(() => 
  ChunkLoader.loadChunk(() => import("@/components/client/Common/PreviewSlider"), 'previewslider')
    .catch(() => ({ default: () => null })), // Fallback component
  {
    ssr: false,
    loading: () => null,
  }
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Preload các trang quan trọng
  usePreloadImportantPages();

  useEffect(() => {
    // Chỉ chạy trên client side để tránh hydration mismatch
    if (typeof window === 'undefined') return;

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
    }, 300);

    // Ẩn Next.js development indicator overlay - chỉ trên client
    const hideDevIndicator = () => {
      // Kiểm tra xem đã có style này chưa
      const existingStyle = document.getElementById('hide-nextjs-indicator');
      if (existingStyle) return;

      const style = document.createElement('style');
      style.id = 'hide-nextjs-indicator';
      style.textContent = `
        /* Ẩn Next.js development indicator overlay */
        #__next-build-indicator,
        [data-nextjs-dialog],
        [data-nextjs-dialog-overlay],
        nextjs-portal,
        __next-build-indicator {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `;
      document.head.appendChild(style);
    };
    
    // Chạy sau khi DOM đã sẵn sàng
    setTimeout(hideDevIndicator, 100);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <script src="/chunk-error-handler.js" async></script>
      </head>
      <body>
        <ChunkErrorBoundary>
          <ReduxProvider>
            <CartModalProvider>
              <ChatAIModalProvider>
                <ModalProvider>
                  <PreviewSliderProvider>
                    <Header />
                    <RouterLoading />
                    <PagePreloader />
                    <Suspense fallback={<div></div>}>
                      <ChunkErrorBoundary>
                        {children}
                      </ChunkErrorBoundary>
                    </Suspense>
                    
                    {/* Lazy loaded modals with error boundaries */}
                    <Suspense fallback={null}>
                      <ChunkErrorBoundary fallback={null}>
                        <QuickViewModal />
                        <CartSidebarModal />
                        <ChatAIModal />
                        <FloatingChatButton />
                        <PreviewSliderModal />
                      </ChunkErrorBoundary>
                    </Suspense>
                  </PreviewSliderProvider>
                </ModalProvider>
              </ChatAIModalProvider>
            </CartModalProvider>
            <ScrollToTop />
            <Footer />

            {/* ToastContainer - lazy loaded with error boundary */}
            <Suspense fallback={null}>
              <ChunkErrorBoundary fallback={null}>
                <ToastContainer
                  position="top-right"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                />
              </ChunkErrorBoundary>
            </Suspense>
          </ReduxProvider>
        </ChunkErrorBoundary>
      </body>
    </html>
  );
}
