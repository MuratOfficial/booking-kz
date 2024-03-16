import type { Metadata } from "next";
import SideNavAdmin from "../components/side-nav-admin";
import {
  Archive,
  CheckCircle2,
  Flame,
  HelpCircle,
  Lock,
  MessageCircle,
  MessageCirclePlus,
  Plus,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: {
    template: "%s | Сообщения ",
    default: "Сообщения",
  },
  description: " Обьявления аренды и продажи недвижимостей",
};

export default function ChatsAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const annoncementAdminRoutes = [
    {
      path: "/admin/chats",
      title: "Все",
      icon: <MessageCircle size={17} />,
    },
    {
      title: "Заблокированные",
      icon: <Lock size={17} />,
      color: "text-slate-800",
      colorHover: "hover:text-slate-800 group-hover:text-slate-800",
    },
    {
      path: "/admin/chats/new",
      title: "Открыть чат",
      icon: <MessageCirclePlus size={17} />,
      isButton: true,
    },
  ];

  return (
    <div className="flex flex-row w-full h-full gap-2">
      <SideNavAdmin links={annoncementAdminRoutes} />

      {children}
    </div>
  );
}
