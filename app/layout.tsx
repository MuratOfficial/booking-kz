import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/layouts/main-nav";
import Footer from "@/components/layouts/footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | booking.kz",
    default: "booking.kz",
  },
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
        className={`${inter.className} min-h-screen flex justify-between flex-col bg-slate-100`}
      >
        <MainNav />
        {children}
        <Toaster />

        <Footer />
      </body>
    </html>
  );
}
