"use client";

import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Link as ScrollLink, Events, scrollSpy } from "react-scroll";
import { Separator } from "../ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
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
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Annoncement, Chat, Message, User } from "@prisma/client";

interface MainNavProps {
  userData: User | null;
  chats: (Chat & { annoncement: Annoncement; messages: Message[] })[] | null;
}

function MainNav({ userData, chats }: MainNavProps) {
  const [isOpenPopover1, setOpenPopover1] = React.useState(false);
  const [isOpenPopover2, setOpenPopover2] = React.useState(false);
  const [isOpenPopover3, setOpenPopover3] = React.useState(false);
  const [isOpenPopover4, setOpenPopover4] = React.useState(false);
  const [isOpenPopover5, setOpenPopover5] = React.useState(false);
  const [isOpenPopover6, setOpenPopover6] = React.useState(false);

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

  React.useEffect(() => {
    // Registering the 'begin' event and logging it to the console when triggered.
    Events.scrollEvent.register("begin", (to, element) => {
      console.log("begin", to, element);
    });

    // Registering the 'end' event and logging it to the console when triggered.
    Events.scrollEvent.register("end", (to, element) => {
      console.log("end", to, element);
    });

    // Updating scrollSpy when the component mounts.
    scrollSpy.update();

    // Returning a cleanup function to remove the registered events when the component unmounts.
    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

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

  return (
    <nav className="w-full bg-slate-900 px-4 grid grid-cols-8 items-center sticky top-0 z-40">
      <div className="flex col-span-3 flex-row items-center gap-x-4 ">
        <Link href="/" className=" -mt-1">
          <Image
            src="/etazhi.png"
            alt="logo"
            width={400}
            height={80}
            className="w-36"
          />
        </Link>
        <Popover open={isOpenPopover1}>
          <PopoverTrigger asChild onMouseOver={() => setOpenPopover1(true)}>
            <span
              className={cn(
                "font-bold flex cursor-pointer flex-row items-center gap-1 text-neutral-50 text-sm transition delay-150 duration-500 py-4 px-2 hover:text-blue-500 hover:border-b-blue-500 border-b-2 border-transparent",
                isOpenPopover1 && "text-blue-500 border-b-blue-500",
                searchParams.get("serviceType") === "Продажа" &&
                  "text-blue-500 border-b-blue-500"
              )}
              onClick={() => router.push("/filter?serviceType=Продажа")}
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
          </PopoverTrigger>
          <PopoverContent
            className="rounded-2xl bg-slate-900 "
            onMouseOver={() => setOpenPopover1(true)}
            onMouseOut={() => setOpenPopover1(false)}
            onBlur={() => setOpenPopover1(false)}
          >
            <ul className="w-full text-neutral-100">
              {menuList1.map((el, ind) => (
                <li
                  key={ind}
                  className={cn(
                    "p-2 text-left cursor-pointer text-sm font-semibold flex flex-row gap-x-2 hover:bg-blue-500 rounded-xl w-full transition delay-100 duration-300"
                  )}
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
          </PopoverContent>
        </Popover>

        <Popover open={isOpenPopover2}>
          <PopoverTrigger asChild onMouseOver={() => setOpenPopover2(true)}>
            <span
              className={cn(
                "font-bold flex cursor-pointer flex-row items-center gap-1 text-neutral-50 text-sm transition delay-150 duration-500 py-4 px-2 hover:text-blue-500 hover:border-b-blue-500 border-b-2 border-transparent",
                isOpenPopover2 && "text-blue-500 border-b-blue-500",

                searchParams.get("serviceType") === "Аренда" &&
                  "text-blue-500 border-b-blue-500"
              )}
              onClick={() => router.push("/filter?serviceType=Аренда")}
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
          </PopoverTrigger>
          <PopoverContent
            className="rounded-2xl bg-slate-900 "
            onMouseOver={() => setOpenPopover2(true)}
            onMouseOut={() => setOpenPopover2(false)}
            onBlur={() => setOpenPopover2(false)}
          >
            <ul className="w-full text-neutral-100">
              {menuList2.map((el, ind) => (
                <li
                  onClick={() =>
                    router.push(
                      `/filter?serviceType=Аренда&categoryType=${el.name}`
                    )
                  }
                  key={ind}
                  className="p-2 text-left cursor-pointer text-sm font-semibold flex flex-row gap-x-2 hover:bg-blue-500 rounded-xl w-full transition delay-100 duration-300"
                >
                  {el.icon} {el.name}
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex col-span-2 flex-row items-center gap-x-4 justify-center ">
        <Link
          href="/cabinet/annoncements/new"
          className="font-semibold flex flex-row items-center gap-x-1 h-full bg-blue-500 rounded-xl text-neutral-50 text-sm transition delay-150 duration-500 py-3 px-4 hover:text-blue-500 hover:bg-neutral-50"
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
          Разместить обьявление
        </Link>
      </div>
      <div className="flex col-span-3 flex-row items-center  gap-x-2 justify-end">
        {userData && (
          <>
            <Link
              href="/cabinet/profile/billing"
              className="text-slate-500 text-sm"
            >
              <span className="font-medium">Баланс:</span>
              <span className="text-yellow-400 font-semibold ml-2">
                {userData?.totalBalance || "0"} ед.
              </span>
            </Link>
            <Separator orientation="vertical" className="h-8 bg-slate-700" />
          </>
        )}

        <Popover open={isOpenPopover6 && !userData}>
          <PopoverTrigger
            asChild
            onMouseOver={() => setOpenPopover6(true)}
            onClick={() => router.push("/cabinet/annoncements")}
          >
            <span
              className={cn(
                "font-semibold flex cursor-pointer flex-row items-center gap-1 text-neutral-50 text-sm transition delay-150 duration-500 py-4 px-2 hover:text-blue-500 hover:border-b-blue-500 border-b-2 border-transparent",
                pathname.startsWith("/cabinet/annoncements") &&
                  "border-b-blue-500 text-blue-500"
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
                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                />
              </svg>
            </span>
          </PopoverTrigger>
          <PopoverContent
            className="rounded-2xl bg-slate-900 "
            onMouseOver={() => setOpenPopover6(true)}
            onMouseLeave={() => setOpenPopover6(false)}
            onBlur={() => setOpenPopover6(false)}
          >
            <p className="text-neutral-100 text-sm font-semibold text-center">
              Авторизуйтесь чтобы увидеть{" "}
            </p>
            <p className="font-bold text-blue-500 text-sm  text-center">
              Ваши обьявления
            </p>
          </PopoverContent>
        </Popover>
        <Separator orientation="vertical" className="h-8 bg-slate-700" />

        <Popover open={isOpenPopover3 && !userData}>
          <PopoverTrigger
            asChild
            onMouseOver={() => setOpenPopover3(true)}
            onClick={() => router.push("/cabinet/favorites")}
          >
            <span
              className={cn(
                "font-semibold flex cursor-pointer flex-row items-center gap-1 text-neutral-50 text-sm transition delay-150 duration-500 py-4 px-2 hover:text-blue-500 hover:border-b-blue-500 border-b-2 border-transparent",
                pathname.startsWith("/cabinet/favorites") &&
                  "border-b-blue-500 text-blue-500"
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
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </span>
          </PopoverTrigger>
          <PopoverContent
            className="rounded-2xl bg-slate-900 "
            onMouseOver={() => setOpenPopover3(true)}
            onMouseOut={() => setOpenPopover3(false)}
            onBlur={() => setOpenPopover3(false)}
          >
            <p className="text-neutral-100 text-sm font-semibold text-center">
              Авторизуйтесь чтобы увидеть{" "}
              <span className="font-bold text-blue-500">Избранное</span>
            </p>
          </PopoverContent>
        </Popover>

        <Separator orientation="vertical" className="h-8 bg-slate-700" />
        <Popover open={isOpenPopover4 && !userData}>
          <PopoverTrigger
            asChild
            onMouseOver={() => setOpenPopover4(true)}
            onClick={() => router.push("/cabinet/profile/notifications")}
          >
            <span
              className={cn(
                "font-semibold relative flex cursor-pointer flex-row items-center gap-1 text-neutral-50 text-sm transition delay-150 duration-500 py-4 px-2 hover:text-blue-500 hover:border-b-blue-500 border-b-2 border-transparent",
                pathname.startsWith("/cabinet/profile/notifications") &&
                  "border-b-blue-500 text-blue-500"
              )}
            >
              {userData?.notifications.find((el) => el.isOpened === false) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-blue-500 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                  />
                </svg>
              ) : (
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
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  />
                </svg>
              )}
            </span>
          </PopoverTrigger>
          <PopoverContent
            className="rounded-2xl bg-slate-900 "
            onMouseOver={() => setOpenPopover4(true)}
            onMouseOut={() => setOpenPopover4(false)}
            onBlur={() => setOpenPopover4(false)}
          >
            <p className="text-neutral-100 text-sm font-semibold text-center">
              Авторизуйтесь чтобы увидеть{" "}
              <span className="font-bold text-blue-500">Оповещения</span>
            </p>
          </PopoverContent>
        </Popover>

        <Separator orientation="vertical" className="h-8 bg-slate-700" />
        <Popover open={isOpenPopover5 && !userData}>
          <PopoverTrigger
            asChild
            onMouseOver={() => setOpenPopover5(true)}
            onClick={() => router.push("/cabinet/chats")}
          >
            <span
              className={cn(
                "font-semibold flex relative cursor-pointer flex-row items-center gap-1 text-neutral-50 text-sm transition delay-150 duration-500 py-4 px-2 hover:text-blue-500 hover:border-b-blue-500 border-b-2 border-transparent",
                pathname.startsWith("/cabinet/chats") &&
                  "border-b-blue-500 text-blue-500"
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
                  d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
              {chats &&
                chats?.filter((el) =>
                  el.messages.filter((item) => item.status === "pending")
                ).length > 0 && (
                  <span className="absolute text-[5px] bottom-4 right-1 bg-blue-400 animate-pulse rounded-full w-1.5 text-neutral-50 h-1.5 text-center flex flex-col items-center justify-center"></span>
                )}
            </span>
          </PopoverTrigger>
          <PopoverContent
            className="rounded-2xl bg-slate-900 "
            onMouseOver={() => setOpenPopover5(true)}
            onMouseLeave={() => setOpenPopover5(false)}
            onBlur={() => setOpenPopover5(false)}
          >
            <p className="text-neutral-100 text-sm font-semibold text-center">
              Авторизуйтесь чтобы увидеть{" "}
              <span className="font-bold text-blue-500">Сообщения</span>
            </p>
          </PopoverContent>
        </Popover>

        <Separator orientation="vertical" className="h-8 bg-slate-700" />
        {userData !== null ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="data-[state=open]:text-blue-500 data-[state=open]:border-b-blue-500"
            >
              <button
                className={cn(
                  "font-semibold outline-none flex flex-row items-center gap-1 text-neutral-50 text-sm transition delay-150 duration-500 py-4 px-2 hover:text-blue-500 hover:border-b-blue-500 border-b-2 border-transparent",
                  pathname.startsWith("/cabinet/profile") &&
                    "border-b-blue-500 text-blue-500"
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
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-56 text-slate-900 font-semibold mr-2">
              <DropdownMenuLabel className="text-base">
                {userData?.name || userData?.username}
              </DropdownMenuLabel>
              <DropdownMenuItem className="font-semibold py-0 pointer-events-none ">
                ID:{" "}
                <span className="text-slate-600 ml-1 font-normal">
                  {userData.id}
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className={cn(
                    "cursor-pointer",
                    pathname.startsWith("/cabinet/profile/billing") &&
                      "text-blue-500"
                  )}
                  onClick={() => router.push("/cabinet/profile/billing")}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Счет и Платежи</span>
                </DropdownMenuItem>
                {/* <DropdownMenuItem className="text-slate-600 pointer-events-none">
                  <span className="font-normal">Баланс:</span>
                  <span className="text-yellow-400 font-semibold ml-2">
                    {userData?.totalBalance || "0"} ед.
                  </span>
                </DropdownMenuItem> */}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {/* <DropdownMenuItem
                  className={cn(
                    "cursor-pointer",
                    pathname.startsWith("/cabinet/profile/notifications") &&
                      "text-blue-500"
                  )}
                  onClick={() => router.push("/cabinet/profile/notifications")}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Оповещения</span>
                </DropdownMenuItem> */}
                <DropdownMenuItem
                  className={cn(
                    "cursor-pointer",
                    pathname.startsWith("/cabinet/profile/settings") &&
                      "text-blue-500"
                  )}
                  onClick={() => router.push("/cabinet/profile/settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Настройки</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => signOut()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Выйти</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href="/auth"
            className={cn(
              "font-semibold outline-none flex flex-row items-center gap-1 text-neutral-50 text-sm transition delay-150 duration-500 py-4 px-2 hover:text-blue-500 hover:border-b-blue-500 border-b-2 border-transparent",
              pathname.startsWith("/cabinet/profile") &&
                "border-b-blue-500 text-blue-500"
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
          </Link>
        )}
      </div>
    </nav>
  );
}

export default MainNav;
