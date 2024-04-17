import AdminFooter from "@/components/layouts/admin-footer";
import AdminNav from "@/components/layouts/admin-nav";
import Footer from "@/components/layouts/footer";
import { fetchUserData } from "@/lib/fetchUserData";
import type { Metadata } from "next";
import NotFound from "../not-found";

export const metadata: Metadata = {
  title: {
    template: "%s | Админ-панель | etazhi.kz",
    default: "Админ-панель | etazhi.kz",
  },
  description: " Обьявления аренды и продажи недвижимостей",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await fetchUserData();

  if (user?.accessType !== "admin") {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <AdminNav />
      {children}
      <AdminFooter />
    </div>
  );
}
