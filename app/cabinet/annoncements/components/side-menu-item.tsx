"use client";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SideMenuItemProps {
  id: string;
  name: string;
  address: string;
  isSeparator: boolean;
}

function SideMenuItem({ id, name, address, isSeparator }: SideMenuItemProps) {
  const pathname = usePathname();
  return (
    <li className="flex flex-col group gap-y-1">
      <Link
        href={`/cabinet/annoncements/${id}`}
        className={cn(
          "text-sm group-hover:text-blue-600 ",
          pathname === `/cabinet/annoncements/${id}` && "text-blue-600"
        )}
      >
        {/* {`${item.roomNumber}-комнатная ${item.categoryType} - ${item.serviceType} ${item.serviceTypeExt}`} */}
        {name}
      </Link>
      <span
        className={cn(
          "text-xs group-hover:text-blue-400 text-slate-300 flex flex-row gap-x-1 mt-1",
          pathname === `/cabinet/annoncements/${id}` && "text-blue-400"
        )}
      >
        <MapPin
          size={15}
          className={cn(
            "group-hover:text-rose-500",
            pathname === `/cabinet/annoncements/${id}` && "text-rose-500"
          )}
        />
        {address}
      </span>
      {isSeparator && <Separator className="my-1" />}
    </li>
  );
}

export default SideMenuItem;
