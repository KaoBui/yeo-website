import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import LenisProvider from "@/app/providers/lenis-providers";
import { routing } from "@/i18n/routing";

import "../globals.css";
import Footer from "../Footer";
import Header from "../Header";
import IntroOverlay from "../components/IntroOverlay";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${arimo.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <LenisProvider>
            <IntroOverlay />
            <Header />
            {children}
            <Footer />
          </LenisProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
