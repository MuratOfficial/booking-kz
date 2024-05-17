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
    template: "%s | Города ",
    default: "Города",
  },
};

export default function PaymentsAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const subsAdminRoutes = [
    {
      path: "/admin/buildings",
      title: "Все ЖК",
      icon: <Building2 size={17} />,
    },

    {
      path: "/admin/buildings/new",
      title: "Добавить ЖК",
      icon: <Plus size={17} />,
      isButton: true,
    },
  ];

  return (
    <div className="flex flex-row w-full h-full gap-2">
      <Suspense>
        <SideNavAdmin links={subsAdminRoutes} />
      </Suspense>

      {children}
    </div>
  );
}
