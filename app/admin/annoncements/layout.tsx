import type { Metadata } from "next";
import SideNavAdmin from "../components/side-nav-admin";
import {
  Archive,
  CheckCircle2,
  Flame,
  HelpCircle,
  Plus,
  Zap,
} from "lucide-react";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | Обьявления ",
    default: "Обьявления",
  },
  description: " Обьявления аренды и продажи недвижимостей",
};

export default function AnnoncementsAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const annoncementAdminRoutes = [
    {
      path: "/admin/annoncements",
      title: "Все",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
          />
        </svg>
      ),
    },
    { path: "/admin/annoncements?filter=new", title: "Новые", icon: "New" },
    {
      path: "/admin/annoncements?filter=archived",
      title: "В архиве",
      icon: <Archive size={17} />,
    },
    {
      path: "/admin/annoncements?filter=notChecked",
      title: "Не проверенные",
      icon: <HelpCircle size={17} />,
    },
    {
      path: "/admin/annoncements?filter=isChecked",
      title: "Проверенные",
      icon: <CheckCircle2 size={17} />,
    },
    {
      path: "/admin/annoncements?filter=hot",
      title: "Горячие",
      icon: <Flame size={17} />,
      color: "text-red-500",
      colorHover: "hover:text-red-500 group-hover:text-red-500",
    },
    {
      path: "/admin/annoncements?filter=hurry",
      title: "Срочно",
      icon: <Zap size={17} />,
      color: "text-sky-500",
      colorHover: "hover:text-sky-500 group-hover:text-sky-500",
    },
    {
      path: "/admin/annoncements/new",
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
