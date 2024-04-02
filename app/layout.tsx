import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import YandexMapProvider from "./providers";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: " Обьявления аренды и продажи недвижимостей",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-4QDDY0WQFH"
      />
      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-4QDDY0WQFH');`}
      </Script>
      <body
        className={`${inter.className} min-h-screen flex justify-between flex-col bg-slate-100`}
      >
        <YandexMapProvider>{children}</YandexMapProvider>

        <Toaster />
      </body>
    </html>
  );
}
