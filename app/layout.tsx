import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import YandexMapProvider from "./providers";

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
      <body
        className={`${inter.className} min-h-screen flex justify-between flex-col bg-slate-100`}
      >
        <YandexMapProvider>{children}</YandexMapProvider>

        <Toaster />
      </body>
    </html>
  );
}
