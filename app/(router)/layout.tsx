import type { Metadata } from "next";
import MainNav from "@/components/layouts/main-nav";
import Footer from "@/components/layouts/footer";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | booking.kz",
    default: " booking.kz",
  },
  description: " Обьявления аренды и продажи недвижимостей",
};

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Suspense>
        <MainNav />
      </Suspense>
      {children}
      <Footer />
    </main>
  );
}
