import type { Metadata } from "next";
import SideNavAdmin from "../components/side-nav-admin";
import {
  Archive,
  CheckCircle2,
  Crown,
  Flame,
  HelpCircle,
  Plus,
  RefreshCw,
  WalletCards,
  Zap,
} from "lucide-react";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | Платежи ",
    default: "Платежи",
  },
  description: " Обьявления аренды и продажи недвижимостей",
};

export default function PaymentsAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const annoncementAdminRoutes = [
    {
      path: "/admin/payments",
      title: "Все",
      icon: <WalletCards size={17} />,
    },
    {
      title: "Модификаторы",
      icon: <Zap size={17} />,
    },
    {
      title: "Подписки",
      icon: <Crown size={17} />,
    },

    {
      path: "/admin/payments/new",
      title: "Добавить",
      icon: <Plus size={17} />,
      isButton: true,
    },
  ];

  return (
    <div className="flex flex-row w-full h-full gap-2">
      <Suspense>
        <SideNavAdmin links={annoncementAdminRoutes} />
      </Suspense>

      {children}
    </div>
  );
}
