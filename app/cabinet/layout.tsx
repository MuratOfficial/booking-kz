import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/layouts/sidebar-nav";

import NotFound from "@/app/not-found";
import {
  CircleDollarSign,
  Plus,
  Star,
  StickyNote,
  UserRoundCog,
  Wallet,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Кабинет | booking.kz",
  description: "booking.kz | booking.kz",
};

const sidebarNavItems = [
  {
    title: "Обьявления",
    href: "/cabinet",
    icon: <StickyNote size={19} />,
  },
  {
    title: "Избранное",
    href: "/admin/data/users",
    icon: <Star size={19} />,
  },
  {
    title: "Чат",
    href: "/admin/blog",
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
          d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
        />
      </svg>
    ),
  },
  {
    title: "Счет и Платежи",
    href: "/admin/site",
    icon: <Wallet size={19} />,
  },
  {
    title: "Пополнить счет",
    href: "/admin/site",
    icon: <CircleDollarSign size={19} />,
  },
  {
    title: "Настройки",
    href: "/admin/site",
    icon: <UserRoundCog size={19} />,
  },
  //   {
  //     title: "Разместить обьявление",
  //     href: "/admin/site",
  //     icon: <Plus size={19} />,
  //   },
];

interface CabinetLayoutProps {
  children: React.ReactNode;
}

export default async function CabinetLayout({ children }: CabinetLayoutProps) {
  //   const session = await getServerSession(authOptions);

  //   const userIdData = JSON.parse(JSON.stringify(session));

  //   const isAdmin = await prismadb.user.findUnique({
  //     where: {
  //       id: userIdData?.user?.id,
  //     },
  //   });

  //   if (isAdmin?.isAdmin === false) {
  //     return <NotFound />;
  //   }

  return (
    <>
      <div className=" px-24 py-6 bg-slate-100 min-h-screen">
        <div className="flex flex-col gap-y-4">
          <SidebarNav items={sidebarNavItems} />

          <div className="w-full items-center flex flex-col">{children}</div>
        </div>
      </div>
    </>
  );
}
