"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Share2 } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import {
  FacebookShare,
  LinkedinShare,
  TwitterShare,
  WhatsappShare,
} from "react-share-kit";

interface ShareButtonProps {
  title: string;
}

function ShareButton({ title }: ShareButtonProps) {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className=" px-1.5 py-1 overflow-hidden  rounded-full  duration-300 ease-in-out   flex  flex-row gap-x-1 items-center hover:bg-slate-100  bg-opacity-50  transition delay-100 duration-300 hover:bg-opacity-80">
          <Share2 className="stroke-slate-700" size={14} />
          <span className="text-slate-700 font-medium  text-xs ">
            Поделиться
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-row gap-x-1 items-center">
        <FacebookShare
          url={`https://etazhi.kz${pathname}`}
          quote={title}
          hashtag={"#etazhikz #обьявление"}
          size={24}
          borderRadius={12}
        />
        <WhatsappShare
          url={`https://etazhi.kz${pathname}`}
          title={title}
          separator=":: "
          size={24}
          borderRadius={12}
        />
        <LinkedinShare url={title} size={24} borderRadius={12} />
        <TwitterShare
          url={`https://etazhi.kz${pathname}`}
          title={title}
          size={24}
          borderRadius={12}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ShareButton;
