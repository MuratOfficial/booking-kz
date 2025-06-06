import type { Metadata } from "next";
import SideNavAdmin from "../components/side-nav-admin";
import {
  Archive,
  CheckCircle2,
  Crown,
  Flame,
  HelpCircle,
  Lock,
  Plus,
  Star,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | Пользователи ",
    default: "Пользователи",
  },
  description: " Обьявления аренды и продажи недвижимостей",
};

export default function UsersAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const annoncementAdminRoutes = [
    {
      path: "/admin/users",
      title: "Все",
      icon: <Users size={17} />,
    },
    { title: "Новые", icon: "New" },

    {
      title: "Не валидирован",
      icon: <Lock size={17} />,
      color: "text-slate-800",
      colorHover: "hover:text-slate-800 group-hover:text-slate-800",
    },

    {
      path: "/admin/users/new",
      title: "Добавить",
      icon: <UserPlus size={17} />,
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
