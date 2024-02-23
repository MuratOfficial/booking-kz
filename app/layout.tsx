import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/layouts/main-nav";
import Footer from "@/components/layouts/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "booking.kz",
  description: " Обьявления аренды и продажи недвижимостей",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen flex justify-between flex-col`}
      >
        <MainNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
