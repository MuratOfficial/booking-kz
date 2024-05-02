import type { Metadata } from "next";
import SideNavAdmin from "../components/side-nav-admin";
import {
  Archive,
  Building2,
  CheckCircle2,
  Crown,
  Flame,
  HelpCircle,
  Plus,
  Podcast,
  RefreshCw,
  WalletCards,
  Zap,
} from "lucide-react";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | Пополнения ",
    default: "Пополнения",
  },
};

export default function RefillAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const refillAdminRoutes = [
    {
      path: "/admin/refill",
      title: "Все",
      icon: <WalletCards size={17} />,
    },

    {
      path: "/admin/refill/new",
      title: "Добавить",
      icon: <Plus size={17} />,
      isButton: true,
    },
  ];

  return (
    <div className="flex flex-row w-full h-full gap-2">
      <Suspense>
        <SideNavAdmin links={refillAdminRoutes} />
      </Suspense>

      {children}
    </div>
  );
}
