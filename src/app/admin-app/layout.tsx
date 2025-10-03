
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "../../components/server/Sidebar";
import "../css/globals.css"
import ReduxProvider from "../../utils/Provider/ReduxProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextCommerce | Admin",
  description: "Admin dashboard for NextCommerce template",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <ReduxProvider>
        <div className="flex min-h-screen bg-gray-100">
          {/* Sidebar cố định */}
          <Sidebar />
          {/* Nội dung page */}
          <div className="flex-1 overflow-hidden">
            <div className="p-8 h-full overflow-y-auto">{children}</div>
          </div>
        </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
