"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: React.ReactNode;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex flex-row items-center w-full justify-between px-5 py-3  text-sm rounded-2xl  bg-slate-700",

        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            pathname === item.href
              ? "bg-blue-500"
              : "hover:bg-blue-500 text-neutral-100",
            "justify-start p-3 transition duration-300 delay-100 text-neutral-100 rounded-xl font-semibold flex flex-row gap-x-1 items-center"
          )}
        >
          {item.icon} {item.title}
        </Link>
      ))}
    </nav>
  );
}
