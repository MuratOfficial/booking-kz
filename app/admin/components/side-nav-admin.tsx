"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface SideNavAdminProps {
  links: {
    path?: string;
    title: string;
    icon: React.JSX.Element | string;
    color?: string;
    colorHover?: string;
    isButton?: boolean;
  }[];
}

function SideNavAdmin({ links }: SideNavAdminProps) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const router = useRouter();

  function resetFilter(param: string) {
    const params = new URLSearchParams(searchParams);
    params.set("filter", param);

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className=" py-2 w-1/5 min-h-screen ">
      <div className="w-full flex flex-col gap-2 sticky top-[11%] bg-slate-200 rounded-r-xl px-4 py-3 text-base font-medium text-slate-600">
        {links
          .filter((el) => !el.color && !el?.isButton && el.title === "Все")
          .map((link, ind) => (
            <span
              key={ind}
              onClick={() => router.push(link?.path || "/")}
              className={cn(
                "hover:text-blue-500 flex cursor-pointer flex-row group items-center justify-between transition delay-100 duration-200",
                !searchParams.has("filter") &&
                  link?.path === pathname &&
                  "text-blue-500"
              )}
            >
              {link.title}{" "}
              <span
                className={cn(
                  "w-4 text-[10px] cursor-pointer text-transparent group-hover:text-blue-500 transition delay-100 duration-200 uppercase",
                  !searchParams.has("filter") &&
                    link?.path === pathname &&
                    "text-blue-500"
                )}
              >
                {link.icon}
              </span>
            </span>
          ))}
        {links
          .filter((el) => !el.color && !el?.isButton && el.title !== "Все")
          .map((link, ind) => (
            <span
              key={ind}
              onClick={() => resetFilter(link.title)}
              className={cn(
                "hover:text-blue-500 flex cursor-pointer flex-row group items-center justify-between transition delay-100 duration-200",
                (searchParams.has("filter", link.title) && "text-blue-500") ||
                  (link.title === "Все" && "text-blue-500")
              )}
            >
              {link.title}{" "}
              <span
                className={cn(
                  "w-4 text-[10px] cursor-pointer text-transparent group-hover:text-blue-500 transition delay-100 duration-200 uppercase",
                  (searchParams.has("filter", link.title) && "text-blue-500") ||
                    (link.title === "Все" && "text-blue-500")
                )}
              >
                {link.icon}
              </span>
            </span>
          ))}
        {links
          .filter((el) => el.color && !el?.isButton)
          .map((link, ind) => (
            <span
              onClick={() => resetFilter(link.title)}
              key={ind}
              className={cn(
                link.colorHover,
                " flex flex-row group cursor-pointer items-center justify-between transition delay-100 duration-200",
                searchParams.has("filter", link.title) && link.color
              )}
            >
              {link.title}{" "}
              <span
                className={cn(
                  link.colorHover,
                  "w-4 text-[10px] cursor-pointer text-transparent transition delay-100 duration-200 uppercase",
                  searchParams.has("filter", link.title) && link.color
                )}
              >
                {link.icon}
              </span>
            </span>
          ))}
        {links
          .filter((el) => el?.isButton)
          .map((link, ind) => (
            <button
              onClick={() => router.push(link?.path || pathname)}
              key={ind}
              className={cn(
                "hover:text-blue-500  text-blue-400 flex flex-row group items-center justify-between transition delay-100 duration-200",
                pathname.startsWith(link?.path || pathname) && "text-blue-500"
              )}
            >
              {link.title}{" "}
              <span
                className={cn(
                  "w-4 text-[10px]  text-transparent group-hover:text-blue-400 transition delay-100 duration-200 uppercase",
                  pathname.startsWith(link?.path || pathname) &&
                    "text-blue-500   "
                )}
              >
                {link.icon}
              </span>
            </button>
          ))}
      </div>
    </div>
  );
}

export default SideNavAdmin;
