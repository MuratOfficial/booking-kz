"use client";

import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Cloud,
  CreditCard,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  UserPlus,
  Users,
  Bed,
  BedDouble,
  Building2,
  Cuboid,
  DoorOpen,
  Factory,
  Fence,
  Home,
  Hotel,
  LandPlot,
  ParkingSquare,
  Store,
  TentTree,
  Warehouse,
  Bell,
  Dot,
  Circle,
  BellDot,
  Menu,
  Heart,
  MessageCircle,
  Newspaper,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Image from "next/image";
import { signOut } from "next-auth/react";
import { Annoncement, Chat, Message, User } from "@prisma/client";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface MobileNavProps {
  userData:
    | (User & { chats: (Chat & { messages: Message[] | null })[] | null })
    | null;
}

function MobileNav({ userData }: MobileNavProps) {
  const [isOpenPopover, setOpenPopover] = React.useState("");

  const pathname = usePathname();
  const router = useRouter();

  const searchParams = useSearchParams();

  const menuList1 = [
    {
      name: "Квартиры",
      icon: <DoorOpen size={19} />,
    },
    {
      name: "Дома, дачи, коттеджи",
      icon: <Home size={19} />,
    },
    {
      name: "Гаражи",
      icon: <Warehouse size={19} />,
    },
    {
      name: "Паркинги",
      icon: <ParkingSquare size={19} />,
    },
    {
      name: "Земельный участок",
      icon: <LandPlot size={19} />,
    },
    {
      name: "Коммерческая недвижимость",
      icon: <Building2 size={19} />,
    },
    {
      name: "Помещения",
      icon: <Cuboid size={19} />,
    },
    {
      name: "Магазины",
      icon: <Store size={19} />,
    },
    {
      name: "Заводы и промбазы",
      icon: <Factory size={19} />,
    },
    {
      name: "Прочее",
      icon: <Fence size={19} />,
    },
  ];

  const menuList2 = [
    {
      name: "Квартиры, апартаменты",
      icon: <DoorOpen size={19} />,
    },
    {
      name: "Дома, дачи, коттеджи",
      icon: <Home size={19} />,
    },
    {
      name: "Комнаты",
      icon: <BedDouble size={19} />,
    },
    {
      name: "Отели, гостиницы",
      icon: <Hotel size={19} />,
    },
    {
      name: "Глэмпинги, базы отдыха",
      icon: <TentTree size={19} />,
    },
    {
      name: "Хостелы",
      icon: <Bed size={19} />,
    },
    {
      name: "Гаражи",
      icon: <Warehouse size={19} />,
    },
    {
      name: "Паркинги",
      icon: <ParkingSquare size={19} />,
    },
    {
      name: "Коммерческая недвижимость",
      icon: <Building2 size={19} />,
    },
    {
      name: "Помещения",
      icon: <Cuboid size={19} />,
    },
    {
      name: "Магазины",
      icon: <Store size={19} />,
    },
    {
      name: "Промбазы",
      icon: <Factory size={19} />,
    },
    {
      name: "Прочее",
      icon: <Fence size={19} />,
    },
  ];

  const [drClose, setDrClose] = React.useState(false);

  const handleClose = () => {
    if (drClose) {
      setDrClose(false);
    } else {
      setDrClose(true);
    }
  };

  const menuList3 = [
    {
      name: "Избранные",
      icon: <Heart size={19} />,
      path: "/cabinet/favorites",
    },
    {
      name: "Оповещения",
      icon: <Bell size={19} />,
      path: "/cabinet/profile/notifications",
    },
    {
      name: "Сообщения",
      icon: <MessageCircle size={19} />,
      path: "/cabinet/chats",
    },
    {
      name: "Счет и платежи",
      icon: <CreditCard size={19} />,
      path: "/cabinet/profile/billing",
    },
    {
      name: "Мои обьявления",
      icon: <Newspaper size={19} />,
      path: "/cabinet/annoncements",
    },
    {
      name: "Настройки",
      icon: <Settings size={19} />,
      path: "/cabinet/profile/settings",
    },
  ];

  return (
    <div className="w-full bg-slate-900 p-2 gap-2 xs:grid grid-cols-6 lg:hidden col-span-3  items-center sticky top-0 z-40">
      <Link href="/" className=" -mt-1 col-span-3">
        <Image
          src="/etazhi.png"
          alt="logo"
          width={400}
          height={80}
          className="max-w-36"
        />
      </Link>
      <div></div>
      <Link
        href="/cabinet/annoncements/new"
        className="font-semibold flex flex-row justify-center items-center gap-x-1 h-full bg-blue-500 rounded-xl text-neutral-50 text-sm transition delay-150 duration-500 p-3 hover:text-blue-500 hover:bg-neutral-50"
      >
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
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </Link>
      <Drawer>
        <DrawerTrigger className="font-semibold flex flex-row justify-center items-center gap-x-1 h-full bg-slate-500 rounded-xl text-neutral-50 text-sm transition delay-150 duration-500 p-3 hover:text-slate-500 hover:bg-neutral-50">
          <Menu className="w-5 h-5" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="pb-2">
              Добро пожаловать на etazhi.kz!
            </DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-2">
            <Accordion className="px-4" type="single" collapsible>
              <Separator />
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <span
                    className={cn(
                      "font-bold flex cursor-pointer flex-row items-center gap-1 text-slate-900  transition delay-150 duration-500 p-2 hover:text-blue-500 hover: border-b-2 border-transparent",

                      searchParams.get("serviceType") === "Продажа" &&
                        "text-blue-500 "
                    )}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
                      />
                    </svg>
                    Продажа
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="w-full text-slate-900">
                    {menuList1.map((el, ind) => (
                      <li
                        key={ind}
                        className="p-2 text-left cursor-pointer  font-semibold flex flex-row gap-x-2 hover:bg-blue-500 rounded-xl w-full transition delay-100 duration-300"
                        onClick={() => {
                          router.push(
                            `/filter?serviceType=Продажа&categoryType=${el.name}`
                          );
                        }}
                      >
                        {el.icon} {el.name}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <Separator />
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  {" "}
                  <span
                    className={cn(
                      "font-bold flex cursor-pointer flex-row items-center gap-1 text-slate-900  transition delay-150 duration-500 p-2 hover:text-blue-500 hover: border-b-2 border-transparent",

                      searchParams.get("serviceType") === "Аренда" &&
                        "text-blue-500 "
                    )}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                    Аренда
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="w-full text-slate-900">
                    {menuList2.map((el, ind) => (
                      <li
                        key={ind}
                        className="p-2 text-left cursor-pointer  font-semibold flex flex-row gap-x-2 hover:bg-blue-500 rounded-xl w-full transition delay-100 duration-300"
                        onClick={() =>
                          router.push(
                            `/filter?serviceType=Продажа&categoryType=${el.name}`
                          )
                        }
                      >
                        {el.icon} {el.name}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <Separator />
              {userData && (
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    {" "}
                    <span
                      className={cn(
                        "font-bold flex cursor-pointer flex-row items-center gap-1 text-slate-900  transition delay-150 duration-500 p-2 hover:text-blue-500 hover: border-b-2 border-transparent",
                        pathname.startsWith("/cabinet") && "text-blue-500 "
                      )}
                    >
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
                          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                      Мой кабинет
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="w-full text-slate-900">
                      <Link
                        href="/cabinet/profile/billing"
                        className="text-slate-500 text-sm p-2"
                      >
                        <span className="font-medium">Баланс:</span>
                        <span className="text-yellow-400 font-semibold ml-2">
                          {userData?.totalBalance || "0"} ед.
                        </span>
                      </Link>

                      {menuList3.map((el, ind) => (
                        <li
                          key={ind}
                          className="p-2 text-left cursor-pointer  font-semibold flex flex-row gap-x-2 hover:bg-blue-500 rounded-xl w-full transition delay-100 duration-300"
                          onClick={() => router.push(el.path)}
                        >
                          {el.icon} {el.name}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}

              <Separator />
            </Accordion>
          </div>
          <DrawerFooter className="w-full items-center flex">
            {!userData ? (
              <Button
                onClick={() => router.push("/auth")}
                className="w-full rounded-xl bg-blue-500 text-base"
              >
                Войти/Зарегистрироваться
              </Button>
            ) : (
              <Button
                onClick={() => signOut()}
                className="w-full rounded-xl bg-slate-900 text-base"
              >
                Выйти
              </Button>
            )}

            <DrawerClose className="bg-slate-100 rounded-xl w-full px-2.5 py-2">
              Закрыть
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default MobileNav;
