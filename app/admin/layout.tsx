import AdminFooter from "@/components/layouts/admin-footer";
import AdminNav from "@/components/layouts/admin-nav";
import Footer from "@/components/layouts/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Админ-панель | etazhi.kz",
    default: "Админ-панель | etazhi.kz",
  },
  description: " Обьявления аренды и продажи недвижимостей",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <AdminNav />
      {children}
      <AdminFooter />
    </div>
  );
}
