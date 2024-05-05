import type { Metadata } from "next";
import SideNavAdmin from "../components/side-nav-admin";
import {
  Archive,
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
    template: "%s | Продвижения ",
    default: "Продвижения",
  },
};

export default function PaymentsAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const subsAdminRoutes = [
    {
      path: "/admin/subscriptions",
      title: "Все",
      icon: <Podcast size={17} />,
    },
    {
      path: "/admin/subscriptions/modifiers",
      title: "Модификаторы",
      icon: <Flame size={17} />,
      isButton: true,
    },
    {
      path: "/admin/subscriptions/new",
      title: "Добавить",
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
