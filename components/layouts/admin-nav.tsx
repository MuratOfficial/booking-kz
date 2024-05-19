"use client";

import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { CreditCard, LogOut, Settings, Bell } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signOut } from "next-auth/react";

function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="w-full bg-slate-200 px-4 flex flex-row justify-between items-center sticky top-0 z-40">
      <div className="flex flex-row items-center gap-x-4 ">
        <Link
          href="/admin"
          className="flex flex-row items-center gap-2 text-blue-500"
        >
          <svg
            id="logo-87"
            width="25"
            height="25"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="ccustom"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25.5557 11.6853C23.9112 10.5865 21.9778 10 20 10V0C23.9556 0 27.8224 1.17298 31.1114 3.37061C34.4004 5.56823 36.9638 8.69181 38.4776 12.3463C39.9913 16.0008 40.3874 20.0222 39.6157 23.9018C38.844 27.7814 36.9392 31.3451 34.1421 34.1421C31.3451 36.9392 27.7814 38.844 23.9018 39.6157C20.0222 40.3874 16.0008 39.9913 12.3463 38.4776C8.6918 36.9638 5.56823 34.4004 3.37061 31.1114C1.17298 27.8224 0 23.9556 0 20H10C10 21.9778 10.5865 23.9112 11.6853 25.5557C12.7841 27.2002 14.3459 28.4819 16.1732 29.2388C18.0004 29.9957 20.0111 30.1937 21.9509 29.8078C23.8907 29.422 25.6725 28.4696 27.0711 27.0711C28.4696 25.6725 29.422 23.8907 29.8078 21.9509C30.1937 20.0111 29.9957 18.0004 29.2388 16.1732C28.4819 14.3459 27.2002 12.7841 25.5557 11.6853Z"
              fill="#007DFC"
            ></path>
            <path
              className="ccustom"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 1.47023e-06C10 1.31322 9.74135 2.61358 9.2388 3.82684C8.73625 5.04009 7.99966 6.14248 7.07107 7.07107C6.14249 7.99966 5.0401 8.73625 3.82684 9.2388C2.61358 9.74134 1.31322 10 6.15916e-06 10L5.72205e-06 20C2.62644 20 5.22716 19.4827 7.65368 18.4776C10.0802 17.4725 12.285 15.9993 14.1421 14.1421C15.9993 12.285 17.4725 10.0802 18.4776 7.65367C19.4827 5.22715 20 2.62643 20 -3.8147e-06L10 1.47023e-06Z"
              fill="#007DFC"
            ></path>
          </svg>
          <span className=" font-extrabold text-[16px]"> Админ-панель</span>
        </Link>
        <Link
          className={cn(
            "font-medium flex mt-1 cursor-pointer flex-row text-[15px] items-center gap-1 text-slate-500  transition delay-150 duration-500 py-2 px-2 hover:text-blue-500 hover: border-b-2 border-transparent",

            pathname.startsWith("/admin/annoncements") && "text-blue-500 "
          )}
          href="/admin/annoncements"
        >
          Обьявления
        </Link>
        <Link
          className={cn(
            "font-medium flex mt-1 cursor-pointer flex-row text-[15px] items-center gap-1 text-slate-500  transition delay-150 duration-500 py-2 px-2 hover:text-blue-500 hover: border-b-2 border-transparent",

            pathname.startsWith("/admin/chats") && "text-blue-500 "
          )}
          href="/admin/chats"
        >
          Сообщения
        </Link>
        <Link
          className={cn(
            "font-medium flex mt-1 cursor-pointer flex-row text-[15px] items-center gap-1 text-slate-500  transition delay-150 duration-500 py-2 px-2 hover:text-blue-500 hover: border-b-2 border-transparent",

            pathname.startsWith("/admin/users") && "text-blue-500 "
          )}
          href="/admin/users"
        >
          Пользователи
        </Link>
        <Link
          className={cn(
            "font-medium flex mt-1 cursor-pointer flex-row text-[15px] items-center gap-1 text-slate-500  transition delay-150 duration-500 py-2 px-2 hover:text-blue-500 hover: border-b-2 border-transparent",

            pathname.startsWith("/admin/payments") && "text-blue-500 "
          )}
          href="/admin/payments"
        >
          Платежи
        </Link>
        <Link
          className={cn(
            "font-medium flex mt-1 cursor-pointer flex-row text-[15px] items-center gap-1 text-slate-500  transition delay-150 duration-500 py-2 px-2 hover:text-blue-500 hover: border-b-2 border-transparent",

            pathname.startsWith("/admin/subscriptions") && "text-blue-500 "
          )}
          href="/admin/subscriptions"
        >
          Продвижения
        </Link>
        <Link
          className={cn(
            "font-medium flex mt-1 cursor-pointer flex-row text-[15px] items-center gap-1 text-slate-500  transition delay-150 duration-500 py-2 px-2 hover:text-blue-500 hover: border-b-2 border-transparent",

            pathname.startsWith("/admin/buildings") && "text-blue-500 "
          )}
          href="/admin/buildings"
        >
          Города и ЖК
        </Link>
        <Link
          className={cn(
            "font-medium flex mt-1 cursor-pointer flex-row text-[15px] items-center gap-1 text-slate-500  transition delay-150 duration-500 py-2 px-2 hover:text-blue-500 hover: border-b-2 border-transparent",

            pathname.startsWith("/admin/refill") && "text-blue-500 "
          )}
          href="/admin/refill"
        >
          Пополнения
        </Link>
      </div>

      <div className="flex flex-row items-center  gap-x-3">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="data-[state=open]:text-blue-500 "
          >
            <button
              className={cn(
                "font-semibold outline-none flex flex-row items-center gap-1 text-slate-600 text-sm transition delay-150 duration-500 py-2 px-2 hover:text-blue-500 "
              )}
            >
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 text-slate-700 font-semibold bg-slate-200">
            <DropdownMenuLabel className="text-base">User1</DropdownMenuLabel>
            <DropdownMenuItem className="font-normal text-slate-600 py-0 pointer-events-none ">
              Администратор
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
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
              onClick={() => signOut()}
              className="cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Выйти</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export default AdminNav;
