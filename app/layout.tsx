import type { Metadata } from "next";
import LenisProvider from "@/app/providers/lenis-providers";
import { Arimo } from "next/font/google";
import "./globals.css";
import Footer from "./Footer";
import Header from "./Header";
import IntroOverlay from "./components/IntroOverlay";

const arimo = Arimo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-arimo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "YEO VIETNAM",
  description: "Tổ chức Định hướng và Phát triển Tiềm năng trẻ Việt Nam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${arimo.variable} antialiased`}>
        <LenisProvider>
          <IntroOverlay />
          <Header />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
