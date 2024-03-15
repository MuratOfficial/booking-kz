"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SideNavAdminProps {
  links: {
    path: string;
    title: string;
    icon: React.JSX.Element | string;
    color?: string;
    colorHover?: string;
    isButton?: boolean;
  }[];
}

function SideNavAdmin({ links }: SideNavAdminProps) {
  const pathname = usePathname();

  return (
    <div className=" py-2 w-[200px] h-screen ">
      <div className="w-full flex flex-col gap-2 sticky top-[11%] bg-slate-200 rounded-r-xl px-4 py-3 text-base font-medium text-slate-600">
        {links
          .filter((el) => !el.color && !el?.isButton)
          .map((link, ind) => (
            <Link
              href={link.path}
              key={ind}
              className={cn(
                "hover:text-blue-500 flex flex-row group items-center justify-between transition delay-100 duration-200",
                pathname.startsWith(link.path) && "text-blue-500"
              )}
            >
              {link.title}{" "}
              <span
                className={cn(
                  "w-4 text-[10px] text-transparent group-hover:text-blue-500 transition delay-100 duration-200 uppercase",
                  pathname.startsWith(link.path) && "text-blue-500   "
                )}
              >
                {link.icon}
              </span>
            </Link>
          ))}
        {links
          .filter((el) => el.color && !el?.isButton)
          .map((link, ind) => (
            <Link
              href={link.path}
              key={ind}
              className={cn(
                link.colorHover,
                " flex flex-row group items-center justify-between transition delay-100 duration-200",
                pathname.startsWith(link.path) && link.color
              )}
            >
              {link.title}{" "}
              <span
                className={cn(
                  link.colorHover,
                  "w-4 text-[10px] text-transparent transition delay-100 duration-200 uppercase",
                  pathname.startsWith(link.path) && link.color
                )}
              >
                {link.icon}
              </span>
            </Link>
          ))}
        {links
          .filter((el) => el?.isButton)
          .map((link, ind) => (
            <Link
              href={link.path}
              key={ind}
              className={cn(
                "hover:text-blue-500 text-blue-400 flex flex-row group items-center justify-between transition delay-100 duration-200",
                pathname.startsWith(link.path) && "text-blue-500"
              )}
            >
              {link.title}{" "}
              <span
                className={cn(
                  "w-4 text-[10px] text-transparent group-hover:text-blue-400 transition delay-100 duration-200 uppercase",
                  pathname.startsWith(link.path) && "text-blue-500   "
                )}
              >
                {link.icon}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default SideNavAdmin;
